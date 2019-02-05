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
	Segment,
	Modal,
	Button
} from 'semantic-ui-react';

class UserHome extends Component {
	state = {
		modal: false
	};
	async componentDidMount() {
		await this.props.getAllEmotions(this.props.User);
		if (this.props.Emotions.length === 0) {
			console.log(this.state.modal);
			console.log(this.props.Emotions);
			this.setState({ modal: true });
		}
	}

	handleClose = () => {
		this.setState({ modal: false });
	};

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
					<Modal
						open={this.state.modal}
						basic
						size="large"
						closeOnDimmerClick={true}
						closeOnEscape={true}
						onClose={this.handleClose}
						centered={false}
						dimmer="blurring">
						<Modal.Header>Zero Snapshots!</Modal.Header>
						<Modal.Content>
							You have no Snapshots! Start using the ChromeVision extension to
							create your Snapshots!
						</Modal.Content>
						<Modal.Actions>
							<Button inverted color="black" onClick={this.handleClose}>
								Close
							</Button>
						</Modal.Actions>
					</Modal>

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
