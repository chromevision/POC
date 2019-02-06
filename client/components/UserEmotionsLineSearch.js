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
					// action={this.handleSubmit}
					onChange={this.handleChange}
					placeholder="Domain"
					icon="world"
					iconPosition="left"
					size="mini"
				/>
				{/* <Button onClick={this.handleSubmit} animated="vertical">
					<Button.Content hidden>View</Button.Content>
					<Button.Content visible />
				</Button> */}

				<Divider hidden />
				<Menu fluid widths={7} tabular attached="top" stackable>
					<Menu.Item
						name="happiness"
						active={activeItem === 'happiness'}
						onClick={this.handleItemClick}
						color="green"
					/>
					<Menu.Item
						name="disgust"
						active={activeItem === 'disgust'}
						onClick={this.handleItemClick}
						color="orange"
					/>
					<Menu.Item
						name="fear"
						active={activeItem === 'fear'}
						onClick={this.handleItemClick}
						color="purple"
					/>
					<Menu.Item
						name="surprise"
						active={activeItem === 'surprise'}
						onClick={this.handleItemClick}
						color="yellow"
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

				<Segment>
					{activeItem === 'happiness' ? (
						<Line
							easing="easeInOutBounce"
							data={datafyLine(toShow, 'Happiness')}
						/>
					) : null}
					{activeItem === 'sadness' ? (
						<Line data={datafyLine(toShow, 'Sadness')} />
					) : null}
					{activeItem === 'surprise' ? (
						<Line data={datafyLine(toShow, 'Surprise')} />
					) : null}
					{activeItem === 'anger' ? (
						<Line data={datafyLine(toShow, 'Anger')} />
					) : null}
					{activeItem === 'contempt' ? (
						<Line data={datafyLine(toShow, 'Contempt')} />
					) : null}
					{activeItem === 'disgust' ? (
						<Line data={datafyLine(toShow, 'Disgust')} />
					) : null}
					{activeItem === 'fear' ? (
						<Line data={datafyLine(toShow, 'Fear')} />
					) : null}
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
		Emotions: state.emotions,
		currentDomainEmotions: state.currentDomainEmotions
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeLineSearch);
