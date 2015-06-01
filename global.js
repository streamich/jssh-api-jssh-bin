var api = require('./src/api');
for(var cmd in api) global[cmd] = api[cmd];