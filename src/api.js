var base = require("jssh-api-jssh/src/base");
var api = require("jssh-api-jssh/src/api");
var cmd_dir = __dirname + "/commands/";
[
    'id',
    'chown',
].forEach(function (cmd) {
    var probe = new base.Probe(cmd);
    probe.api = api;
    probe.cmdDirectory = cmd_dir;
    probe.helpFile = __dirname + '/../help/' + cmd + '.md';
    api[cmd] = probe.shell();
});
module.exports = api;
