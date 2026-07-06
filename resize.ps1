Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\Diyo C D\.gemini\antigravity-ide\brain\28f8702f-044e-466f-9ec4-1cfd7a9b5446\media__1783092957410.jpg")
$bmp = New-Object System.Drawing.Bitmap(32, 32)
$graph = [System.Drawing.Graphics]::FromImage($bmp)
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graph.DrawImage($img, 0, 0, 32, 32)
$bmp.Save("c:\Users\Diyo C D\OneDrive\Desktop\Cluade Portfolio\sakura-portfolio\public\images\cursor.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$graph.Dispose()
$bmp.Dispose()
$img.Dispose()
