// Todo:
//	- Preserve line breaks (and other formatting)

// Set up menu and add listener to it
chrome.runtime.onInstalled.addListener(init());
// Add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// Create menu item
function init() {
	var title = "Hastebin Helper";
	var hasteUrlMenu = chrome.contextMenus.create({"id": "child1", "title": "New Haste", "contexts":["selection"]});
}

// The onClicked callback function
 function onClickHandler(info, tab) {
 	var post = new XMLHttpRequest();
 	var postData = JSON.stringify(info.selectionText);
 	postData = postData.substring(1, postData.length - 1);
 	var hastebinUrl = "http://hastebin.com/"
	post.open("POST", "http://hastebin.com/documents", true);
	post.setRequestHeader("Content-type", "application/json");
	// If a successful connection is made, grab the new Haste key from the server's response
	post.onreadystatechange = function() {
		if(post.readyState == 4 && post.status == 200) {
			var parsedData = JSON.parse(post.responseText);
			var hasteKey = parsedData.key;
			var hasteUrl = hastebinUrl + hasteKey;
			chrome.tabs.create({ url: hasteUrl });
		}
	}
	post.send(postData);
};
