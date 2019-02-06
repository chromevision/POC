import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getAllEmotionsThunk } from '../store/emotions';
import UserEmotionsLine from './UserEmotionsLine';
import UserEmotionsRadar from './UserEmotionsRadar';
import {
	Header,
	Container,
	Divider,
	Statistic,
	Rail,
	Label,
	Segment
} from 'semantic-ui-react';

class UserHome extends Component {
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
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

				<Divider horizontal />

				<Segment>
					<UserEmotionsRadar />
				</Segment>
				<Divider horizontal section>
					<Header as="h3">Trends by individual emotions</Header>
				</Divider>
				<Segment raised>
					<UserEmotionsLine />
				</Segment>
				<Divider horizontal section>
					<Header as="h3">Creat Your Own Treand</Header>
					<Header as="h6">Placeholder</Header>
				</Divider>
				<UserEmotionsLine searchable={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
