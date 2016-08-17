// todo
const DEFINED_OPTIONS = {
    create: [
        'force-recreate',
        'no-recreate',
        'no-build',
        'build'
    ],
    build: [
        'force-rm',
        'no-cache',
        'pull'
    ],
    restart: [
        't',
        'timeout'
    ],
    stop: [
        't',
        'timeout'
    ],
    rm: [
        'f',
        'force',
        'v',
        'a',
        'all'
    ],
    start: [],

    up: [
        'd',
        'no-color',
        'no-deps',
        'force-recreate',
        'no-recreate',
        'no-build',
        'build',
        'abort-on-container-exit',
        't',
        'timeout',
        'remove-orphans'
    ],
    logs: [
        'no-color',
        'f',
        'follow',
        't',
        'timestamps',
        'tail'
    ]
};
module.exports = function(command,option) {
    return (DEFINED_OPTIONS[command].indexOf(option) === -1);
};
