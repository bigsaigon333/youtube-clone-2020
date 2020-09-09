const flashMessageContainer = document.querySelector(
	".flash-message__container"
);

function init() {
	setTimeout(() => flashMessageContainer.remove(), 4000);
}

if (flashMessageContainer) {
	init();
}
