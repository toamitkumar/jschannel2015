/**
 * Created by atulr on 11/06/15.
 */
var ticketGenerator = function () {

  var _makeCode = function (text, domElement) {
    var qrcode = new QRCode(domElement);
    qrcode.makeCode(text);
  };

  var _verifyUser = function (emailIdToCheck) {
    $('.loading-area').show();
    $.get('/getAllUsers?email=' + emailIdToCheck, function (result, status) {
      $('.loading-area').hide();
      if (result.length > 0) {
        _createTicket(result[0]);
      } else {
        _userNotFoundError(emailIdToCheck);
      }
    });
  };

  var _userNotFoundError = function (email) {
    $('.user-not-found').empty().text('User with Email ' + email + ' has not registered !');
    $('.error-area').show();
  };

  var _createTicket = function (userData) {
    var qrArea = $('#qr-code').empty()[0];
    _makeCode(userData.userEmailId, qrArea);
    console.log(userData);
    $('#attendee-name').text(userData.userName);
    $('#attendee-email').text(userData.userEmailId);
    $('#attendee-gender').text(userData.Gender);
    $('.ticket-container').css('display', 'flex');
  };

  var generator = function () {
    var emailText = document.getElementById('email-field').value;
    $('.error-area').hide();
    $('.ticket-container').hide();
    if (emailText.length > 0) {
      _verifyUser(emailText);

      //var userData = {userEmailId: emailText, userName:'sohasfbfbm', Gender:'Male'};
      //_createTicket(userData);
    }

    return false; //form disabling form submission
  };

  var _calculateHeightForPdf = function () {
    var originalHeight = $('.ticket-container').height();
    var originalWidth = $('.ticket-container').width();
    var scaledWidth = 180;
    var scaledHeight = (originalHeight / originalWidth) * scaledWidth * 0.8;
    return scaledHeight;
  };

  var _createPDF = function (canvas) {
    var imgData = canvas.toDataURL('image/jpeg', 1.0);
    var doc = new jsPDF();
    doc.addImage(imgData, 'JPEG', 15, 40, 180, _calculateHeightForPdf());
    doc.save('JSCHANNEL-ticket.pdf');
  };

  var _createPNG = function (canvas) {
    var imageData = canvas.toDataURL('image/png', 1.0);
    var download = document.createElement('a');
    download.href = imageData;
    download.download = 'JSCHANNEL-ticket.png';
    download.click();
  };

  var downloadTicket = function (fileType) {
    $('.download-section').hide();
    html2canvas($('.ticket-container')[0], {
      onrendered: function (canvas) {
        $('.download-section').show();
        if (fileType === 'pdf') {
          _createPDF(canvas);
        } else if (fileType === 'png') {
          _createPNG(canvas);
        }
      }
    });
  };


  return {
    generator: generator,
    downloadTicket: downloadTicket
  }

}();