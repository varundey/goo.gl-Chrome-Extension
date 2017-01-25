var key = "your API key here";

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

function renderStatus(statusText) {
  document.getElementById('result').textContent = statusText;
}

function getShortURL(LongURL, callback) {
  var API_URL = 'https://www.googleapis.com/urlshortener/v1/url?fields=id&key=' + key;

  var xml = new XMLHttpRequest();
  xml.open('POST', API_URL, true);
  xml.setRequestHeader("Content-Type", "application/json");
  //console.log(Url, searchTerm);
  xml.send(JSON.stringify({"longUrl": LongURL}));
  console.log(xml);
  xml.onload = function(){
    var response = xml.response;
    callback(response);
  };
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    getShortURL(url, function(result) {
      result = JSON.parse(result);
      console.log(result.id);
      if (result.id === undefined){
        return renderStatus("Check your tab URL");
      };
      renderStatus(result.id);
      });
  });
});
