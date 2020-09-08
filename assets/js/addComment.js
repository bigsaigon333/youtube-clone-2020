import axios from "axios";

const addCommentForm = document.querySelector("#jsAddCommentForm");
const commentList = document.querySelector("#jsCommentList");
const commentNumber = document.querySelector("#jsCommentNumber");

function increaseNumber() {
	let numComment = parseInt(commentNumber.innerHTML, 10) + 1;
	commentNumber.innerHTML = numComment;
	if (numComment == 1) {
		commentNumber.innerHTML += " comment";
	} else {
		commentNumber.innerHTML += " comments";
	}
}

function addComment(comment) {
	const li = document.createElement("li");
	const span = document.createElement("span");
	span.innerHTML = comment;
	li.appendChild(span);
	commentList.prepend(li);
	increaseNumber();
}

async function sendComment(comment) {
	// console.log(comment);
	const videoId = document.URL.split("/videos/")[1];
	const url = `/api/${videoId}/comment`;
	try {
		const response = await axios({
			url,
			method: "POST",
			data: {
				comment,
			},
		});
		console.log(response);
		if (response.status == 200) {
			addComment(comment);
		}
	} catch (error) {
		console.error(error);
	}
}

function handleSubmit(event) {
	event.preventDefault();
	const commentInput = addCommentForm.querySelector("input");
	const comment = commentInput.value;
	sendComment(comment);
	commentInput.value = "";
}

function init() {
	addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
	init();
}
