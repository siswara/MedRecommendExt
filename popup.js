var isLoadingShown = false;
var EVENT_DOM_CONTENT_LOADED = 'DOMContentLoaded';

chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == "getSource") {
		//message.innerText = request.source;
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify({ "body" : request.source});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};
		
		//fetch("localhost:5000/bio_ner", requestOptions)
		fetch("http://127.0.0.1:5000/bio_ner", requestOptions)
			.then(response => response.json())
			.then(result => {
				toggleLoading();
				//message.innerHTML = '<ol><li>' + result['return'] + '</li></ol>';
				message.innerHTML = 'Disease(s) identified: <br>';
				tempInnerHTML = '<ul>';
				result['entities_with_links'].forEach(element => {
					tempInnerHTML += '<li>' + element['name'];
					tempInnerHTML += '<ol>';
					element['links'].forEach(link => {
						tempInnerHTML += '<li>' + link['title'] + ' - <a href="' + link['url'] + '" target="_blank"> '+
						link['url'] + '</a></li>';
					});
					tempInnerHTML += '</ol>';
					tempInnerHTML += '</li>';
				});
				tempInnerHTML += '</ul>';
				message.innerHTML += tempInnerHTML;
				//highlighting
				
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {
							highlight: true, entities: result['entities_with_links']
						}, function(response) {
						console.log(response);
					});
				});
			})
			.catch(error => console.log('error', error));
	}
});

function getCurrentDocumentHTML() {
	var ret = '';

	ret += document.title;
	//clean up
	ret += document.body.replace( /(<([^>]+)>)/ig, '');

	return ret;
}

function sendHighlightMessage() {
	toggleLoading();
	document.getElementById('highlight').disabled = true;

	var message = document.querySelector('#message');
	getCurrentTab().then(function(tab){
		console.log('### tab');
		console.log(tab);
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			files: ["getPagesSource.js"]
		  }, function(results) {
			// If you try and inject into an extensions page or the webstore/NTP you'll get an error
			console.log(results);
			if (chrome.runtime.lastError) {
			  message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
			}
		})

	});
}

async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	console.log('###tab');
	console.log(tab);
	return tab;
}

function toggleLoading(){
	console.log('### isLoadingShown: ' + isLoadingShown);
	if (isLoadingShown === undefined){
		isLoadingShown = false;
	} else {
		isLoadingShown = !isLoadingShown;
	}

	console.log(document.getElementById('loading').classList);
	if (isLoadingShown){
		document.getElementById('loading').classList.remove('hideLoading');
	} else {
		document.getElementById('loading').classList.add('hideLoading');
	}
}

document.getElementById('highlight').addEventListener('click', sendHighlightMessage, false);
//document.addEventListener(EVENT_DOM_CONTENT_LOADED, fireWhenDOMContentIsLoaded);