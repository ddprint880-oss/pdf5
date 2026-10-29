// نسخ المكتبات من node_modules إلى www/libs لتعمل الأدوات دون إنترنت.
// الاستعمال (من هذا المجلد):
//   npm i pdf-lib@1.17.1 pdfjs-dist mammoth @fontsource-variable/cairo
//   node copy-libs.js
const fs = require('fs'), path = require('path');
const NM = process.env.NODE_MODULES_DIR || path.join(__dirname, 'node_modules');
const OUT = path.join(__dirname, 'www', 'libs');
let missing = 0;
function copy(from, to) {
  const src = path.join(NM, from), dst = path.join(OUT, to);
  if (!fs.existsSync(src)) { console.warn('✗ مفقود:', from); missing++; return; }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.cpSync(src, dst, { recursive: true });
  console.log('✓', path.join('libs', to));
}
// pdf-lib (UMD)
copy('pdf-lib/dist/pdf-lib.min.js', 'pdf-lib.min.js');
// pdf.js: النسخة legacy تعمل على متصفحات وWebView الأقدم. غُيّر الامتداد إلى .js لأن بعض الخوادم لا تعرف .mjs
copy('pdfjs-dist/legacy/build/pdf.min.mjs', 'pdfjs/pdf.min.js');
copy('pdfjs-dist/legacy/build/pdf.worker.min.mjs', 'pdfjs/pdf.worker.min.js');
['cmaps', 'standard_fonts', 'wasm', 'iccs'].forEach(d => copy('pdfjs-dist/' + d, 'pdfjs/' + d));
// mammoth (تحويل Word)
copy('mammoth/mammoth.browser.min.js', 'mammoth.browser.min.js');
// خط Cairo
['arabic', 'latin'].forEach(s => copy('@fontsource-variable/cairo/files/cairo-' + s + '-wght-normal.woff2', 'fonts/cairo-' + s + '-wght-normal.woff2'));
console.log(missing ? '\nناقص ' + missing + ' عنصر: نفّذ أمر npm i أعلاه ثم أعد التشغيل.' : '\nتم نسخ كل المكتبات.');
