import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import Centered from './utils/Centered';

import GeneralConfigDemo from 'examples/PowerSelect/GeneralConfigDemo';
import CustomOptionDemo from 'examples/PowerSelect/CustomOptionDemo';
import CustomSelectedOptionDemo from 'examples/PowerSelect/CustomSelectedOptionDemo';
// import BeforeOptionsDemo from 'docs/app/Demos/PowerSelect/BeforeOptionsDemo';
import AfterOptionsDemo from 'examples/PowerSelect/AfterOptionsDemo';
// import TriggerLHSDemo from 'docs/app/Demos/PowerSelect/TriggerLHSDemo';
// import TriggerRHSDemo from 'docs/app/Demos/PowerSelect/TriggerRHSDemo';

const powerSelect = storiesOf('Power Select', module);
powerSelect.addDecorator(withKnobs);
powerSelect.addDecorator(Centered);

powerSelect.add('with general configs', () => <GeneralConfigDemo />);
powerSelect.add('customOptionComponent', () => <CustomOptionDemo />);
powerSelect.add('selectedOptionComponent', () => <CustomSelectedOptionDemo />);
// powerSelect.add('beforeOptionsComponent', () => <BeforeOptionsDemo />);
powerSelect.add('afterOptionsComponent', () => <AfterOptionsDemo />);
// powerSelect.add('triggerLHSComponent', () => <TriggerLHSDemo />);
// powerSelect.add('triggerRHSComponent', () => <TriggerRHSDemo />);
