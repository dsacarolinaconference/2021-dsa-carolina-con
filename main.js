
var templateHasLoaded = false;
var photoHasUploaded = false;
var ringHasLoaded = false;
var defaultImgHasLoaded = false;
var templateImg = new Image();
var defaultImg = new Image();
var photoImg = new Image();
var ringImg = new Image();

window.onload = function () {

    templateImg.onload = function () {

        templateHasLoaded = true;
        readyCheck();
    };
    ringImg.onload = function () {
        ringHasLoaded = true;
        readyCheck();
    }
    defaultImg.onload = function () {
        defaultImgHasLoaded = true;
        readyCheck();
    }

    templateImg.src = "template.png";
    ringImg.src = "ring.png";
    defaultImg.src = "default_photo.png";

    setUpUploadButton();

    document.getElementById('first-name').oninput = function () {
        renderCanvas();
    };

    document.getElementById('img-size').oninput = function () {
        renderCanvas();
    };
    document.getElementById('x-offset').oninput = function () {
        renderCanvas();
    };
    document.getElementById('y-offset').oninput = function () {
        renderCanvas();
    };

};

function renderCanvas() {

    var bullseyeX = 900;
    var bullseyeY = 150;

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);


    //rendering the portrait photo:

    var myimg;
    if (photoHasUploaded) { myimg = photoImg; }
    else { myimg = defaultImg; }

    var minSide = Math.min(myimg.width, myimg.height);
    var scale = 250 / minSide;

    var XOff = document.getElementById("x-offset").value - 50;
    var YOff = document.getElementById("y-offset").value - 50;

    if (document.getElementById("img-size").value > 1) {

        scale = scale * (1 + (document.getElementById("img-size").value / 20));

XOff = XOff * scale * 2;
YOff = YOff * scale * 2;
    }


    ctx.drawImage(myimg, XOff + bullseyeX - (myimg.width * scale) / 2, YOff + bullseyeY - (myimg.height * scale) / 2, myimg.width * scale, myimg.height * scale);


    ///end rendering the portrait photo

    if (templateHasLoaded) {
        ctx.drawImage(templateImg, 0, 0);
    }

    ctx.font = "45px Roboto Mono";
    ctx.fillStyle = "#FF00FF";
    ctx.strokeStyle = "#000000";
    var textLine = "Hi, my name is " + document.getElementById("first-name").value;
    ctx.fillText(textLine, 50, 50);
    ctx.strokeText(textLine, 50, 50);
    ctx.fillText("and I'm attending the", 50, 105);
    ctx.strokeText("and I'm attending the", 50, 105);
    ctx.fillText("conference. Join me!", 50, 160);
    ctx.strokeText("conference. Join me!", 50, 160);

    if (ringHasLoaded) {

        ctx.drawImage(ringImg, bullseyeX - (ringImg.width / 2), bullseyeY - (ringImg.height / 2));

    }

};

function isReady() {

    setTimeout(function () {
        renderCanvas();
        document.getElementById("loading").style.visibility = "hidden";
        document.getElementById("loading").style.display = "none";
        document.getElementById("top-control").style.visibility = "visible";
    }, 1500);


}

function readyCheck() {
    if (templateHasLoaded && ringHasLoaded && defaultImgHasLoaded) {
        isReady();
    }
}

function setUpUploadButton() {


    let imgInput = document.getElementById('imageInput');
    imgInput.addEventListener('change', function (e) {
        if (e.target.files) {
            let imageFile = e.target.files[0]; //here we get the image file
            var reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = function (e) {

                photoImg.src = e.target.result; // Assigns converted image to image object
                photoImg.onload = function (ev) {

                    photoHasUploaded = true;
                    renderCanvas();
                }
            }
        }
    });

}

function downloadCanvas(){  
    // get canvas data  
    var canvas = document.getElementById("myCanvas");
    var image = canvas.toDataURL();  
  
    // create temporary link  
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'image.png'; // set the name of the download file 
    tmpLink.href = image;  
  
    // temporarily add link to body and initiate the download  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
}

