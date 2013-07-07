var first = true;
var notified = false;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  url = tab.url;
  url = url.match('/*[^&]*');
  url = url[0];

  var shaObj = new jsSHA(url, "TEXT");
  var hash = shaObj.getHash("SHA-1", "B64");

  var chatterBox = new Firebase('https://webchatter.firebaseio.com/' + hash);

  var chatMaster = chatterBox.endAt().limit(1);
  if(first != true){  
    chatMaster.on('child_added', function(snapshot){

      if((parseInt(snapshot.val().timestamp) + 60000) >= (new Date).getTime() ){
        chrome.browserAction.setIcon({path: 'red_alert.png'});
        var notification = window.webkitNotifications.createNotification('http://i.imgur.com/nuwpSQf.png', snapshot.val().url, snapshot.val().name + ": " +snapshot.val().message);
       
        notification.onshow = setTimeout(function() {notification.close()}, 5000);
        notification.show();
      }
    });
    first = true;
  }else{
    first = false;
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.browserAction.setIcon({path: 'alert.png'});

  chrome.tabs.query({'active': true}, function (tabs) {
    url = tabs[0].url;

    if(url.match('www.google.com')){
      url = url.match('\&q=.+&\b');
      url = url[0];
      url = 'www.google.com/' + url; 
    }else{
      url = url.match('/*[^&]*');
      url = url[0];  
    }
    
    var shaObj = new jsSHA(url, "TEXT");
    var hash = shaObj.getHash("SHA-1", "B64");

    var chatterBox = new Firebase('https://webchatter.firebaseio.com/' + hash);

    var chatMaster = chatterBox.endAt().limit(1);
    chatMaster.once('child_added', function(snapshot){
      // alert("ChatChild");

      if((parseInt(snapshot.val().timestamp) + 60000) >= (new Date).getTime() ){
        chrome.browserAction.setIcon({path: 'red_alert.png'});
        var notification = window.webkitNotifications.createNotification('http://i.imgur.com/nuwpSQf.png', snapshot.val().url, snapshot.val().name + ": " +snapshot.val().message);
       
        notification.onshow = setTimeout(function() {notification.close()}, 5000);
        notification.show();
      }

    });
  });

});