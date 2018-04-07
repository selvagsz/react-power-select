import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import Centered from './utils/Centered';

import GeneralConfigDemo from 'examples/TypeAhead/GeneralConfigDemo';
import CustomOptionDemo from 'examples/TypeAhead/CustomOptionDemo';

const stories = storiesOf('Power Select TypeAhead', module);
stories.addDecorator(withKnobs);
stories.addDecorator(Centered);

stories.add('with general configs', () => <GeneralConfigDemo />);
stories.add('customOptionComponent', () => <CustomOptionDemo />);
