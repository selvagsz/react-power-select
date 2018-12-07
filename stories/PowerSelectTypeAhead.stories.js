import React from 'react';
import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text, array, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { TypeAhead } from 'src';
import Centered from './utils/Centered';
import { countries } from './utils/constants';

const TypeAheadWithHooks = () => {
  const [selected, setCountry] = useState(countries[8]);
  return (
    <TypeAhead
      options={object('options', countries)}
      selected={selected}
      onChange={args => {
        action('onChange')(args);
        setCountry(args.option);
      }}
      optionLabelPath={text('optionLabelPath', 'name')}
      placeholder={text('placeholder', 'Select your favorite country')}
      disabled={boolean('disabled', false)}
      showClear={boolean('showClear', true)}
      searchPlaceholder={text('searchPlaceholder', 'Search...')}
      searchIndices={array('searchIndices', ['name', 'code'])}
      optionComponent={({ option }) => (
        <div>
          <img className="flag" src={option.flag} />
          {option.name} ({option.code})
        </div>
      )}
    />
  );
};

const stories = storiesOf('Power Select TypeAhead', module);
stories.addDecorator(withKnobs);
stories.addDecorator(Centered);

stories.add('with configs & custom option component', () => <TypeAheadWithHooks />);
