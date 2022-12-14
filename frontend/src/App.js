import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MyNavbar from './base/Navbar';
import Home from './home/Home';
import NewPoll from './Polling/NewPoll';
import JoinPoll from './Polling/JoinPoll';
import VotePoll from './Polling/VotePoll';

function App() {
	return (
		<div className="App">
			<Router>
				<MyNavbar/>
				<main className='flex h-100'>
					<Switch>
						<Route path="/" exact component={() => <Home />} />
						<Route path="/new-poll" exact component={() => <NewPoll />} />
						<Route path="/join-poll" exact component={() => <JoinPoll />} />
						<Route path="/vote/:id" exact component={() => <VotePoll />} />
					</Switch>
				</main>

				{/* <Footer/> */}

			</Router>
		</div>
	);
}

export default App;
