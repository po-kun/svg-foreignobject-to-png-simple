self.addEventListener('message',function(e){
    var b64 = btoa(e.data);
    self.postMessage("data:image/svg+xml;base64," + b64);
});