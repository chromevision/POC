'use strict';

const video = document.getElementById('live-video');

navigator.mediaDevices
	.getUserMedia({ video: true, audio: false })
	.then(function(stream) {
		video.srcObject = stream;
		video.play();
	})
	.catch(function(err) {
		console.log('An error occurred! ' + err);
	});

const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');

async function doTheThing(data, url) {
	// console.log(url.tablink);
	console.log('dothething');
	await fetch('http://localhost:3000/api/webcam', {
		method: 'POST',
		body: data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/octet-stream',
			tabUrl: JSON.stringify(url)
		}
	});
}

const tabInformation = () => {
	// let tablink = '';
	// let activeTab = {};
	// let tabObj = {};

	let tabURL = chrome.tabs.query(
		{ active: true, currentWindow: true },
		function(tabs) {
			let tab = tabs[0];
			console.log(tab.url);
			return tab.url;
			// console.log(tabs[0]);
			// console.log(tabs[0].url);
			// var activeTabId = activeTab.id; // or do whatever you need
			// });
			// let link =  chrome.tabs.getSelected(null, tab => {
			// 	// tabObj.tablink = tab.url;
			// 	// const tabURL = tab.url;
			// 	return tab.url;
		}
	);
	return tabURL;
};

const takePicture = () => {
	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	if (width && height) {
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0, width, height);

		const dataUri = canvas.toDataURL('image/jpeg', 1);
		const data = dataUri.split(',')[1];
		const mimeType = dataUri.split(';')[0].slice(5);
		const bytes = window.atob(data);
		const buf = new ArrayBuffer(bytes.length);
		const byteArr = new Uint8Array(buf);
		for (let i = 0; i < bytes.length; i++) {
			byteArr[i] = bytes.charCodeAt(i);
		}
		// let tabURL = chrome.tabs.query(
		// 	{ active: true, lastFocusedWindow: true },
		// 	function(tabs) {
		// 		let tab = tabs[0];
		// 		console.log(tab.url);
		// 	}
		// );
		while (tabURL !== undefined) {
			console.log(tabURL);
			doTheThing(byteArr, tabURL);
		}
	} else {
		// clearphoto();
	}
};

setInterval(function() {
	takePicture();
}, 5000);
