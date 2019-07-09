import React, { useState, useEffect } from 'react';

export default function App() {
	const name = useFormInput('Tommy');
	const address = useFormInput('Da Nang');
	const width = useEffectWidthWindow();

	useEffectDocumentTitle(name.value + ' ' + address.value);

	return (
		<div>
			<div style={{ marginBottom: '10px' }}>
				<input {...name} />
			</div>
			<div style={{ marginBottom: '10px' }}>
				<input {...address} />
			</div>
			Width: {width}
		</div>
	);
}

function useFormInput(initalValue) {
	const [value, setValue] = useState(initalValue);

	function handleChange(e) {
		setValue(e.target.value);
	}

	return {
		value,
		onChange: handleChange
	}
}

function useEffectDocumentTitle(title) {
	useEffect(() => {
		document.title = title;
	});
}

function useEffectWidthWindow() {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleSetWidth = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleSetWidth);

		return () => {
			window.removeEventListener('resize', handleSetWidth);
		}
	})

	return width;
}