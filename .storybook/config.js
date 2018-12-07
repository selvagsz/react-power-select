import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'React Power Select',
  url: 'https://github.com/selvagsz/react-power-select',
  addonPanelInRight: true,
  enableShortcuts: true,
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
