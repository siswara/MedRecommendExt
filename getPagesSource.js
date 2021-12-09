function getBody(document_root) {
    var ret = document.title;
	//clean up
	ret += document.body.innerHTML.replace( /(<([^>]+)>)/ig, '');
    console.log('### ret : ');
    console.log(ret);
    return ret;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: getBody(document)
});