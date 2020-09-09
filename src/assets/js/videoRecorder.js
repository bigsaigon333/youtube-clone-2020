const recordContainer = document.querySelector("#jsRecordContainer");
const recordButton = document.querySelector("#jsRecordBtn");
const videoPreview = document.querySelector("#jsVideoPreview");
let videoRecorder;

function handleVideoData(event) {
	// console.log(event.data);
	const { data: videoFile } = event;
	const link = document.createElement("a");
	link.href = URL.createObjectURL(videoFile);
	link.download = "recorded.webm";
	document.body.appendChild(link);
	link.click();
}

function startRecording(stream) {
	videoRecorder = new MediaRecorder(stream);
	// console.log(videoRecorder);
	videoRecorder.addEventListener("dataavailable", handleVideoData);

	videoRecorder.start();
	videoPreview.muted = true;
	recordButton.innerHTML = "Stop Recording";
	recordButton.classList.toggle("video__button--recording");
	recordButton.addEventListener("click", stopRecording);
}

function stopRecording() {
	videoRecorder.stop();
	recordButton.innerHTML = "Start Recording";
	recordButton.classList.toggle("video__button--recording");
	recordButton.removeEventListener("click", stopRecording);
	recordButton.addEventListener("click", startRecording);
}

async function getVideoStream() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: { width: 1280, height: 720 },
		});
		videoPreview.srcObject = stream;
		videoPreview.play();
		startRecording(stream);
	} catch (error) {
		console.error("You denied recording", error.name, error.message);
		recordButton.innerHTML = "can't access to record function";
	} finally {
		recordButton.removeEventListener("click", getVideoStream);
	}
}

function init() {
	recordButton.addEventListener("click", getVideoStream);
}

if (recordContainer) {
	init();
}
