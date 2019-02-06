import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAllEmotionsThunk } from '../store/emotions';

class Dataview extends Component {

  render() {
    console.log(this.props.Emotions);
    console.log(this.props.User);
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>URL</Table.HeaderCell>
            <Table.HeaderCell>Anger Score</Table.HeaderCell>
            <Table.HeaderCell>Contempt Score</Table.HeaderCell>
            <Table.HeaderCell>Disgust Score</Table.HeaderCell>
            <Table.HeaderCell>Fear Score</Table.HeaderCell>
            <Table.HeaderCell>Happiness Score</Table.HeaderCell>
            <Table.HeaderCell>Neutral Score</Table.HeaderCell>
            <Table.HeaderCell>Sadness Score</Table.HeaderCell>
            <Table.HeaderCell>Suprise Score</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {/* {this.props.Emotions.map(emotion => <Table.Cell key={emotion.id}>{emotion.url}</Table.Cell>)} */}
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    User: state.user.id,
    Emotions: state.emotions
  };
};

const mapDispatchToProps = dispatch => {
	return {
		getAllEmotions: id => dispatch(getAllEmotionsThunk(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dataview);
