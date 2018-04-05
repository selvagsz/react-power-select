import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import 'src/styles';
import 'docs/app/index.scss';
import { withKnobs } from '@storybook/addon-knobs/react';

import ArrayOfObjectsDemo from 'docs/app/Demos/PowerSelect/ArrayOfObjectsDemo';
import CustomOptionDemo from 'docs/app/Demos/PowerSelect/CustomOptionDemo';
import CustomSelectedOptionDemo from 'docs/app/Demos/PowerSelect/CustomSelectedOptionDemo';
import BeforeOptionsDemo from 'docs/app/Demos/PowerSelect/BeforeOptionsDemo';
import AfterOptionsDemo from 'docs/app/Demos/PowerSelect/AfterOptionsDemo';
import TriggerLHSDemo from 'docs/app/Demos/PowerSelect/TriggerLHSDemo';
import TriggerRHSDemo from 'docs/app/Demos/PowerSelect/TriggerRHSDemo';

const Centered = story => (
  <section
    style={{
      display: 'flex',
      height: '80vh',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: '350px' }}>{story()}</div>
  </section>
);

const stories = storiesOf('PowerSelect', module);
stories.addDecorator(withKnobs);
stories.addDecorator(Centered);

stories.add('with general configs', () => <ArrayOfObjectsDemo />);
stories.add('customOptionComponent', () => <CustomOptionDemo />);
stories.add('selectedOptionComponent', () => <CustomSelectedOptionDemo />);
stories.add('beforeOptionsComponent', () => <BeforeOptionsDemo />);
stories.add('afterOptionsComponent', () => <AfterOptionsDemo />);
stories.add('triggerLHSComponent', () => <TriggerLHSDemo />);
stories.add('triggerRHSComponent', () => <TriggerRHSDemo />);
