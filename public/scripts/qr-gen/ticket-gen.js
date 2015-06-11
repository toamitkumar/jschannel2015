/**
 * Created by atulr on 11/06/15.
 */
var ticketGenerator = function () {

  var _makeCode = function (text, domElement) {
    var qrcode = new QRCode(domElement);
    qrcode.makeCode(text);
  };

  var generator = function(){
    var domElement = document.getElementById('qr-code');
    var text = document.getElementById('email-field').value;
    $('#qr-code').empty();
    _makeCode(text,domElement);
    return false;
  } ;

  return {
    generator: generator
  }
}();