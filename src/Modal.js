import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './App.css';

function App(props) {
	const [name, setName] = useState(props.name);
	const [errorName, setErrorName] = useState(false);
	const [address, setAddress] = useState(props.address);
	const [errorAddress, setErrorAddress] = useState(false);
	const [dataUser, setDataUser] = useState([]);

	useEffect(() => {
		fetchDataUser();
	}, []);

	useEffect(() => {
		if (props.isModal) {
			setName(props.name);
		}
	}, [props]);

	const handleChangeName = (value) => {
		setName(value);
		setErrorName(false);
	}

	const handleChangeAddress = (value) => {
		setAddress(value);
		setErrorAddress(false);
	}

	const handleSubmit = () => {
		let isValid = true;

		if (name.length === 0) {
			setErrorName(true);
			isValid = false;
		}

		if (address.length === 0) {
			setErrorAddress(true);
			isValid = false;
		}

		if (isValid) {
			props.handleChange({ name });
			props.handleChange({ address });
		}
	}

	const fetchDataUser = async () => {
		await fetch('https://reqres.in/api/users')
			.then(response => response.json())
			.then(data => {
				setDataUser(data.data);
			});
	}

	const renderListData = () => {
		let html = [];

		dataUser.map((item, index) => {
			return html.push(
				<tr key={index}>
					<td>{item.id}</td>
					<td>{item.first_name}</td>
					<td>{item.email}</td>
				</tr>
			);
		});

		return html;
	}

	const handleCloseModal = () => {
		props.handleChange({ isModal: false });
	}

	return (
		<Modal show={props.isModal} onHide={handleCloseModal} className="trade-page">
			<Modal.Header closeButton>
				<Modal.Title>Modal</Modal.Title>
			</Modal.Header>
			<div className="modal-body">
				<table className="table">
					<thead>
						<tr>
							<th>NO</th>
							<th>First Name</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{renderListData()}
					</tbody>
				</table>
				<div className={'form-group ' + (errorName ? 'has-error' : '')}>
					<input
						type="text"
						value={name}
						onChange={(e) => handleChangeName(e.target.value)}
						className="form-control"
					/>
				</div>
				<div className={'form-group ' + (errorAddress ? 'has-error' : '')}>
					<input
						type="text"
						value={address}
						onChange={(e) => handleChangeAddress(e.target.value)}
						className="form-control"
					/>
				</div>
				<button
					onClick={handleSubmit}
				>Submit</button>
			</div>
		</Modal>
	);
}

export default App;