import React, { useReducer, useState } from 'react';
import './App.css';

function init(initialCount) {
	return { count: initialCount };
}

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1 };
		case 'decrement':
			return { count: state.count - 1 };
		case 'reset':
			return init(1);
		default:
			throw new Error();
	}
}

function App({ initialCount }) {
	const [state, dispatch] = useReducer(reducer, 1, init);
	const [name, setName] = useState('');
	const [errorName, setErrorName] = useState(false);

	const handleChangeName = (value) => {
		setName(value);
		setErrorName(false);
	}

	const handleSubmit = () => {
		if (name.length === 0) {
			setErrorName(true);
			return;
		}

		console.log(name);
	}

	return (
		<>
			Count: {state.count}
			<button
				onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
				Reset
			</button>
			<button onClick={() => dispatch({ type: 'decrement' })}>-</button>
			<button onClick={() => dispatch({ type: 'increment' })}>+</button>

			<div className={errorName ? 'has-error' : ''}>
				<input type="text" value={name} onChange={(e) => handleChangeName(e.target.value)} />
			</div>
			<button
				onClick={handleSubmit}
			>Submit</button>
		</>
	);
}


export default App;
