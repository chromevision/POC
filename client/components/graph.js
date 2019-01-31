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
      <div>
        <h1> Your Google Snapshot: </h1>
        <Radar data={dataRadar} />
        <h1> Happiness trends while on Google: </h1>
        <Line data={dataLine} />
      </div>
    );
  }
}

export default Graph;

// https://github.com/uber/react-vis/tree/master/showcase
//   Folders: examples, plot

// package.json

// {
//   "name": "my-awesome-vis-app",
//   "version": "0.1.0",
//   "private": true,
//   "dependencies": {
//     "react": "^16.7.0",
//     "react-dom": "^16.7.0",
//     "react-scripts": "2.1.3",
//     "react-vis": "^1.11.6"
//   },
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
//   "eslintConfig": {
//     "extends": "react-app"
//   },
//   "browserslist": [
//     ">0.2%",
//     "not dead",
//     "not ie <= 11",
//     "not op_mini all"
//   ]
// }

// App.js

// import React, { Component } from 'react';
// import './App.css';
// import '../node_modules/react-vis/dist/style.css';
// import LineGraph from './Components/LineGraph'
// import LabelGraph from './Components/LabelGraph'
// import ContourGraph from './Components/ContourGraph'
// import WhiskerGraph from './Components/WhiskerGraph'
// import LineMarkGraph from './Components/LineMarkGraph'

// class App extends Component {
//   render() {
//     return (
//       <div>

//         <div className="App">
//           <LineGraph />
//           <LabelGraph />
//           <ContourGraph />
//           <WhiskerGraph />
//           <LineMarkGraph />
//         </div>

//         <div className="App">
//         </div>

//         <div>

//         </div>

//       </div>
//     );
//   }
// }

// export default App;

// Label Graph

// import React, { Component } from 'react'
// import '../../node_modules/react-vis/dist/style.css';
// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   VerticalGridLines,
//   HorizontalGridLines,
//   LabelSeries
//   } from 'react-vis';

// export default class LabelGraph extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }

//   render () {
//     const data = [
//       {x: 0, y: 8},
//       {x: 1, y: 5},
//       {x: 2, y: 4},
//       {x: 3, y: 9},
//       {x: 4, y: 1},
//       {x: 5, y: 7},
//       {x: 6, y: 6},
//       {x: 7, y: 3},
//       {x: 8, y: 2},
//       {x: 9, y: 0}
//     ];
//     return (
//       <div>
//         <XYPlot height={300} width= {300}>
//           <VerticalGridLines />
//           <HorizontalGridLines />
//           <XAxis />
//           <YAxis />
//           <LabelSeries data={data} />
//         </XYPlot>
//       </div>
//     )
//   }
// }

// Contour Graph

// import React, { Component } from 'react'
// import '../../node_modules/react-vis/dist/style.css';
// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   VerticalGridLines,
//   HorizontalGridLines,
//   ContourSeries,
//   } from 'react-vis';

// export default class ContourGraph extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }

//   render () {
//     const data = [
//       {x: 0, y: 8},
//       {x: 1, y: 5},
//       {x: 2, y: 4},
//       {x: 3, y: 9},
//       {x: 4, y: 1},
//       {x: 5, y: 7},
//       {x: 6, y: 6},
//       {x: 7, y: 3},
//       {x: 8, y: 2},
//       {x: 9, y: 0}
//     ];
//     return (
//       <div>
//         <XYPlot height={300} width= {300}>
//           <VerticalGridLines />
//           <HorizontalGridLines />
//           <XAxis />
//           <YAxis />
//           <ContourSeries data={data} />
//         </XYPlot>
//       </div>
//     )
//   }
// }

// Line Mark Graph

// import React, { Component } from 'react'
// import '../../node_modules/react-vis/dist/style.css';
// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   VerticalGridLines,
//   HorizontalGridLines,
//   LineMarkSeries,
//   } from 'react-vis';

// export default class LineMarkGraph extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }

//   render () {
//     const data = [
//       {x: 0, y: 8},
//       {x: 1, y: 5},
//       {x: 2, y: 4},
//       {x: 3, y: 9},
//       {x: 4, y: 1},
//       {x: 5, y: 7},
//       {x: 6, y: 6},
//       {x: 7, y: 3},
//       {x: 8, y: 2},
//       {x: 9, y: 0}
//     ];
//     return (
//       <div>
//         <XYPlot width={400} height={300}><XAxis/><YAxis/>
//           <HorizontalGridLines />
//           <VerticalGridLines />
//           <LineMarkSeries data={data} />
//         </XYPlot>;
//       </div>
//     )
//   }
// }
// // const data = new Array(19).fill(0).reduce((prev, curr) => [...prev, {
// //   x: prev.slice(-1)[0].x + 1,
// //   y: prev.slice(-1)[0].y * (0.9 + Math.random() * 0.2)
// // }], [{x: 0, y: 10}]);

// // const chart = <Chart data={data}/>;
// // ReactDOM.render(chart, document.querySelector('#root'));

// Line Graph

// import React, { Component } from 'react'
// import '../../node_modules/react-vis/dist/style.css';
// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   VerticalGridLines,
//   HorizontalGridLines,
//   LineSeries,
//   } from 'react-vis';

// export default class LineGraph extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }

//   render () {
//     const data = [
//       {x: 0, y: 8},
//       {x: 1, y: 5},
//       {x: 2, y: 4},
//       {x: 3, y: 9},
//       {x: 4, y: 1},
//       {x: 5, y: 7},
//       {x: 6, y: 6},
//       {x: 7, y: 3},
//       {x: 8, y: 2},
//       {x: 9, y: 0}
//     ];
//     return (
//       <div>
//         <XYPlot height={300} width= {300}>
//           <VerticalGridLines />
//           <HorizontalGridLines />
//           <XAxis />
//           <YAxis />
//           <LineSeries data={data} />
//         </XYPlot>
//       </div>
//     )
//   }
// }
