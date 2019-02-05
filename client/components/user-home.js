import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { Radar, Line } from 'react-chartjs-2';
import { datafyRadar, datafyLine } from '../utils/chartJsHelper';
import { getAllEmotionsThunk } from '../store/emotions';

class UserHome extends Component {
  componentDidMount() {
    this.props.getAllEmotions(this.props.User);
  }

  render() {
    // let emo = [];
    // let forLine = [];
    // // console.log('asdfasdf', this.props.Emotions);
    // // if (this.props.Emotions.length !== 0) {
    // //   // emo = datafyArr(this.props.Emotions);
    // //   forLine = datafyLine(this.props.Emotions, 'happiness');
    // //   // console.log(emo);
    // //   console.log(forLine);
    // // }

    return (
      <div className="sub-nav container">
        <h1> Number of Pictures Captured </h1>
        <p>{this.props.Emotions.length}</p>
        <h1> Your Web Snapshot: </h1>
        <Radar data={datafyRadar(this.props.Emotions)} />
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

const mapDispatchToProps = dispatch => {
  return {
    getAllEmotions: id => dispatch(getAllEmotionsThunk(id)),
  };
};

const mapStateToProps = state => {
  return {
    User: state.user.id,
    Emotions: state.emotions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
