const videoContainer = document.querySelector("#jsVideoPlayer");
const video = document.querySelector("#jsVideoPlayer video");
const playBtn = document.querySelector("#jsPlayButton");
const volumeBtn = document.querySelector("#jsVolumeButton");
const fullScreenBtn = document.querySelector("#jsFullScreenButton");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const volumeRange = document.querySelector("#jsVolume");

function registerView() {
	try {
		const videoId = document.URL.split("videos/")[1];
		fetch(`/api/${videoId}/view`, { method: "POST" });
	} catch (e) {
		console.error(e);
	}
}

function setCurrentTime() {
	// console.log(video.currentTime);

	currentTime.innerHTML = formatDate(video.currentTime);
}

function setTotalTime() {
	console.log(video.duration);
	totalTime.innerHTML = formatDate(video.duration);
}

const formatDate = (seconds) => {
	const secondNumber = parseInt(seconds, 10);
	let hrs = Math.floor(secondNumber / 3600);
	let min = Math.floor((secondNumber % 3600) / 60);
	let sec = secondNumber % 60;

	return (
		("0" + hrs).slice(-2) +
		":" +
		("0" + min).slice(-2) +
		":" +
		("0" + sec).slice(-2)
	);
};

function toggleFullScreenClick() {
	if (!document.fullscreenElement) {
		videoContainer
			.requestFullscreen()
			.then(() => {
				fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
				video.classList.toggle("videoPlayer--fullscreen");
			})
			.catch((error) => console.error(`You can't get a full screen: ${error}`));
	} else {
		document.exitFullscreen().then(() => {
			fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
			video.classList.toggle("videoPlayer--fullscreen");
		});
	}
}

function handleVolumeClick() {
	if (video.muted) {
		video.muted = false;
		volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
		volumeRange.value = video.volume;
	} else {
		video.muted = true;
		volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';

		volumeRange.value = 0;
	}
}

function handlePlayClick() {
	if (video.paused) {
		video.play();
		playBtn.innerHTML = '<i class="fas fa-pause"></i>';
	} else {
		video.pause();
		playBtn.innerHTML = '<i class="fas fa-play"></i>';
	}
}

function handleEnded() {
	console.log("Video Ended");
	video.currentTime = 0;
	playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleVolumeControl(event) {
	console.log(event);
	video.volume = event.target.value;

	if (video.volume > 0.7) {
		volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
	} else if (video.volume > 0.4) {
		volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
	} else {
		volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
	}
}

function init() {
	video.volume = volumeRange.value;
	playBtn.addEventListener("click", handlePlayClick);
	volumeBtn.addEventListener("click", handleVolumeClick);
	fullScreenBtn.addEventListener("click", toggleFullScreenClick);
	video.addEventListener("loadedmetadata", setTotalTime);
	video.addEventListener("loaded", setTotalTime);

	video.addEventListener("timeupdate", setCurrentTime);

	video.addEventListener("ended", handleEnded);
	video.addEventListener("ended", registerView);

	volumeRange.addEventListener("input", handleVolumeControl);
}

if (videoContainer) {
	init();
}
