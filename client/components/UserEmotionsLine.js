import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { datafyLine } from '../utils/chartJsHelper';
import { getAllEmotionsThunk } from '../store/emotions';
import { Menu, Segment, Container, Divider, Header } from 'semantic-ui-react';

class UserHomeLine extends Component {
	state = {
		activeItem: 'happiness'
	};
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
	}
	handleItemClick = (evt, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;
		let toShow = this.props.Emotions;
		if (this.props.forCurr === true) {
			toShow = this.props.currentDomainEmotions;
		}
		return (
			<Container>
				{this.props.searching ? null : (
					<Divider horizontal section>
						<Header>Trends by individual emotions</Header>
					</Divider>
				)}
				<Menu size="tiny" fluid widths={8} tabular attached="top" stackable>
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
						name="happiness"
						active={activeItem === 'happiness'}
						onClick={this.handleItemClick}
						color="green"
					/>
					<Menu.Item
						name="neutral"
						active={activeItem === 'neutral'}
						onClick={this.handleItemClick}
						color="green"
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
				</Menu>

				<Segment>
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
					{activeItem === 'happiness' ? (
						<Line
							easing="easeInOutBounce"
							data={datafyLine(toShow, 'Happiness')}
						/>
					) : null}
					{activeItem === 'neutral' ? (
						<Line data={datafyLine(toShow, 'Neutral')} />
					) : null}
					{activeItem === 'sadness' ? (
						<Line data={datafyLine(toShow, 'Sadness')} />
					) : null}
					{activeItem === 'surprise' ? (
						<Line data={datafyLine(toShow, 'Surprise')} />
					) : null}
				</Segment>
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
		Emotions: state.emotions,
		currentDomainEmotions: state.currentDomainEmotions
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeLine);
