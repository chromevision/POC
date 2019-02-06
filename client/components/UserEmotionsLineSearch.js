import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { datafyLine } from '../utils/chartJsHelper';
import { getAllEmotionsThunk } from '../store/emotions';
import { setAllEmotionsOfDomain } from '../store/currentDomainEmotions';
import {
	Menu,
	Segment,
	Container,
	Divider,
	Header,
	Input,
	Button,
	Icon
} from 'semantic-ui-react';
import { urlFinder } from '../utils/baseUrlHelper';
import UserEmotionsLine from './UserEmotionsLine';

class UserHomeLineSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'happiness',
			search: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
	}
	handleItemClick = (evt, { name }) => this.setState({ activeItem: name });

	handleChange(e) {
		console.log(e);
		this.setState({ search: e.target.value });
	}
	handleSubmit() {
		const arr = urlFinder(this.props.Emotions, this.state.search);
		this.props.setAllEmotionsOfDomain(arr);
	}

	render() {
		const { activeItem } = this.state;
		let toShow = this.props.Emotions;
		if (this.props.forCurr === true) {
			toShow = this.props.currentDomainEmotions;
		}
		return (
			<Container>
				<Divider horizontal section>
					<Header>Search a Site To View Your Sitewide Trends!</Header>
				</Divider>

				<Input
					placeholder="Domain"
					icon="world"
					iconPosition="left"
					size="mini"
					onChange={this.handleChange}
					action={{
						icon: 'search',
						onClick: () => this.handleSubmit()
					}}
				/>
				{/* <Button onClick={this.handleSubmit} animated="vertical">
					<Button.Content hidden>View</Button.Content>
					<Button.Content visible />
				</Button> */}

				<Divider hidden />
				<UserEmotionsLine searching={true} forCurr={true} />
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
		Emotions: state.emotions,
		currentDomainEmotions: state.currentDomainEmotions
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeLineSearch);
