import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getAllEmotionsThunk } from '../store/emotions';
import { setAllEmotionsOfDomain } from '../store/currentDomainEmotions';
import UserEmotionsRadar from './UserEmotionsRadar';
import UserEmotionsBarPeak from './UserEmotionsBarPeak';
import UserEmotionsLine from './UserEmotionsLine';
import UserEmotionsLineSearch from './UserEmotionsLineSearch';

import { urlFinder } from '../utils/baseUrlHelper';

import { Header, Container, Statistic, Segment } from 'semantic-ui-react';

class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
	}

	handleChange(e) {
		this.setState({ search: e.target.value });
	}
	handleSubmit() {
		const arr = urlFinder(this.props.Emotions, this.state.search);
		this.props.setAllEmotionsOfDomain(arr);
	}
	render() {
		return (
			<Container>
				<Container>
					<Header as="h1">Your Snapshot</Header>
					<Header floated="right" as="h4">
						<Statistic floated="right">
							<Statistic.Label>Snapshots</Statistic.Label>
							<Statistic.Value>{this.props.Emotions.length}</Statistic.Value>
						</Statistic>
					</Header>
				</Container>
				<Segment raised>
					<UserEmotionsRadar />
				</Segment>
				<Segment raised>
					<UserEmotionsBarPeak />
				</Segment>
				<Segment raised>
					<UserEmotionsLine />
				</Segment>
				<Segment raised>
					<UserEmotionsLineSearch />
				</Segment>
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getAllEmotions: id => dispatch(getAllEmotionsThunk(id)),
		setAllEmotionsOfDomain: emotions =>
			dispatch(setAllEmotionsOfDomain(emotions))
	};
};

const mapStateToProps = state => {
	return {
		User: state.user.id,
		Email: state.user.email,
		Emotions: state.emotions
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
