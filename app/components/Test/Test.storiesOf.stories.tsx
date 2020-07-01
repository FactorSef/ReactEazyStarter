import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import { Test } from './index';

const stories = storiesOf('Test Stories/storiesOf', module);

stories.addDecorator(withInfo);
stories.addDecorator(withKnobs);
stories.addParameters({ info: { inline: true } });

stories.add('Test', () => <Test text={text('text', 'Hello, World!')} onClick={action('Test void event')} />);
