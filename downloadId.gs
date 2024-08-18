// funkcja trwa za dlugo na jeden obieg 30min max na appscript potrzebne sa przynajmniej dwa obiegi

function getProductId() {

  let pagesShoper = howManyPages();
  let BearerToken = "Bearer "+postToken();

  for(page = 1; page<=pagesShoper; page++)
  {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('id');

  console.log(page);

  let url = `https://shop.url/webapi/rest/products?limit=50&page=${page}`;

  var options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ',
      'content-type': 'application/json'
    }
  };

    let response = UrlFetchApp.fetch(url, options);
    let cap = response.getAllHeaders();
    if(cap['x-shop-api-calls'] == 9)
    {
        Utilities.sleep(500);
    }
    let content = JSON.parse(response.getContentText());


    for(i = 0; i<50; i++){
      let productCode = content.list[i].code;
      let productId = content.list[i].product_id;
      
      let last = sheet.getLastRow() + 1;

      sheet.getRange('A'+ last).setValue(productCode);
      sheet.getRange('B'+ last).setValue(productId);

    }
  }
}

function howManyPages(){

  let url = `https://shop.url/webapi/rest/products/?limit=50`;
  let BearerToken = "Bearer "+postToken();


  var options = {
    method: 'GET',
    headers: {
      'Authorization': BearerToken,
      'content-type': 'application/json'
    }
  };

  try {
    let response = UrlFetchApp.fetch(url, options);
    let content = JSON.parse(response.getContentText());

    let pages = content.pages;

    console.log(pages);
    return pages;

  } catch (err) {
    console.log('Wystąpił błąd: ' + err);
  }

}