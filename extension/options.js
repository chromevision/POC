// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// let page = document.getElementById('buttonDiv');
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function() {
//       chrome.storage.sync.set({ color: item }, function() {
//         console.log('color is ' + item);
//       });
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);

const video = document.getElementById('live-video');
// video.onClick = () => snapshot();

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

function doTheThing(imgData) {
	console.log('dothething');
	console.log(imgData);
	// var xhr = new XMLHttpRequest();

	// xhr.onload = () => {
	// 	if (xhr.status >= 200 && xhr.status < 300) {
	// 		console.log('success!', xhr);
	// 	} else {
	// 		console.log('ugh');
	// 	}
	// 	console.log('every single time');
	// };

	// Request parameters.
	// var params = {
	// 	returnFaceId: true,
	// 	returnFaceLandmarks: false,
	// 	returnFaceAttributes: 'emotion'
	// };

	// const url = 'http://localhost:3000/api/webcam';

	// fetch(url, {
	// 	method: 'POST',
	//   body: imgData,

	// });
	const body = new FormData();
	body.append('image', imgData);
	// const body = imgData;
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:3000/api/webcam');
	// xhr.setRequestHeader('Content-Type', 'application/octect-stream');
	// xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.send(body);

	// xhr.open('POST', `http://localhost:3000/api/webcam`);
	// xhr.setRequestHeader('Content-Type', 'application/json');
	// xhr.setRequestHeader(
	// 	'Ocp-Apim-Subscription-Key',
	// 	'07463fe19ab1489aa9676f89bcb74fe3'
	// );

	// xhr.send(new Blob(imgData));
}

function takePicture() {
	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	if (width && height) {
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0, width, height);

		var data = canvas.toDataURL('image/png');
		doTheThing(data);

		// var data =
		// 	canvas.toBlob(function(blob) {
		// 		let blobby = URL.createObjectURL(blob);
		// 		console.log(blobby);
		// 		// 	console.log(link.href); // this line should be here
		// 	})
		// 	// , 'image/png')
		// );
		// photo.setAttribute('src', data);
	} else {
		// clearphoto();
	}
}

setInterval(function() {
	takePicture();
}, 5000);
