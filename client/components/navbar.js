import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu } from 'semantic-ui-react';

class Navbar extends Component {
  state = { activeItem: 'home' };

<<<<<<< HEAD
  handleItemClick = (evt, { name }) => this.setState({ activeItem: name });

  handleLogOut() {
    this.props.logout();
  }

  render() {
    const { activeItem } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Menu pointing attached size="massive">
          <Menu.Item
            header
            as={Link}
            to="/"
            name="ChromeVision"
            icon="eye"
            color="pink"
            onClick={this.handleItemClick}
          />

          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/home"
            name="charts"
            active={activeItem === 'charts'}
            onClick={this.handleItemClick}
          />

          <Menu.Menu position="right">
            {!isLoggedIn ? (
              <Menu pointing attached size="massive">
                <Menu.Item
                  as={Link}
                  to="/login"
                  name="Login"
                  active={activeItem === 'Login'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={Link}
                  to="/signup"
                  name="Sign Up"
                  active={activeItem === 'Sign Up'}
                  onClick={this.handleItemClick}
                />
              </Menu>
            ) : (
              <Menu.Item
                as={Link}
                to="/"
                name="Logout"
                onClick={this.handleLogOut.bind(this)}
              />
            )}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
=======
	handleItemClick = (evt, { name }) => {
		if (name === 'ChromeVision') {
			name = 'home';
		}
		this.setState({ activeItem: name });
	};
	handleLogOut() {
		this.props.logout();
	}

	render() {
		const { activeItem } = this.state;
		const { isLoggedIn } = this.props;
		return (
			<div>
				<Menu pointing size="massive">
					<Menu.Item
						header
						as={Link}
						to="/home"
						name="ChromeVision"
						icon="eye"
						onClick={this.handleItemClick}
					/>

					<Menu.Item
						as={Link}
						to="/home"
						name="home"
						active={activeItem === 'home'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						as={Link}
						to="/charts"
						name="charts"
						active={activeItem === 'charts'}
						onClick={this.handleItemClick}
					/>

					<Menu.Menu position="right">
						{!isLoggedIn ? (
							<Menu.Menu position="right">
								<Menu.Item
									as={Link}
									to="/login"
									name="Login"
									active={activeItem === 'Login'}
									onClick={this.handleItemClick}
								/>
								<Menu.Item
									as={Link}
									to="/signup"
									name="Sign Up"
									active={activeItem === 'Sign Up'}
									onClick={this.handleItemClick}
								/>
							</Menu.Menu>
						) : (
							<Menu.Item
								as={Link}
								to="/home"
								name="Logout"
								onClick={this.handleLogOut.bind(this)}
							/>
						)}
					</Menu.Menu>
				</Menu>
			</div>
		);
	}
>>>>>>> d7dfa46807a5979bc2263d9f1ba2cff1c8aa8bf7
}

const mapStateToProp = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapStateToDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProp, mapStateToDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
