// chrome.runtime.onInstalled.addListener(() => {
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });
chrome.runtime.onConnect.addListener(port => {
  console.log('connected ', port);

  if (port.name === 'hi') {
    port.onMessage.addListener(this.processMessage);
  }
});
