// funkcja pobierajaca nowy token

function postToken() {
  var url = 'https://shop.url/webapi/rest/auth';
  var client_id = '';
  var client_secret = '';

  var options = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(client_id + ':' + client_secret),
    }
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var content = JSON.parse(response);
    var token = content.access_token;
    console.log(token);
    return String(token);
  } catch (err) {
    console.log('Wystąpił błąd: ' + err);
  }
}