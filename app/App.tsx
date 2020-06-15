import React from 'react';
import style from './styles.module.less';
import './app.style.less';

const App = (): React.ReactElement => {
	// eslint-disable-next-line no-console
	console.log(style.redHeader);
	return (
		<h1 className="kek">ReactEazyStarter</h1>
	);
};

export default App;
