import React, { Component } from 'react';
import axios from 'axios';
import { Radar, Line } from 'react-chartjs-2';

const dataRadar = {
  labels: [
    'Anger',
    'Contempt',
    'Disgust',
    'Fear',
    'Happiness',
    'neutral',
    'Saddness',
    'Surprise',
  ],
  datasets: [
    {
      label: 'Snapshot:',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 90, 81, 56, 55, 40, 34],
    },
  ],
};

const dataLine = {
  labels: [
    '01/24/18',
    '01/25/18',
    '01/26/18',
    '01/27/18',
    '01/28/18',
    '01/29/18',
    '01/20/18',
  ],
  datasets: [
    {
      label: 'Happiness',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
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
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emotions: [],
    };
  }
  async componentDidMount() {
    try {
      const emotions = await axios.get('/api/emotions');
      this.setState({ emotions: emotions.data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.state.emotions);
    return (
      <div className="sub-nav">
        <h2> Your Google Snapshot: </h2>
        <Radar data={dataRadar} />
        <h2> Happiness trends while on Google: </h2>
        <Line data={dataLine} />
      </div>
    );
  }
}

export default Graph;
