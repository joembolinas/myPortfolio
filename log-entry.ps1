# Quick Project Log Entry Script
# Usage: .\log-entry.ps1 -Type "LEARNING" -Component "JAVASCRIPT" -Description "Figured out async/await pattern" -Status "INSIGHT"

param(
    [Parameter(Mandatory=$true)]
    [string]$Type,
    
    [Parameter(Mandatory=$true)]
    [string]$Component,
    
    [Parameter(Mandatory=$true)]
    [string]$Description,
    
    [Parameter(Mandatory=$false)]
    [string]$Status = "NOTED"
)

# Get current timestamp (Unix format)
$timestamp = [int][double]::Parse((Get-Date -UFormat %s))

# Format the log entry
$entry = "[$timestamp] | $Type | $Component | $Description | $Status"

# Add to project log
$logPath = Join-Path $PSScriptRoot "project.log"
Add-Content -Path $logPath -Value $entry

# Show confirmation
Write-Host "✅ Logged: $entry" -ForegroundColor Green

# Show usage examples
Write-Host ""
Write-Host "📝 Common Usage Examples:" -ForegroundColor Cyan
Write-Host "Learning:    .\log-entry.ps1 -Type 'LEARNING' -Component 'REACT' -Description 'Understanding hooks' -Status 'INSIGHT'" -ForegroundColor Yellow
Write-Host "Challenge:   .\log-entry.ps1 -Type 'CHALLENGE' -Component 'CSS' -Description 'Layout issues' -Status 'OBSTACLE'" -ForegroundColor Yellow  
Write-Host "Solution:    .\log-entry.ps1 -Type 'SOLUTION' -Component 'CSS' -Description 'Fixed with flexbox' -Status 'RESOLVED'" -ForegroundColor Yellow
Write-Host "Daily start: .\log-entry.ps1 -Type 'DAILY' -Component 'START' -Description 'Focus on portfolio today'" -ForegroundColor Yellow
Write-Host "Reflection:  .\log-entry.ps1 -Type 'REFLECTION' -Component 'DAILY' -Description 'Good progress made'" -ForegroundColor Yellow
