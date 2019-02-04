import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { Radar, Line } from 'react-chartjs-2';
import { datafyArr, datafyLine } from '../utils/chartJsHelper';
import { getAllEmotionsThunk } from '../store/emotions';
import { Menu, Container, Segment, Header } from 'semantic-ui-react';

class UserHomeLine extends Component {
	state = {
		activeItem: 'happiness'
	};
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
	}
	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		let emo = [];
		let forLine = [];
		console.log('asdfasdf', this.props.Emotions);
		if (this.props.Emotions.length !== 0) {
			// emo = datafyArr(this.props.Emotions);
			forLine = datafyLine(this.props.Emotions, 'happiness');
			// console.log(emo);
			console.log(forLine);
		}
		// const dataRadar = {
		// 	labels: [
		// 		'anger',
		// 		'contempt',
		// 		'disgust',
		// 		'fear',
		// 		'happiness',
		// 		'neutral',
		// 		'sadness',
		// 		'surprise'
		// 	],
		// 	datasets: [
		// 		{
		// 			label: 'Snapshot:',
		// 			backgroundColor: 'rgba(255,99,132,0.2)',
		// 			borderColor: 'rgba(255,99,132,1)',
		// 			pointBackgroundColor: 'rgba(255,99,132,1)',
		// 			pointBorderColor: '#fff',
		// 			pointHoverBackgroundColor: '#fff',
		// 			pointHoverBorderColor: 'rgba(255,99,132,1)',
		// 			data: [20, 22, 29, 8, 70, 30, 33, 60]
		// 		}
		// 	]
		// };
		const { activeItem } = this.state;

		return (
			<div className="sub-nav container">
				{/* <Container> */}
				<Header as="h1">Emotions</Header>
				<Menu>
					<Menu.Item
						name="happiness"
						active={activeItem === 'happiness'}
						onClick={this.handleItemClick}
						color="blue"
					/>
					<Menu.Item
						name="sadness"
						active={activeItem === 'sadness'}
						onClick={this.handleItemClick}
						color="teal"
					/>
					<Menu.Item
						name="anger"
						active={activeItem === 'anger'}
						onClick={this.handleItemClick}
						color="red"
					/>
					<Menu.Item
						name="contempt"
						active={activeItem === 'contempt'}
						onClick={this.handleItemClick}
						color="olive"
					/>
				</Menu>
				<Segment raised stacked padded="very">
					{activeItem === 'happiness' ? (
						<Line data={datafyLine(this.props.Emotions, 'Happiness')} />
					) : null}
					{activeItem === 'sadness' ? (
						<Line data={datafyLine(this.props.Emotions, 'Sadness')} />
					) : null}
					{activeItem === 'anger' ? (
						<Line data={datafyLine(this.props.Emotions, 'Anger')} />
					) : null}
					{activeItem === 'contempt' ? (
						<Line data={datafyLine(this.props.Emotions, 'Contempt')} />
					) : null}
				</Segment>
				{/* </Container> */}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getAllEmotions: id => dispatch(getAllEmotionsThunk(id))
	};
};

const mapStateToProps = state => {
	return {
		User: state.user.id,
		Emotions: state.emotions
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeLine);
