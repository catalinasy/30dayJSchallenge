//const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const video = document.getElementById("video");

function getVideo() {
  // navigator.mediaDevices.getUserMedia({ video: true, audio: false})
  //     .then(localMediaStream => {
  //         console.log(localMediaStream);
  //         // video.src = window.URL.createObjectURL(localMediaStream);
  //         video.src = window.HTMLMediaElement.srcObject(localMediaStream);
  //         video.play();
  //     });
  
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch( err => {
        console.error("Oh no!", err);
    })
}

function paintToCanvas(){
    setInterval(() => {
        const width= video.videoWidth;
        const height = video.videoHeight;
        canvas.width= width;
        canvas.height = height;
     
        return setInterval(() => {
            ctx.drawImage(video, 0, 0, width, height);
            let pixels = ctx.getImageData(0, 0, width, height);
            pixels = redEffect(pixels);
        }, 16);
        
    }, 100);


   
}

function redEffect(pixels){
    for(let i = 0; i < pixels.length; i+=4{
        pixels.data[i + 0] = pixels.data [i + 0] + 100; 
        pixels.data[i +1]= pixels.data[i+1] - 50;
        pixels.data [i+2] = pixels.data [i + 2] * 0.5 ;
    })
}


function takePhoto(){
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src = "${data} alt = "Handsome"/>`
    strip.insertBefore(link, strip.firstChild);


}


getVideo();

video.addEventListener('canplay', paintToCanvas);

