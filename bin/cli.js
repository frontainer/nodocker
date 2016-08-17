#!/usr/bin/env node
'use strict';
const path = require('path');
const meow = require('meow');
const spawn = require('cross-spawn');
const pkgPath = path.join(process.cwd(), 'package.json');
const pkg = require(pkgPath);
const getDockerEnv = require('../lib/docker-env');
const cli = meow(`
    Usage
      $ nd <command> [options]
    Commands
      nd create
      nd start
      nd up
      nd stop[--watch]
      nd restart 
      nd rm
      nd destroy
      nd rebuild
    Options
      -v, --version version
      -h, --help help
    Examples
      nd create
      nd start
      nd up
      nd stop[--watch]
      nd restart 
      nd rm
      nd destroy
      nd rebuild
`, {
    alias: {
        v: 'version',
        h: 'help'
    },
    default: {},
    boolean: []
});
let params = process.argv.length > 3 ? process.argv.slice(3) : [];

switch(cli.input[0]) {
    case 'create': // create
        spawn.sync('docker-machine',[
            'create',
            '--driver',
            'virtualbox',
            pkg.name
        ].concat(params),{stdio:'inherit'});
        break;
    case 'start':
        spawn.sync('docker-machine',[
            'start',
            pkg.name
        ].concat(params),{stdio:'inherit'});
        break;
    case 'up':
        const env = getDockerEnv(pkg.name);
        spawn.sync('docker-compose',[
            'up'
        ].concat(params),{stdio:'inherit',env:env});
        if (params.indexOf('-d') !== -1) {
            spawn.sync('docker-machine', [
                'ip',
                pkg.name
            ], {stdio: 'inherit', env: env});
        }
        break;
    case 'stop':
        spawn.sync('docker-compose',[
            'stop'
        ].concat(params),{stdio:'inherit',env:getDockerEnv(pkg.name)});
        break;
    case 'rm':
        spawn.sync('docker-compose',[
            'rm'
        ].concat(params),{stdio:'inherit',env:getDockerEnv(pkg.name)});
        break;
    default:
        break;
}