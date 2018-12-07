import React from 'react';
import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text, array, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { countries } from './utils/constants';
import PowerSelect from 'src/PowerSelect';
import Centered from './utils/Centered';

const powerSelect = storiesOf('Power Select', module);
powerSelect.addDecorator(withKnobs);
powerSelect.addDecorator(Centered);

const PowerSelectWithHooks = props => {
  const [selected, setCountry] = useState(countries[8]);
  return (
    <PowerSelect
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
      searchEnabled={boolean('searchEnabled', true)}
      searchPlaceholder={text('searchPlaceholder', 'Search...')}
      searchIndices={array('searchIndices', ['name', 'code'])}
      {...props}
    />
  );
};

powerSelect.add('with general configs', () => <PowerSelectWithHooks />);

powerSelect.add('customOptionComponent', () => (
  <PowerSelectWithHooks
    optionComponent={({ option }) => {
      return (
        <div>
          <img className="flag" src={option.flag} />
          <span>{option.name}&nbsp;</span>
          <small className="code">{option.code}</small>
        </div>
      );
    }}
  />
));

powerSelect.add('selectedOptionComponent', () => (
  <PowerSelectWithHooks
    selectedOptionComponent={({ option }) => {
      return (
        <div>
          <img className="flag" src={option.flag} />
          <span>{option.name}&nbsp;</span>
          <small>({option.code})</small>
        </div>
      );
    }}
  />
));

powerSelect.add('beforeOptionsComponent', () => (
  <PowerSelectWithHooks
    beforeOptionsComponent={() => <div className="options-header">Before Option Component</div>}
  />
));

powerSelect.add('afterOptionsComponent', () => (
  <PowerSelectWithHooks
    afterOptionsComponent={({ select }) => (
      <a
        className="quick-create"
        onClick={() => {
          alert('Lalalala');
          select.actions.close();
        }}
      >
        + Add New
      </a>
    )}
  />
));
