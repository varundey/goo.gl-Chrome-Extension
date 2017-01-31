/* uncomment the function below to manually clear the
    chrome local storage while testing */

// chrome.storage.local.clear(function (callback){
//   console.log(callback);
//   console.log("cleared");
// })

chrome.storage.local.get(null, function(callback){
  console.log(callback);
  var table = document.getElementById('result');

  for (var key in callback){
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    cell1.innerHTML = key;
    cell2.innerHTML = callback[key];
  }
})
