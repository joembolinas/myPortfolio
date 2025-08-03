# Simple Project Log Entry Script
param(
    [string]$Type = "NOTED",
    [string]$Component = "GENERAL", 
    [string]$Description = "Manual log entry",
    [string]$Status = "NOTED"
)

$timestamp = [int][double]::Parse((Get-Date -UFormat %s))
$entry = "[$timestamp] | $Type | $Component | $Description | $Status"
$logPath = "project.log"

Add-Content -Path $logPath -Value $entry
Write-Host "✅ Added to log: $entry" -ForegroundColor Green
