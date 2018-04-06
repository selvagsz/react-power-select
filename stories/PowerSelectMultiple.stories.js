import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import Centered from './utils/Centered';

import GeneralConfigDemo from 'examples/PowerSelectMultiple/GeneralConfigDemo';
import CustomOptionDemo from 'examples/PowerSelectMultiple/CustomOptionDemo';

const stories = storiesOf('Power Select Multiple', module);
stories.addDecorator(withKnobs);
stories.addDecorator(Centered);

stories.add('with general configs', () => <GeneralConfigDemo />);
stories.add('customOptionComponent', () => <CustomOptionDemo />);
