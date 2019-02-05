export const datafyRadar = arr => {
	let values = [];
	arr.map(n => {
		values.push(Object.values(n).slice(2, 10));
	});

	return {
		labels: [
			'anger',
			'contempt',
			'disgust',
			'fear',
			'happiness',
			'neutral',
			'sadness',
			'surprise'
		],
		datasets: [
			{
				label: 'Snapshot:',
				backgroundColor: [
					'#4BC0C0',
					'#FFCE56',
					'#E7E9ED',
					'#36A2EB',
					'#FF6384',
					'#4BC0C0',
					'#FFCE56',
					'#E7E9ED',
					'#36A2EB'
				],
				borderColor: 'rgba(	127,255,212,.25)',
				pointBackgroundColor: 'rgba(255,99,132,1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(255,99,132,1)',
				data: avgOfEmotionValues(values)
			}
		]
	};
};

const avgOfEmotionValues = arr => {
	console.log(arr);
	let arrOfAvgs = [];
	let sum = 0;

	console.log(arr[arr.length - 1]);
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < arr.length - 1; j++) {
			sum += arr[j][i] * 1;
		}
		arrOfAvgs.push((sum / arr.length).toFixed(4));
		sum = 0;
	}
	console.log('arrOfAvg', arrOfAvgs);
	return arrOfAvgs;
};

export const datafyLine = (arr, emotion) => {
  let data = [];
  let dates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let key in arr[i]) {
      if (arr[i].hasOwnProperty(key)) {
        if (key === emotion) {
          data.push(arr[i][key]);
        }
        if (key === 'createdAt') {
          dates.push(`${arr[i][key].slice(0, 10)}`);
        }
      }
    }
  }
  return {
    labels: dates,
    datasets: [
      {
        label: emotion,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,99,132,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data,
      },
    ],
  };
};
