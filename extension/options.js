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

const takePicture = async () => {
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

		async function getCurrentTab(callback) {
			await chrome.tabs.query(
				{
					active: true,
					currentWindow: true
				},
				function(tabs) {
					callback(tabs[0]);
				}
			);
		}

		async function displayTab(tab) {
			let tabURL = tab.url;
			await fetch('http://localhost:3000/api/webcam', {
				method: 'POST',
				body: byteArr,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/octet-stream',
					tabUrl: tabURL
				}
			});
		}

		getCurrentTab(displayTab);
	} else {
		// clearphoto();
	}
};

setInterval(function() {
	takePicture();
}, 5000);
