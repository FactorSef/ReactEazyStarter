import React from 'react';

import './style.scss';
import './style.less';

const App = (): React.ReactElement => {
	const [test, setTest] = React.useState('test');

	const handleSetKek = (): void => {
		setTest('kek');
	};

	return (
		<>
			<h1
				className="kek"
				style={{}}
			>
				{String.format('{0}, {1}', 'hello', test)}
			</h1>

			<button onClick={handleSetKek} type="button">set kek</button>
		</>
	);
};

export default App;
