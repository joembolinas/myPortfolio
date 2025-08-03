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

# Common usage examples
Write-Host ""
Write-Host "📝 Quick Usage Examples:" -ForegroundColor Cyan
Write-Host ".\log-entry.ps1 -Type 'LEARNING' -Component 'REACT' -Description 'Understanding JSX syntax' -Status 'INSIGHT'"
Write-Host ".\log-entry.ps1 -Type 'CHALLENGE' -Component 'CSS' -Description 'Grid layout not working as expected' -Status 'OBSTACLE'"
Write-Host ".\log-entry.ps1 -Type 'SOLUTION' -Component 'CSS' -Description 'Fixed grid with proper fr units' -Status 'RESOLVED'"
Write-Host ".\log-entry.ps1 -Type 'DAILY' -Component 'START' -Description 'Focus on portfolio responsiveness today'"
Write-Host ".\log-entry.ps1 -Type 'REFLECTION' -Component 'DAILY' -Description 'Made good progress, feeling confident'"
