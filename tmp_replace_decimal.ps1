$path = 'C:\Tool\Math-Task-Generator\js\tasks.js'
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$text = $text.Replace('resultStr = isDecimal ? result.toFixed(2).replace(/\.\?0+$/, '') : result.toString();', 'resultStr = isDecimal ? formatDecimal(result, 2) : result.toString();')
$text = $text.Replace('resultStr = result.toFixed(4).replace(/\.\?0+$/, '');', 'resultStr = formatDecimal(result, 4);')
$text = $text.Replace('s = `\\( ${comma(v1)} + ${comma(v2)} = ${comma(res.toFixed(2).replace(/\.\?0+$/, ""))} \\)`;', 's = `\\( ${comma(v1)} + ${comma(v2)} = ${formatDecimal(res, 2)} \\)`;')
$text = $text.Replace('s = `\\( ${comma(v1)} - ${comma(v2)} = ${comma(res.toFixed(2).replace(/\.\?0+$/, ""))} \\)`;', 's = `\\( ${comma(v1)} - ${comma(v2)} = ${formatDecimal(res, 2)} \\)`;')
$text = $text.Replace('textDisplay = `Berechne schriftlich: \\( \\quad ${comma(Number(dividend.toFixed(2)))} : ${divisor} \\)`;', 'textDisplay = `Berechne schriftlich: \\( \\quad ${formatDecimal(dividend, 2)} : ${divisor} \\)`;')
$text = $text.Replace('textPrint = `Berechne schriftlich: \\( \\quad ${comma(Number(dividend.toFixed(2)))} : ${divisor} \\)<br>${karo(divRows, 16)}`;', 'textPrint = `Berechne schriftlich: \\( \\quad ${formatDecimal(dividend, 2)} : ${divisor} \\)<br>${karo(divRows, 16)}`;')
[System.IO.File]::WriteAllText($path, $text, [System.Text.Encoding]::UTF8)
Write-Output 'done'
