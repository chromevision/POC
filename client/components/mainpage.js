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
					and displayed through easily-readable visualizations that allow you to better
					understand your personal browsing habits.
				</p>
				<br />
				<h2>New Users</h2>
				<p>
					You must first{' '}
					<Link to="/signup">
						create a <strong>ChromeVision</strong> account
					</Link>{' '}
					and install and log in with our companion Chrome extension.
				</p>

				<br />
				<h2>Existing Users</h2>
				<p>
					Please{' '}
					<Link to="/login">
						sign in{' '}
					</Link>
					to your existing account to view your data.
				</p>

				<br />
				<h2>Our Commitment to You</h2>
				<p>
					At <strong>ChromeVision</strong>, we value the importance of maintaining
					your privacy and safety when using our application. To this end, we keep
					no record of any image or video data that is collected from your webcam.
					We also claim no ownership of your personal emotional data.
				</p>

				<br />
			</div>
		</div>
	);
};

export default MainPage;
