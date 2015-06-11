/**
 * Created by atulr on 11/06/15.
 */
var ticketGenerator = function () {

  var _makeCode = function (text, domElement) {
    var qrcode = new QRCode(domElement);
    qrcode.makeCode(text);
  };

  var _verifyUser = function (emailIdToCheck) {
    $.get('data/mock-user-data.json', function (result, status) {
      var attendeesList = result.data;
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
    $('.user-not-found').empty().text('User with Email '+email+' has not registered !');
    $('.error-area').show();
  };

  var _createTicket = function (userData) {
    var qrArea = $('#qr-code').empty()[0];
    _makeCode(userData.userEmailId,qrArea);
    console.log(userData);
    $('.ticket-container').show();
  };

  var generator = function () {
    var emailText = document.getElementById('email-field').value;
    $('.error-area').hide();
    $('.ticket-container').hide();
    if (emailText.length > 0) {
      _verifyUser(emailText);
    }
  };

  return {
    generator: generator
  }
}();