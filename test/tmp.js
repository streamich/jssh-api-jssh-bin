require('../global');


//console.log(id("", "redis"));
console.log(id());
console.log(id("-g"));
console.log(id("-u"));
console.log(id("redis"));
console.log(id("-g", "redis"));
console.log(id("-u", "redis"));
//console.log(id("u", "root"));
//console.log(id("u"));
//console.log(id("g", "redis"));
//console.log(id("g"));
//
chown("redis", "redis", "/tmp/test");
//chown("root", "root", "/tmp/test");

