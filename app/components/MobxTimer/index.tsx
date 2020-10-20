import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './Timer.module.scss';

import store from './store';

export default observer(() => {
	React.useLayoutEffect(() => {
		setInterval(() => {
			store.increaseTimer();
		}, 1000);
	}, []);

	return (
		<div className={styles.mobxTimer}>
			<p>MobX timer sample:</p>
			<span>{store.secondsPassed}</span>
		</div>
	);
});
