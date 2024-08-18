const BASE_URL = 'https://shop.url/webapi/rest/bulk';
let BearerToken = "Bearer " + postToken();

// funkcja przygotowujaca bulkowe zapytanie z arkusza do api
function bulkRequest(startValue, numberOfItems = 25){

  //startValue = 65;

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('IMPORT');

  let updates = [];
  //numberOfItems = 25;

  for (let i = 1; i <= numberOfItems; i++){

      if(sheet.getRange("A"+i).getValue()==""){
        console.log("PUSTE " + sheet.getRange("A"+i).getValue() + " " + i);
      return 0;
    }
      updates.push({
          productId: sheet.getRange('A'+ startValue).getValue(),
          newPrice: sheet.getRange('B' + startValue).getValue(),
          newPriceWholesale: sheet.getRange('C' + startValue).getValue(),
          newPriceSpecial: sheet.getRange('D' + startValue).getValue()
      });
      startValue++;
  }

  //console.log(updates);
  return updates;
  
}

// funkcja do wypisania kodu odpowiedzi przez api
function codeRespose(startValue, responseFromQuery, numberOfItems = 25){

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('IMPORT');

  for (let i = 0; i < numberOfItems; i++) {
      sheet.getRange('E'+startValue).setValue(responseFromQuery.items[i]['code']);
      startValue++;
  }

}

// Główna funkcja ktora zarzadza pobieraniem danych z arkusza do api shoper
function bulkList(){

  let startTime = new Date();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('IMPORT');
  let lastRow = sheet.getLastRow();
  let countRecord = lastRow - 1;

  sheet.getRange(1 , 5, lastRow).clearContent();

  let mod = countRecord % 25;
  let forS = (countRecord-mod) / 25;
  
  console.log(countRecord+ " "+mod + " " + forS);

  if(mod==0){

    for(i = 0; i < forS; i++){
      var start = 2;

      let response = bulkCheck(bulkRequest(start));  
      if(response == 0) return 0;
      codeRespose(start,response);

      start+=25;  
    }

  }
  else{

    var start = 2; 

    for(i = 0; i< forS; i++){

      let response = bulkCheck(bulkRequest(start));
      if(response == 0) return 0;
      codeRespose(start,response);

      start+=25;

    }

    let response = bulkCheck(bulkRequest(start, mod));
    codeRespose(start,response, mod);

  }
  let endTime = new Date();
  let timeElapsed = endTime - startTime;

  console.log((timeElapsed/1000)/60+' min');
}

// funkcja wysylajaca zapytanie do api - wysylajaca dane do aktualizacji cen produktow 
function bulkCheck(updates){

  var bulkRequest = updates.map(function(update, index) {
    return {
      "id": "prod-update-" + index,
      "path": "/webapi/rest/products/" + update.productId, 
      "method": "PUT",
      "body": {
        "stock": {
          "price": update.newPrice,
          "price_wholesale": update.newPriceWholesale,
          "price_special": update.newPriceSpecial

        }
      }
    };
  });

  var options = {
    headers: {
      'Authorization': BearerToken,
      'content-type': 'application/json'
    },
    payload: JSON.stringify(bulkRequest)
  };


try {
    var response = UrlFetchApp.fetch(BASE_URL , options);
    let cap = response.getAllHeaders();
    if(cap['x-shop-api-calls'] == 9)
    {
        Utilities.sleep(500);
    }
    var content = JSON.parse(response);
    //console.log(content.items);

    return content;

  } catch (err) {
    //console.log('Wystąpił błąd: ' + err);
    return err;
  }

}