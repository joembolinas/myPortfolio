<#!
.SYNOPSIS
    Automates GitHub MCP server setup for VS Code.
.DESCRIPTION
    Prompts for a GitHub Personal Access Token (classic) and stores it in the current session
    and Windows user environment (persistent) as GITHUB_TOKEN. Validates the token via GitHub API.
    Ensures .vscode/mcp.json exists with a GitHub MCP server configuration using the environment variable.
.NOTES
    Run in a regular PowerShell window (not as admin unless you want machine scope).
    Your token is NOT written into the repository; only an environment variable is set.
#>

$ErrorActionPreference = 'Stop'

Write-Host '--- GitHub MCP Setup ---' -ForegroundColor Cyan

# 1. Collect token (mask input)
if (-not $env:GITHUB_TOKEN) {
    Write-Host 'Enter a GitHub Personal Access Token (classic recommended).' -ForegroundColor Yellow
    Write-Host 'Scopes usually needed: repo, read:user, user:email (add gist if you need gists).' -ForegroundColor DarkGray
    $secure = Read-Host 'Token' -AsSecureString
    $tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
} else {
    Write-Host 'Existing GITHUB_TOKEN environment variable detected. Re-using it.' -ForegroundColor Green
    $tokenPlain = $env:GITHUB_TOKEN
}

if ([string]::IsNullOrWhiteSpace($tokenPlain)) {
    throw 'No token provided.'
}

# 2. Validate token
Write-Host 'Validating token with GitHub API...' -NoNewline
try {
    $user = Invoke-RestMethod -Headers @{ Authorization = "Bearer $tokenPlain" } -Uri 'https://api.github.com/user' -ErrorAction Stop
    Write-Host ' OK' -ForegroundColor Green
    Write-Host "Authenticated as: $($user.login)" -ForegroundColor Green
} catch {
    Write-Host ' FAILED' -ForegroundColor Red
    throw "Token validation failed: $($_.Exception.Message)"
}

# 3. Persist token (user env)
Write-Host 'Persisting GITHUB_TOKEN to user environment...' -NoNewline
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', $tokenPlain, 'User')
Write-Host ' done.' -ForegroundColor Green

# Also set for current session
$env:GITHUB_TOKEN = $tokenPlain

# 4. Ensure .vscode/mcp.json
$workspaceRoot = (Get-Item -Path '.').FullName
$vscodeDir = Join-Path $workspaceRoot '.vscode'
$mcpPath = Join-Path $vscodeDir 'mcp.json'

if (-not (Test-Path $vscodeDir)) { New-Item -ItemType Directory -Path $vscodeDir | Out-Null }

$mcpConfig = @{ servers = @{ github = @{ command = 'npx'; args = @('-y','@modelcontextprotocol/server-github'); env = @{ GITHUB_TOKEN = '${env:GITHUB_TOKEN}' } } } } | ConvertTo-Json -Depth 6

if (Test-Path $mcpPath) {
    Write-Host 'Updating existing .vscode/mcp.json' -ForegroundColor Yellow
} else {
    Write-Host 'Creating .vscode/mcp.json' -ForegroundColor Yellow
}
$mcpConfig | Out-File -FilePath $mcpPath -Encoding UTF8 -Force

# 5. Sanity message
Write-Host "mcp.json written to: $mcpPath" -ForegroundColor Cyan
Write-Host 'Restart VS Code (or reload window) so it picks up the new environment variable.' -ForegroundColor Magenta
Write-Host 'Then run: Command Palette > Check MCP Setup.' -ForegroundColor Magenta

# 6. Optional: quick test of server availability (dry run)
Write-Host 'Quick GitHub API rate limit check:' -NoNewline
try {
    $rate = Invoke-RestMethod -Headers @{ Authorization = "Bearer $tokenPlain" } -Uri 'https://api.github.com/rate_limit'
    Write-Host ' OK' -ForegroundColor Green
    Write-Host ("Remaining core requests: {0}" -f $rate.resources.core.remaining) -ForegroundColor DarkGray
} catch {
    Write-Host ' skipped (error)' -ForegroundColor Yellow
}

Write-Host 'Setup complete.' -ForegroundColor Green
