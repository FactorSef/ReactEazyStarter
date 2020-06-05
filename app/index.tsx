import React from 'react';
import ReactDOM from 'react-dom';

// Импорт расширений для объектов
import './extensions';

import App from './App';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

// if ((module as any).hot) {
// 	(module as any).hot.accept('./App.tsx', () => {
// 		const NextApp = require('./App.tsx').default;
// 		render(NextApp);
// 	});
// }
