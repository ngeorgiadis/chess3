<#
.SYNOPSIS
  Build a deployable Windows package (NSIS installer + portable exe) for Chess Mentor Studio.

.DESCRIPTION
  Runs the full release pipeline: install deps (unless -SkipInstall), typecheck, build the
  electron-vite bundle, then package it with electron-builder. Output lands in .\release\.

.PARAMETER SkipInstall
  Skip "npm install" (use when node_modules is already up to date).

.PARAMETER SkipTypecheck
  Skip the TypeScript typecheck step (faster iteration; not recommended before a real release).

.PARAMETER Target
  Which electron-builder targets to build: "nsis", "portable", or "all" (default).

.EXAMPLE
  .\scripts\package-windows.ps1
.EXAMPLE
  .\scripts\package-windows.ps1 -SkipInstall -Target nsis
#>
[CmdletBinding()]
param(
  [switch]$SkipInstall,
  [switch]$SkipTypecheck,
  [ValidateSet('nsis', 'portable', 'all')]
  [string]$Target = 'all'
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Step($msg) {
  Write-Host ""
  Write-Host "== $msg ==" -ForegroundColor Cyan
}

Step "Chess Mentor Studio — Windows package build"

if (-not $SkipInstall) {
  Step "Installing dependencies"
  npm install
  if ($LASTEXITCODE -ne 0) { throw "npm install failed" }
}

if (-not $SkipTypecheck) {
  Step "Type-checking"
  npm run typecheck
  if ($LASTEXITCODE -ne 0) { throw "Typecheck failed — fix errors before packaging" }
}

Step "Building app bundle (electron-vite)"
npm run build
if ($LASTEXITCODE -ne 0) { throw "electron-vite build failed" }

Step "Packaging Windows target(s): $Target"
$targetArgs = switch ($Target) {
  'nsis' { @('--win', 'nsis') }
  'portable' { @('--win', 'portable') }
  default { @('--win', 'nsis', 'portable') }
}
npx electron-builder @targetArgs
if ($LASTEXITCODE -ne 0) { throw "electron-builder failed" }

Step "Done"
$releaseDir = Join-Path $root 'release'
if (Test-Path $releaseDir) {
  Get-ChildItem -Path $releaseDir -Filter *.exe | ForEach-Object {
    Write-Host " -> $($_.FullName)" -ForegroundColor Green
  }
} else {
  Write-Warning "No release directory found at $releaseDir"
}
