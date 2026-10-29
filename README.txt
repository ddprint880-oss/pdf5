نصّ — النسخة التي تعمل دون إنترنت

الهيكل:
  copy-libs.js        نسخ المكتبات من node_modules إلى www/libs
  www/index.html      التطبيق (يستخدم libs/ المحلية فقط)
  www/libs/           pdf-lib و pdf.js (مضمّنان). يلزم إضافة mammoth وخط Cairo بالخطوات أدناه

1) أكمل المكتبات الناقصة (مرة واحدة، تحتاج إنترنت):
   npm i pdf-lib@1.17.1 pdfjs-dist mammoth @fontsource-variable/cairo
   node copy-libs.js

2) للتجربة في المتصفح (ليس بفتح الملف مباشرة file://):
   npx serve www
   ثم افتح العنوان الظاهر.

3) لتطبيق Android عبر Capacitor: اجعل webDir = "www" في capacitor.config ثم:
   npx cap sync android

ملاحظة: تسجيل الدخول بحساب Google يحتاج إنترنت دائمًا، وبقية الأدوات تعمل دونه.
