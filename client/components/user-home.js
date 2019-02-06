import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getAllEmotionsThunk } from '../store/emotions';
import { setAllEmotionsOfDomain } from '../store/currentDomainEmotions';
import UserEmotionsLine from './UserEmotionsLine';
import UserEmotionsRadar from './UserEmotionsRadar';
import UserHomeLineSearch from './UserEmotionsLineSearch';
import { urlFinder } from '../utils/baseUrlHelper';

import {
	Header,
	Container,
	Divider,
	Statistic,
	Input,
	Button,
	Icon,
	Segment
} from 'semantic-ui-react';
import UserEmotionsBarPeak from './UserEmotionsBarPeak';
import UserEmotionsLineSearch from './UserEmotionsLineSearch';

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
				{/* <Divider horizontal section>
						<Header as="h2">Search a Site To View Your Sitewide Trends!</Header>
						{/* <Header as="h6">To View Trends!</Header> */}
				{/* </Divider> */} */}
				<div>
					<Input onChange={this.handleChange} placeholder="Domain" />
					<Button onClick={this.handleSubmit} animated="vertical">
						<Button.Content hidden>View</Button.Content>
						<Button.Content visible>
							<Icon name="world" />
						</Button.Content>
					</Button>
				</div>
				<UserHomeLineSearch forCurr={true} />
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
		Emotions: state.emotions
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
