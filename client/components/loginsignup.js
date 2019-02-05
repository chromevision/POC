import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment
} from 'semantic-ui-react';

class AuthForm extends Component {
	render() {
		const { name, displayName, handleSubmit, error } = props;
		return (
			<div className="login-form">
				<style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
				<Grid
					textAlign="center"
					style={{ height: '100%' }}
					verticalAlign="middle">
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as="h2" color="teal" textAlign="center">
							<Image src="/logo.png" /> Log-in to your account
						</Header>
						<Form size="large">
							<Segment stacked>
								<Form.Input
									fluid
									icon="user"
									iconPosition="left"
									placeholder="E-mail address"
								/>
								<Form.Input
									fluid
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									type="password"
								/>

								<Button color="teal" fluid size="large">
									Login
								</Button>
							</Segment>
						</Form>
						<Message>
							New to us? <a href="#">Sign Up</a>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default AuthForm;

const mapLogin = state => {
	return {
		name: 'login',
		displayName: 'Login',
		error: state.user.error
	};
};

const mapSignup = state => {
	return {
		name: 'signup',
		displayName: 'Sign Up',
		error: state.user.error
	};
};

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const email = evt.target.email.value;
			const password = evt.target.password.value;
			dispatch(auth(email, password, formName));
		}
	};
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.object
};
