import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Radar, Polar, Doughnut, Pie, Bar } from 'react-chartjs-2';
import { getAllEmotionsThunk } from '../store/emotions';
import { Container, Divider } from 'semantic-ui-react';
import { datafyRadar, datafyBar } from '../utils/chartJsHelper';

class UserEmotionsRadar extends Component {
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
	}

	render() {
		return (
			<Container>
				<Divider horizontal section>
					Emotional Sentiment Averages
				</Divider>
				<Doughnut
					responsive
					responsiveAnimationDuration={5}
					maintainAspectRatio
					duration={9000}
					easing="easeInOutBounce"
					data={datafyRadar(this.props.Emotions)}
				/>
				<Divider>This is the peak of each emotion</Divider>
				<Bar
					responsive
					responsiveAnimationDuration={5}
					maintainAspectRatio
					duration={9000}
					easing="easeInOutBounce"
					data={datafyBar(this.props.Emotions)}
				/>
			</Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEmotionsRadar);
