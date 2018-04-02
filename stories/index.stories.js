import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from '@storybook/react/demo';

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
stories.addDecorator(Centered);

stories.add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>);
