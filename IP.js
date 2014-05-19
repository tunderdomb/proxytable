module.exports = (function ( ifaces ){
  var address
  for ( var dev in ifaces ) {
    ifaces[dev].forEach(function ( details ){
      if ( details.family == 'IPv4' ) {
        address = address || details.address
        return false
      }
    });
  }
  return (address || "localhost")
}(require('os').networkInterfaces()))