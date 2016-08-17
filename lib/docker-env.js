const spawn = require('cross-spawn');
module.exports = function(name) {
    let res = spawn.sync('docker-machine',['env',name]);
    let cons = res.stdout.toString().split(/\n/);
    let result = {};
    cons.forEach((line) => {
        if (/^export\s/.test(line)) {
            let val = line.replace(/^export\s/,'').split('=');
            result[val[0]] = val[1].replace(/^\"|\"$/g,'');
        }
    });
    return Object.assign({},process.env,result);
};