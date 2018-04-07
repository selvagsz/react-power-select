import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import Centered from './utils/Centered';

import HighlightSearch from 'examples/Recipes/HighlightSearch';
import TaggedInput from 'examples/Recipes/TaggedInput';

const stories = storiesOf('More Recipes', module);
stories.addDecorator(withKnobs);
stories.addDecorator(Centered);

stories.add('highlight search', () => <HighlightSearch />);
stories.add('tagged input', () => <TaggedInput />);
