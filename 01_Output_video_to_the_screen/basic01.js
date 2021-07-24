/* 1. 미디어 접근 허용 받기 */
// constraints : 내가 받고자 하는 미디어 상태
// navigator.mediaDevices : 엑세스 허용 요청


/* 2. 미디어 장치 쿼리 */
async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

// Get the initial set of cameras connected
const videoCameras = getConnectedDevices('videoinput');
console.log(videoCameras)



/* 3. 장치 변경 수신 */
function updateCameraList(cameras) {
    console.log('hi',cameras)
    const listElement = document.querySelector('select#availableCameras');
    listElement.innerHTML = '';
    cameras.map(camera => {
        const cameraOption = document.createElement('option');
        cameraOption.label = camera.label;
        cameraOption.value = camera.deviceId;
    }).forEach(cameraOption => listElement.add(cameraOption));
}

// Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener('devicechange', event => {
    const newCameraList = getConnectedDevices('videoinput');
    updateCameraList(newCameraList);
});



/* 4. 미디어 제약 */
// Open camera with at least minWidth and minHeight capabilities
async function openCamera(cameraId, minWidth, minHeight) {
    const constraints = {
        'audio': {'echoCancellation': true},
        'video': {
            'deviceId': cameraId,
            'width': {'min': minWidth},
            'height': {'min': minHeight}
            }
        }

    return await navigator.mediaDevices.getUserMedia(constraints);
}

const cameras = getConnectedDevices('videoinput');
if (cameras && cameras.length > 0) {
    // Open first available video camera with a resolution of 1280x720 pixels
    const stream = openCamera(cameras[0].deviceId, 1280, 720);
}


/* 5. 로컬 재생 */
async function playVideoFromCamera() {
    try {
        const constraints = {'video': true, 'audio': true};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.querySelector('video#localVideo');
        videoElement.srcObject = stream;
    } catch(error) {
        console.error('Error opening video camera.', error);
    }
}

playVideoFromCamera()