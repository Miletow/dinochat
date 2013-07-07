var url;
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

	var chatRoom = new Firebase('https://webchatter.firebaseio.com/' + hash);
	

	var form =  document.getElementById('chat-form');
	var messageInput = document.getElementById('message-input');
	var nameInput = document.getElementById('name-input');
	
	form.addEventListener('submit',function(event){
	 		event.preventDefault();
	 		var currTime = new Date();

	 		nameInput.value = (nameInput.value == "") ? "anonymous" : nameInput.value;
	 		chatRoom.push({name: nameInput.value, message: messageInput.value, timestamp: Firebase.ServerValue.TIMESTAMP, url: url});
	 		messageInput.value ="";
	});

	var messageList = document.getElementById('chat-message-list');
	var form =  document.getElementById('chat-form');

	var lastChat = chatRoom.endAt().limit(20);
	lastChat.on('child_added', function(snapshot){
		var li = document.createElement('li');

		var currTime = new Date(snapshot.val().timestamp);
		li.innerHTML = "<span id='username'>" + snapshot.val().name + ": </span>";
		li.innerHTML += "<span class='message'>[" + currTime.toLocaleTimeString() + "]</span>";
		li.innerHTML += "<span class='message'>" + parse(snapshot.val().message) + "</span>";
		messageList.appendChild(li);

		messageList.scrollTop = messageList.scrollHeight;
	
	});
});