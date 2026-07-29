Add-Type -AssemblyName System.Drawing

$files = @("Iron Man.png", "Dr Doom.png")
$baseDir = "c:\Users\Diyo C D\OneDrive\Desktop\Live Projects\Cluade Portfolio\sakura-portfolio\public\images"

foreach ($file in $files) {
    $fullPath = Join-Path $baseDir $file
    if (Test-Path $fullPath) {
        $img = [System.Drawing.Image]::FromFile($fullPath)
        $bmp = New-Object System.Drawing.Bitmap 64, 64
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, 64, 64)
        $img.Dispose()
        
        $tmpPath = $fullPath + ".tmp.png"
        $bmp.Save($tmpPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
        $g.Dispose()

        Move-Item -Force $tmpPath $fullPath
        Write-Host "Successfully resized $file to 64x64"
    }
}
