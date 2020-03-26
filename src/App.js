import React, { Component } from 'react';
import Modal from './Modal';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModal: false,
			name: 'thien ai',
			address: 'da nang'
		}
	}

	handleChange = (data) => {
		this.setState({
			...data
		});
	}

	render() {
		const { isModal, name, address } = this.state;

		return (
			<>
				<button
					onClick={() => this.handleChange({ isModal: true })}
				>Submit</button>
				<Modal
					isModal={isModal}
					name={name}
					address={address}
					handleChange={this.handleChange}
				/>
			</>
		);
	}
}

export default App;
