import React from 'react';
import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text, array, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { countries } from './utils/constants';
import PowerSelectMultiple from 'src/PowerSelectMultiple';
import Centered from './utils/Centered';

const PowerSelectMultipleWithHooks = props => {
  const [selected, setSelectedCountries] = useState([countries[8], countries[4]]);
  return (
    <PowerSelectMultiple
      options={object('options', countries)}
      selected={selected}
      onChange={args => {
        action('onChange')(args);
        setSelectedCountries(args.options);
      }}
      optionLabelPath={text('optionLabelPath', 'name')}
      placeholder={text('placeholder', 'Select your favorite countries')}
      disabled={boolean('disabled', false)}
      showClear={boolean('showClear', true)}
      searchIndices={array('searchIndices', ['name', 'code'])}
      optionComponent={({ option }) => (
        <div>
          <img className="flag" src={option.flag} />
          {option.name} ({option.code})
        </div>
      )}
      selectedOptionComponent={({ option, select }) => (
        <span>
          <img className="flag" src={option.flag} />
          {option.name}
        </span>
      )}
    />
  );
};

const stories = storiesOf('Power Select Multiple', module);
stories.addDecorator(withKnobs);
stories.addDecorator(Centered);

stories.add('with configs & custom option/selected component', () => (
  <PowerSelectMultipleWithHooks />
));
