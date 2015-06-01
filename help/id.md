# `id`

Returns user information, such as user `uid` or group `gid`.

This function has a dependency on `posix` package, which compiles a native binding.

## Definition

```typescript
id(options?: string, user?: string|number): any
```
    
Both arguments are optional. If `options` string is ommited, an object containing user information
is returned. If `user` is omitted, the information is returned for the user running current process. 
    
## Options

 - `-u` -- Will return user id.
 - `-g` -- Will return group id.

## Examples

```javascript
id()
{ name: 'root',
  passwd: 'x',
  uid: 0,
  gid: 0,
  gecos: 'root',
  shell: '/bin/bash',
  dir: '/root' }
  
id("u", "redis")
105

id("g", "redis")
106
```