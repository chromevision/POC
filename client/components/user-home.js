import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { Radar, Line } from 'react-chartjs-2';
import {datafyArr, datafyLine} from '../utils/chartJsHelper';
import {getAllEmotionsThunk} from '../store/emotions';




class Graph extends Component {

  componentDidMount() {
    this.props.getAllEmotions(this.props.User);
	}

	render() {
    let emo = [];
    let forLine = [];
    console.log('asdfasdf', this.props.Emotions);
    if (this.props.Emotions.length !== 0){
      // emo = datafyArr(this.props.Emotions);
      forLine = datafyLine(this.props.Emotions, 'happiness');
      // console.log(emo);
      console.log(forLine);
    }
    const dataRadar = {
      labels: ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise'],
      datasets: [
        {
          label: 'Snapshot:',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [20, 22, 29, 8, 70, 30, 33, 60]
        }
      ]
    };

		return (
			<div>
				<h1> Your Web Snapshot: </h1>
				<Radar data={dataRadar} />
				<h1> Happiness trends while on the Web: </h1>
				<Line data={datafyLine(this.props.Emotions, 'happiness')} />
        <h1> Sadness trends while on the Web: </h1>
        <Line data={datafyLine(this.props.Emotions, 'sadness')} />
        <h1> Anger trends while on the Web: </h1>
        <Line data={datafyLine(this.props.Emotions, 'anger')} />
        <h1> Contempt trends while on the Web: </h1>
        <Line data={datafyLine(this.props.Emotions, 'contempt')} />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEmotions: id => dispatch(getAllEmotionsThunk(id))
  };
};

const mapStateToProps = (state) => {
  return{
    User: state.user.id,
    Emotions: state.emotions
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Graph);
