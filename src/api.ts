import base = require("jssh-api-jssh/src/base");
import api = require("jssh-api-jssh/src/api");


var cmd_dir = __dirname + "/commands/";

[
    'id',
    'chown',
].forEach((cmd) => {
    var probe = new base.Probe(cmd);
    probe.api = api;
    probe.cmdDirectory = cmd_dir;
    probe.helpFile = __dirname + '/../help/' + cmd + '.md';
    api[cmd] = probe.shell();
});

export = api;