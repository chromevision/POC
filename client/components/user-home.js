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
					{/* <Header floated="right" as="h4">
						Total Snapshots: {this.props.Emotions.length}
					</Header> */}
					<Header as="h2">Your Snapshot</Header>

					<Divider horizontal />
					<Statistic floated="right">
						<Statistic.Value>{this.props.Emotions.length}</Statistic.Value>
						<Statistic.Label>Snapshots</Statistic.Label>
					</Statistic>

					<UserEmotionsRadar />
					<Divider horizontal section>
						<Header as="h3">Trends by individual emotions</Header>
					</Divider>
					<UserEmotionsLine />
					<Divider horizontal section>
						<Header as="h3">Creat Your Own Treand</Header>
						<Header as="h6">Placeholder</Header>
					</Divider>
					<UserEmotionsLine searchable={true} />
				</Container>
			</Container>
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
