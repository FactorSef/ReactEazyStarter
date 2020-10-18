import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import App from './App';

configure({
	useProxies: 'ifavailable',
})

ReactDOM.render(<App />, document.getElementById('root'));
