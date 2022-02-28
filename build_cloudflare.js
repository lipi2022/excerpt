const execSync = require('child_process').execSync;

// run the parcel scripts
let parcel_script = 'parcel build src/index.html --no-content-hash --no-source-maps';
console.log(execSync(parcel_script, { encoding: 'utf8' }));

execSync("cp src/_headers dist/_headers", { encoding: 'utf8' });