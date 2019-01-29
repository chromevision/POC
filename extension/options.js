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

async function doTheThing(imgData) {
  console.log(imgData);
  console.log('dothething');
  await fetch('http://localhost:3000/api/webcam', {
    method: 'POST',
    body: imgData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/octet-stream',
    },
  });
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
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
		console.log(data)
    // var toSend = dataURLtoBlob(data);
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
