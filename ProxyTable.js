var minimatch = require('minimatch')
var IP = require("./IP")

function Route( host, target ){
  this.host = host
  this.target = target
}
Route.prototype = {
  match: function( req ){
    if ( typeof this.host == "function" ) {
      return this.host(req)
    }
    else if( typeof this.host == "string" )  {
      return minimatch(req.headers.host, this.host)
    }
    else return false
  }
}

function ProxyTable(  ){}
ProxyTable.prototype = []
ProxyTable.prototype.proxy = function( host, target ){
  this.push(new Route(host, target))
  return this
}
ProxyTable.prototype.findTarget = function( req ){
  var r = null
  this.some(function( route ){
    if ( route.match(req) ) {
      r = route
      return true
    }
    return false
  })
  return r && r.target
}

function create(  ){
  return new ProxyTable()
}

module.exports = create

module.exports.IP = IP

module.exports.target = function ( protocol, port ){
  if ( !port ) {
    port = protocol
    protocol = "http"
  }
  return protocol + "://" + IP + ":" + port
}