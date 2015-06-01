import base = require("jssh-api-jssh/src/base");
var posix = require("posix");


function id(jssh: base.Probe) {

    /**
     * Like `id` bash command. This function has a dependency `posix`, which compiles a native binding.
     * See: http://ss64.com/bash/id.html
     *
     * ```bash
     * $ id
     * uid=0(root) gid=0(root) groups=0(root)
     * $ id redis
     * uid=102(redis) gid=105(redis) groups=105(redis)
     * $ id -g redis
     * 105
     * $ id -u redis
     * 102
     * ```
     *
     * @param options {string|string[]} Like `'ug'` or `['u', 'g']`.
     * @param username {string|number} Username string or user id integer. Like `'root'` or `0`.
     */
    function id(options?: string, username?: string|number) {
        if((typeof options != 'string') || (options[0] != '-')) {
            username = options;
            options = '';
        }

        var error = jssh.error(options, username);

        try {
            username = username || posix.getuid();
        } catch(e) { error(e.message); }

        if(!options) {
            try {
                return posix.getpwnam(username);
            } catch(e) {
                error(e.message);
            }
        }

        var is_user     = options.indexOf("u") > -1;
        var is_group    = options.indexOf("g") > -1;
        var is_groups   = options.indexOf("G") > -1;
        var is_name     = options.indexOf("n") > -1;
        var is_real     = options.indexOf("r") > -1;

        if(is_user) { // -u
            if(is_group || is_groups) error('Cannot print "only" of more than one choice.');
            var opt = is_name ? "name" : "uid";
            try {
                return posix.getpwnam(username)[opt];
            } catch(e) {
                error(e.message);
            }
        }

        if(is_group) {
            if(is_user || is_groups) error('Cannot print "only" of more than one choice.');
            if(is_name) {
                error("`-ng` options combination no supported, yet.");
            } else {
                try {
                    return posix.getpwnam(username).gid;
                } catch(e) {
                    error(e.message);
                }
            }
        }

        if(is_groups) {
            error('`-G` options not supported.');
        }

        error('Arguments provided are not supported.');

    }
    return id;
}

export = id;