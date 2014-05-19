proxytable
==========

Proxy table for http-proxy

```js

var http = require('http')

var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxy()
var proxytable = require("proxytable")
var routes = proxytable()

// arguments:
// host - String | Function(req, res)
// target - String
// host can be a glob pattern like "*.example.com"
routes.proxy(proxytable.IP, proxytable.target(8001))

http.createServer(function(req, res) {
  proxy.web(req, res, {
    target: routes.findTarget(req)
  })
}).listen(80, proxytable.IP, function(  ){
  console.log("hello")
})

```