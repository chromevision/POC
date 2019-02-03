
export const datafyRadar = (arr) => {
  // console.log(arr);
  let values = [];
  let keys = [];
  arr.map(n => {
    values.push(Object.values(n).slice(2,9));
    keys.push(Object.keys(n).slice(2,9));
  });
  // console.log(keys, values);
  // const keysArr = keys[0];
  // console.log(keysArr);
  // const valuesArr = values[0];
  // console.log(valuesArr);
  // for(let i = 0; i < values.length; i++){
  //   for(let j = 0; j < i.lenght; j++){

  //   }
  // }
  // console.log(values);
  return [keys[0], values[4]];
};

export const datafyLine = (arr, emotion) => {
  let data = [];
  let dates = [];
  for(let i = 0; i < arr.length; i++){
    for(let key in arr[i]){
      if(key === emotion){
        data.push(arr[i][key]);
      }
      if(key === 'createdAt'){
        dates.push(`${arr[i][key].slice(0, 10)}`);
      }
    }
    data.map(number => {
      return number*100;
    });
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
        data: data
      }
    ]
  };
};

