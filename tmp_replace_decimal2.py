from pathlib import Path

path = Path(r'c:\Tool\Math-Task-Generator\js\tasks.js')
text = path.read_text(encoding='utf-8')
replacements = [
    ('resultStr = isDecimal ? result.toFixed(2).replace(/\.\?0+$/, \'\') : result.toString();',
     'resultStr = isDecimal ? formatDecimal(result, 2) : result.toString();'),
    ('resultStr = result.toFixed(4).replace(/\.\?0+$/, \'\');',
     'resultStr = formatDecimal(result, 4);'),
    (r's = `\( ${comma(v1)} + ${comma(v2)} = ${comma(res.toFixed(2).replace(/\.\?0+$/, ""))} \)`;',
     r's = `\( ${comma(v1)} + ${comma(v2)} = ${formatDecimal(res, 2)} \)`;'),
    (r's = `\( ${comma(v1)} - ${comma(v2)} = ${comma(res.toFixed(2).replace(/\.\?0+$/, ""))} \)`;',
     r's = `\( ${comma(v1)} - ${comma(v2)} = ${formatDecimal(res, 2)} \)`;'),
    (r'textDisplay = `Berechne schriftlich: \( \quad ${comma(Number(dividend.toFixed(2)))} : ${divisor} \)`;',
     r'textDisplay = `Berechne schriftlich: \( \quad ${formatDecimal(dividend, 2)} : ${divisor} \)`;'),
    (r'textPrint = `Berechne schriftlich: \( \quad ${comma(Number(dividend.toFixed(2)))} : ${divisor} \)<br>${karo(divRows, 16)}`;',
     r'textPrint = `Berechne schriftlich: \( \quad ${formatDecimal(dividend, 2)} : ${divisor} \)<br>${karo(divRows, 16)}`;'),
]
for old, new in replacements:
    if old in text:
        print('replacing:', old)
        text = text.replace(old, new)
    else:
        print('missing:', old)
path.write_text(text, encoding='utf-8')
print('done')
