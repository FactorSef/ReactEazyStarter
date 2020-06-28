import * as React from 'react';
import { TestProps } from './types';
import './styles.less';

const Test = (props: TestProps): JSX.Element => {
	const { text, onClick: handlePropsClick } = props;
	const [counter, setCount] = React.useState(0);

	const handleClick = (): void => {
		setCount(counter + 1);
	};

	return (
		<div className="test">
			<div className="test-text">
				<span>{text}</span>
			</div>
			<div className="test-controls">
				<button onClick={handleClick} type="button">
					Click counter: {counter}
				</button>
				<button onClick={handlePropsClick} type="button">
					Custom Click
				</button>
			</div>
		</div>
	);
};

export { Test, TestProps };
export default Test;
