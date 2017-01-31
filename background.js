var key = "your API key";

function getCurrentTabUrl(){
  return new Promise(function(resolve, reject) {
    var queryInfo = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs){
      resolve(tabs[0].url);
    });
  });
}

function store(url, response){
  var dic = {}
  dic[url] = response.id
  console.log(dic);
  chrome.storage.local.set(dic)
}

function getShortURL(url){
  return new Promise(function(resolve, reject) {
    var API_URL = 'https://www.googleapis.com/urlshortener/v1/url?fields=id&key=' + key;
    var xml = new XMLHttpRequest();
    xml.open('POST', API_URL, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify({"longUrl": url}));
    xml.onload = function () {
      var response = JSON.parse(xml.response);
      if (response.id === undefined){
        reject(Error("Check active tab URL"));
      }
      else{
        resolve(response);
        console.log(response.id, url);
        store(url , response);
      }
    }
  });
}

function renderStatus(text){
  document.getElementById('result').textContent = text;
}

document.addEventListener('DOMContentLoaded', function(){
  getCurrentTabUrl().then(function (fulfilled){
    getShortURL(fulfilled).then(function (fulfilled){
      console.log(fulfilled.id);
      renderStatus(fulfilled.id);
    }, function (error){
      renderStatus("Check active tab URL");
    });
  });
});
