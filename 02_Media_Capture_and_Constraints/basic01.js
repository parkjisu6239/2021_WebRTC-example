async function playVideoFromCamera() {
    try {
        const constraintsVideo = {
            'video': {
                "width": 320,
                "height": 240
            }, 
            'audio': false
        }
        const constraintsShare = {
            video: {
                cursor: 'always' | 'motion' | 'never',
                displaySurface: 'application' | 'browser' | 'monitor' | 'window'
            }
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraintsVideo);
        const recording = await navigator.mediaDevices.getDisplayMedia(constraintsShare);

        const shareVideoElement = document.querySelector('video#localShareVideo')
        const videoElement = document.querySelector('video#localVideo');

        videoElement.srcObject = stream;
        shareVideoElement.srcObject = recording;
    } catch(error) {
        console.error('Error opening video camera.', error);
    }
}

playVideoFromCamera()