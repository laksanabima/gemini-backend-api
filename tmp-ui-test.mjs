process.env.X_API_KEY = 'k';
process.env.PORT = '8124';

await import('./src/app.js');
await new Promise((r) => setTimeout(r, 500));

const res = await fetch('http://127.0.0.1:8124/');
const body = await res.text();
console.log('GET  /              :', res.status, res.headers.get('content-type'));
console.log('  judul             :', body.includes('GenAI'));
console.log('  endpoint audio    :', body.includes('/generate-from-audio'));
console.log('  teks keamanan     :', body.includes('Jaga Kerahasiaan API Key'));
console.log('  solid shadow css  :', body.includes('shadow-solid'));
console.log('  tanpa glassmorph  :', !body.includes('backdrop-blur'));

const apiNoKey = await fetch('http://127.0.0.1:8124/generate-text', { method: 'POST' });
console.log('POST /generate-text :', apiNoKey.status, await apiNoKey.json());

process.exit(0);
