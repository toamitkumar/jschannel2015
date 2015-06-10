/**
 * Created by sohamchetan on 10/06/15.
 */
var qrcode = new QRCode(document.getElementById("qrcode")/*, {
  width : 500,
  height : 500
}*/);

function makeCode () {
  var text = document.getElementById("text");

  if (!text.value) {
    alert("Input a text");
    text.focus();
    return;
  }

  qrcode.makeCode(text.value);
}