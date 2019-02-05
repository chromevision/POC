import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { datafyLine } from '../utils/chartJsHelper';
import { getAllEmotionsThunk } from '../store/emotions';
import { Menu, Segment, Header, Text, Dropdown } from 'semantic-ui-react';

class UserHomeLine extends Component {
	state = {
    activeItem: 'happiness',
	};
	componentDidMount() {
		this.props.getAllEmotions(this.props.User);
	}
	handleItemClick = (evt, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;
    let toShow;
    if(this.props.forCurr === true){
      toShow = this.props.currentDomainEmotions;
    } else{
      toShow = this.props.Emotions;
    }
		return (
			<div className="sub-nav container">
				<Menu pointing fluid widths={7} secondary>
					<Menu.Item
						name="happiness"
						active={activeItem === 'happiness'}
						onClick={this.handleItemClick}
						color="blue"
					/>
					<Menu.Item
						name="disgust"
						active={activeItem === 'disgust'}
						onClick={this.handleItemClick}
						color="blue"
					/>
					<Menu.Item
						name="fear"
						active={activeItem === 'fear'}
						onClick={this.handleItemClick}
						color="blue"
					/>
					<Menu.Item
						name="surprise"
						active={activeItem === 'surprise'}
						onClick={this.handleItemClick}
						color="blue"
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
				<Segment raised stacked padded="very">
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
			</div>
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
