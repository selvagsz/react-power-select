import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import 'src/styles';
import 'docs/app/index.scss';
import { withKnobs } from '@storybook/addon-knobs/react';

import PowerSelectPlainArrayDemo from 'docs/app/Demos/PowerSelect/PlainArrayDemo';

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

stories.add('with general configs', () => <PowerSelectPlainArrayDemo />);
