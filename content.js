chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.highlight === true) {
    highlightText(document.body);
    sendResponse({messageStatus: "received"});
  }
});

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var options = {
    "element": "mark",
    "className": "",
    "exclude": [],
    "accuracy": "exactly",
    "diacritics": true,
    "synonyms": {},
    "iframes": false,
    "iframesTimeout": 5000,
    "acrossElements": false,
    "caseSensitive": false,
    "ignoreJoiners": false,
    "ignorePunctuation": [],
    "wildcards": "disabled",
    "each": function(node){
        // node is the marked DOM element
    },
    "filter": function(textNode, foundTerm, totalCounter, counter){
        // textNode is the text node which contains the found term
        // foundTerm is the found search term
        // totalCounter is a counter indicating the total number of all marks
        //              at the time of the function call
        // counter is a counter indicating the number of marks for the found term
        if (counter >= 2) {
          return false;
        }
        return true; // must return either true or false
    },
    "noMatch": function(term){
        // term is the not found term
    },
    "done": function(counter){
        // counter is a counter indicating the total number of all marks
    },
    "debug": false,
    "log": window.console
};

function highlightText(element) {
  var context = document.querySelector("body");
  var instance = new Mark(context);

  // From here is where we would loop through each word that we want to highlight
  // for word in wordlist:
  instance.mark("the ");

  const elems = document.getElementsByTagName("mark");
  console.log(elems);
  console.log(elems[0]);

  var el = document.createElement('button');
  el.innerHTML = " (x) ";
  el.onclick = function(){
    alert('link 1, link 2, link 3');return false;
  };
  var div = elems[0];
  insertAfter(div, el);
  // end for loop
}
