import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Radar, Polar } from 'react-chartjs-2';
import { getAllEmotionsThunk } from '../store/emotions';
import { Container, Divider } from 'semantic-ui-react';
import { datafyRadar } from '../utils/chartJsHelper';

class UserEmotionsRadar extends Component {
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
	}

	render() {
		return (
			<Container>
				<Divider horizontal section>
					Radar Chart
				</Divider>
				<Radar
					data={datafyRadar(this.props.Emotions)}
					responsive
					responsiveAnimationDuration={5}
					maintainAspectRatio
					duration={3000}
					easing="easeInOutBounce"
				/>
				<Divider horizontal section>
					Polar Chart
				</Divider>
				<Polar
					responsive
					responsiveAnimationDuration={5}
					maintainAspectRatio
					duration={9000}
					easing="easeInOutBounce"
					data={datafyRadar(this.props.Emotions)}
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
