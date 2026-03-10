$blocksFile = "blocks.txt"

if (!(Test-Path $blocksFile)) {
    Write-Host "No existe blocks.txt"
    exit
}

$map = @{
"core"="core/kernel.ts"
"runtime"="core/runtime.ts"
"system"="core/system-init.ts"

"registry"="registry/module-registry.ts"

"node"="nodes/node-base.ts"

"engine"="engines/workflow-engine.ts"

"db"="database/db-client.ts"

"supabase"="integrations/supabase-client.ts"
}

$content = Get-Content $blocksFile -Raw

# Detecta BLOQUE 1, BLOQUE 2, etc.
$blocks = $content -split "BLOQUE\s+\d+"

foreach ($block in $blocks) {

    $clean = $block.Trim()

    if ($clean.Length -lt 10) { continue }

    $lower = $clean.ToLower()

    foreach ($key in $map.Keys) {

        if ($lower.Contains($key)) {

            $file = $map[$key]

            $dir = Split-Path $file

            if (!(Test-Path $dir)) {
                New-Item -ItemType Directory -Path $dir -Force | Out-Null
            }

            if (!(Test-Path $file)) {
                New-Item -ItemType File -Path $file | Out-Null
            }

            Add-Content $file "`n// ===== BLOQUE =====`n$clean`n"

            break
        }
    }
}