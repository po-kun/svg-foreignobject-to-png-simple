var worker = new Worker('./worker.js');
var imgToimg = document.getElementById('nulo');

(async () => {
    const masterSVG = document.getElementById('svgNode');
    var xml = new XMLSerializer().serializeToString(masterSVG);

    var sendMessage = function (xml) {
        return new Promise(function (resolve, reject) {
            worker.addEventListener('message', function(e) {
                resolve(e.data);
            }, false);

            
            worker.postMessage(xml);
        })
    };

    var img = new Image();


    var base64Pic = await sendMessage(xml);

    img.onload = function(){
        var canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 300;
        var ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0);
        var url = canvas.toDataURL("image/png");
        imgToimg.src = url;
    };

    img.src = base64Pic;
    document.body.append(img);
})()