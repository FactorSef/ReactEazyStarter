import React from 'react';
import './app.style.less';
import ReStarter from './icons/ReStarter.svg';

const App = (): React.ReactElement => {
	return (
		<div className="preview">
			<ReStarter fill="#000" width="200px" />
		</div>
	);
};

export default App;
