import React from 'react';

import './style.scss';
import './style.less';

const App = (): React.ReactElement => {
	const [test, setTest] = React.useState('test');

	const setKek = () => {
		setTest('kek');
	};

	return (
		<>
			<h1>{String.format('{0}, {1}', 'hello', test)}</h1>

			<button onClick={setKek}>set kek</button>
		</>
	);
};

export default App;
