const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '');
const files = fs.readdirSync(p);
const sorted = files.map(f => ({f, mtime: fs.statSync(path.join(p, f)).mtimeMs})).sort((a,b) => b.mtime - a.mtime);
console.log(sorted.slice(0, 5));
