param(
    [int]$dayNumber
)

$currentYear = (Get-Date).Year

$paddedDayNumber = "{0:D2}" -f $dayNumber

$yearFolderPath = Join-Path -Path "./src" -ChildPath "$currentYear"
$dayFolderPath = Join-Path -Path $yearFolderPath -ChildPath "day-$paddedDayNumber"

if (-not (Test-Path -Path $yearFolderPath)) {
    New-Item -Path $yearFolderPath -ItemType Directory -Force
}

New-Item -Path $dayFolderPath -ItemType Directory -Force

$files = @("input.txt", "solution.ts", "README.md")
foreach ($file in $files) {
    $filePath = Join-Path -Path $dayFolderPath -ChildPath $file
    New-Item -Path $filePath -ItemType File -Force
}

Write-Host "Folder structure for day $dayNumber created: $dayFolderPath"
