var fs = require("fs");
function chown(jssh) {
    /**
     * @param user {string|number} User id or name.
     * @param group {string|number} Group id or name.
     * @param file_patterns {string|string[]} A string or an array of file patterns.
     */
    function chown(user, group, file_patterns) {
        var id = jssh.dependency('id');
        var glob = jssh.dependency('glob');
        var error = jssh.error(user, group, file_patterns);
        var uid = typeof user == "number" ? user : id("-u", user);
        var gid = typeof group == "number" ? group : id("-g", group);
        var files = glob(file_patterns);
        files.forEach(function (file) {
            try {
                fs.chownSync(file, uid, gid);
            }
            catch (e) {
                error(e, true); // true == continue
            }
        });
    }
    return chown;
}
module.exports = chown;
