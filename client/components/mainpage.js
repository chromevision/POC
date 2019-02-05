import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
	return (
		<div className="sub-nav centered enlarged-font wrap-container">
			<div className="container main-container">
				<h1>Welcome to the ChromeVision Web-App!</h1>
				<p>
					<strong>ChromeVision</strong> is a computer vision application that
					uses your built-in webcam to monitor and perform sentiment analysis on
					your facial expressions as you browse the web. This data is aggregated
					and visualized through easily-readable graphs that allow you to better
					understanding your personal browsing habits.
				</p>
				<p>
					If you are a new user, you must first{' '}
					<Link to="/signup">
						create a <strong>ChromeVision</strong> account
					</Link>{' '}
					and install and log in with our companion Chrome extension.
				</p>
				<p>
					If you have an existing <strong>ChromeVision</strong> account, please{' '}
					<Link to="/login">sign in</Link> to view your data.
				</p>
				<p>
					We at <strong>ChromeVision</strong> claim no ownership of your
					personal emotional data, and keep no record of any image or video data
					that is collected from your webcam.
				</p>
			</div>
		</div>
	);
};

export default MainPage;
