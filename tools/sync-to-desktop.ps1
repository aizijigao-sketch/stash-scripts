param(
    [string]$DesktopScriptPath = "C:\Users\srguang2\Desktop\haijiao-stash.js"
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$source = Join-Path $repoRoot "scripts\haijiao-stash.js"

if (-not (Test-Path -LiteralPath $source)) {
    throw "Source script not found: $source"
}

$targetDir = Split-Path -Parent $DesktopScriptPath
if (-not (Test-Path -LiteralPath $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

Copy-Item -LiteralPath $source -Destination $DesktopScriptPath -Force

$copied = Get-Item -LiteralPath $DesktopScriptPath
Write-Host "Synced $source"
Write-Host "To     $($copied.FullName)"
Write-Host "Bytes  $($copied.Length)"
