const screenshotBtn     = document.querySelector("#src-btn")
const screenShotPreview = document.querySelector('.src-preview')
const closeScreenshot   = document.querySelector('#close-btn')

async function captureScreen() {
    try {
        // getDisplayMedia prompts the user to select and grant permission to capture the contents of the display or tab
        const stream = await navigator.mediaDevices.getDisplayMedia({preferCurrentTab: true})
        const video = document.createElement('video')

        video.addEventListener('loadedmetadata', ()=> {

            videoActions(canvas,ctx,video)

            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext('2d')


            // Passing video width & height as canvas width & height
            canvas.width  = video.videoWidth
            canvas.height = video.videoHeight

            video.play() // Playing the video so the drawn image won't be black or blank

            // Drawing an image from the captured video stream
            ctx.drawImage(video, 0,0,canvas.width, canvas.height)
            stream.getVideoTracks()[0].stop() // Terminating first video track of the stream


            // Passing canvas data url as screenshot preview src
            screenShotPreview.querySelector('img').src = canvas.toDataURL()
            screenShotPreview.classList.add("show")
        })


        video.srcObject = stream // Passing capture stream data as video source object
        console.log(stream)
    }catch(err) {
        alert('Failed to capture screenshot!')
    }
}

function videoActions(canvas,ctx,video) {

}   


closeScreenshot.addEventListener('click',() => {
    screenShotPreview.classList.remove('show')
})
screenshotBtn.addEventListener('click', captureScreen)