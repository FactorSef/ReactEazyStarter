import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
// import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import { Test } from '../app/components/Test';

export default {
	component: Test,
	title: 'Test Stories/CFSContent',
	decorators: [withKnobs],
};

export const TestComponent = () => {
	return <Test text={text('text', 'Hello world')} onClick={action('Test void event')} />;
};

TestComponent.stoty = {
	parameters: {
		notes: { disabled: true },
	},
};
