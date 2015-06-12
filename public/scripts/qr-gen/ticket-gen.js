/**
 * Created by atulr on 11/06/15.
 */
var ticketGenerator = function () {

  var _makeCode = function (text, domElement) {
    var qrcode = new QRCode(domElement);
    qrcode.makeCode(text);
  };

  var _verifyUser = function (emailIdToCheck) {

    //function setHeader(xhr) {
    //  xhr.setRequestHeader('email', 'jsconference@gmail.com');
    //  xhr.setRequestHeader('secret_key', '8c52a901-69cf-4260-8359-1328e9f6e2cf');
    //  return true;
    //}
    //$.ajax({
    //  url: "https://www.townscript.com/api/registration/getRegisteredUsers",
    //  data : {eventCode: "jschannel2015", email:'jsconference@gmail.com', secret_key:'8c52a901-69cf-4260-8359-1328e9f6e2cf'},
    //  dataType: "jsonp",
    //  type: "POST",
    //  beforeSend: setHeader
    //}).done(function (data) {
    //  console.log('response', data);
    //});
    //


    $.get('data/mock-user-data.json', function (result, status) {
      var attendeesList = JSON.parse(result.data);
      for (var i = 0; i < attendeesList.length; ++i) {
        if (emailIdToCheck === attendeesList[i].userEmailId) {
          _createTicket(attendeesList[i]);
          return;
        }
      }
      _userNotFoundError(emailIdToCheck);
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

      //var userData = {userEmailId: emailText};
      //_createTicket(userData);
    }

    return false; //form disabling form submission
  };

  var _calculateHeightForPdf = function () {
    var originalHeight = $('.ticket-container').height();
    var originalWidth = $('.ticket-container').width();
    var scaledWidth = 180;
    var scaledHeight = (originalHeight / originalWidth) * scaledWidth;
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