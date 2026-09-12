# ============================================================
#  Menighetsbladet – Portable PowerShell HTTP Server
#  No dependencies required. Works on Windows 7+ with .NET 4.5+
# ============================================================

param(
    [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot          # standalonePS folder

# ---- MIME type map ------------------------------------------
$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".map"  = "application/json; charset=utf-8"
    ".ico"  = "image/x-icon"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
    ".md"   = "text/markdown; charset=utf-8"
    ".txt"  = "text/plain; charset=utf-8"
}

# ---- Try ports until one works ------------------------------
$listener = $null
$maxAttempts = 10
for ($i = 0; $i -lt $maxAttempts; $i++) {
    $tryPort = $Port + $i
    try {
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add("http://localhost:$tryPort/")
        $listener.Start()
        $Port = $tryPort
        break
    } catch {
        $listener = $null
        if ($i -eq ($maxAttempts - 1)) {
            Write-Host ""
            Write-Host "  ERROR: Could not find an available port ($Port - $($Port + $maxAttempts - 1))." -ForegroundColor Red
            Write-Host "  Close other programs and try again."
            Write-Host ""
            Read-Host "Press Enter to exit"
            exit 1
        }
    }
}

$url = "http://localhost:$Port/web/"

Write-Host ""
Write-Host "  ======================================"  -ForegroundColor Cyan
Write-Host "   Menighetsbladet Dashboard"              -ForegroundColor Cyan
Write-Host "  ======================================"  -ForegroundColor Cyan
Write-Host ""
Write-Host "  Server running at: $url"                 -ForegroundColor Green
Write-Host "  Data folder:       $root\data\"           -ForegroundColor Gray
Write-Host ""
Write-Host "  Press Ctrl+C to stop the server."        -ForegroundColor Yellow
Write-Host ""

# ---- Request loop -------------------------------------------
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req     = $context.Request
        $resp    = $context.Response

        $urlPath = $req.Url.LocalPath   # e.g. /web/index.html

        try {
            # ── API: Save source.json ────────────────────────
            if ($urlPath -eq "/api/save" -and $req.HttpMethod -eq "POST") {
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $reader.Close()

                $savePath = Join-Path $root "data\source.json"

                # Create timestamped backup
                if (Test-Path $savePath) {
                    $ts = (Get-Date).ToString("yyyyMMdd-HHmmss")
                    $backupPath = Join-Path $root "data\source.backup-$ts.json"
                    Copy-Item $savePath $backupPath -Force
                    Write-Host "  [backup] $backupPath" -ForegroundColor DarkGray
                }

                # Write new data (UTF-8 without BOM)
                $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
                [System.IO.File]::WriteAllText($savePath, $body, $utf8NoBom)

                $resp.StatusCode = 200
                $resp.ContentType = "application/json; charset=utf-8"
                $respBytes = [System.Text.Encoding]::UTF8.GetBytes('{"ok":true}')
                $resp.OutputStream.Write($respBytes, 0, $respBytes.Length)
                Write-Host "  [save]   data\source.json updated" -ForegroundColor Green
            }
            # ── Static file serving ─────────────────────────
            else {
                # Default document
                if ($urlPath -eq "/" -or $urlPath -eq "") {
                    $urlPath = "/web/index.html"
                }

                # Map URL to filesystem
                $relPath = $urlPath.TrimStart("/").Replace("/", "\")
                $filePath = Join-Path $root $relPath

                # Directory request → serve index.html inside it
                if (Test-Path $filePath -PathType Container) {
                    $filePath = Join-Path $filePath "index.html"
                }

                if (Test-Path $filePath -PathType Leaf) {
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $resp.ContentType = if ($mimeMap.ContainsKey($ext)) { $mimeMap[$ext] } else { "application/octet-stream" }

                    $bytes = [System.IO.File]::ReadAllBytes($filePath)
                    $resp.ContentLength64 = $bytes.Length
                    $resp.OutputStream.Write($bytes, 0, $bytes.Length)
                }
                else {
                    $resp.StatusCode = 404
                    $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
                    $resp.ContentType = "text/plain; charset=utf-8"
                    $resp.OutputStream.Write($msg, 0, $msg.Length)
                    Write-Host "  [404]    $urlPath" -ForegroundColor DarkYellow
                }
            }
        }
        catch {
            $resp.StatusCode = 500
            $errMsg = [System.Text.Encoding]::UTF8.GetBytes("500 Internal Server Error")
            $resp.ContentType = "text/plain; charset=utf-8"
            try { $resp.OutputStream.Write($errMsg, 0, $errMsg.Length) } catch {}
            Write-Host "  [error]  $($_.Exception.Message)" -ForegroundColor Red
        }
        finally {
            try { $resp.Close() } catch {}
        }
    }
}
finally {
    if ($listener) {
        $listener.Stop()
        $listener.Close()
    }
    Write-Host ""
    Write-Host "  Server stopped." -ForegroundColor Yellow
}
