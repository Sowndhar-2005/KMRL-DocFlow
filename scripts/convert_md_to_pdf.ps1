param (
    [string]$InputFile = "README.md",
    [string]$OutputFile = "docs\README.pdf",
    [string]$CssFile = "docs\pdf_style.css"
)

$ErrorActionPreference = "Stop"

Write-Host ">>> Converting $InputFile to PDF with embedded images..." -ForegroundColor Cyan

$WorkspaceRoot = (Get-Location).Path
$HtmlTemp = Join-Path $WorkspaceRoot "docs\temp_export.html"
$TempDir = [System.IO.Path]::GetTempPath().Replace('\', '/')
$TempProfile = "file:///" + $TempDir + "lo_md_export"

# 1. Compile Markdown to self-contained HTML with Base64 embedded images & styling
pandoc --embed-resources --standalone --resource-path="$WorkspaceRoot" --css="$CssFile" --metadata title="KMRL DocFlow Technical Documentation" "$InputFile" -o "$HtmlTemp"

Write-Host ">>> HTML with Base64 embedded images created." -ForegroundColor Green

# 2. Convert HTML to PDF via LibreOffice headless
$SofficePath = "C:\Program Files\LibreOffice\program\soffice.com"
if (-not (Test-Path $SofficePath)) {
    $SofficePath = "soffice"
}

$OutputDir = Split-Path (Join-Path $WorkspaceRoot $OutputFile) -Parent
& $SofficePath "-env:UserInstallation=$TempProfile" --headless --convert-to pdf:writer_pdf_Export "$HtmlTemp" --outdir "$OutputDir"

$GeneratedPdf = Join-Path $OutputDir "temp_export.pdf"
$TargetPdf = Join-Path $WorkspaceRoot $OutputFile

if (Test-Path $GeneratedPdf) {
    Move-Item -Path $GeneratedPdf -Destination $TargetPdf -Force
}

# Cleanup temporary HTML file
if (Test-Path $HtmlTemp) {
    Remove-Item $HtmlTemp -Force
}

Write-Host ">>> PDF generated successfully: $TargetPdf" -ForegroundColor Green
Get-Item $TargetPdf | Select-Object Name, Length, LastWriteTime
