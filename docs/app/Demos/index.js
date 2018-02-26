import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PowerSelectDemos from './PowerSelectDemos';
import MultiPowerSelectDemos from './MultiPowerSelectDemos';
import TypeAheadDemos from './TypeAheadDemos';
import Recipes from './Recipes';

export default () => {
  return (
    <div>
      <section className="header">
        <div className="header__container">
          <h1>React Power Select</h1>
          <div className="header__desc">
            Highly composable & resusable select/autocomplete components
          </div>

          <div className="text-right">
            <a
              className="github-button"
              href="https://github.com/selvagsz/react-power-select"
              data-show-count="true"
              aria-label="Star selvagsz/react-power-select on GitHub"
            >
              Star
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        <Tabs>
          <TabList>
            <Tab>PowerSelect</Tab>
            <Tab>MultiPowerSelect</Tab>
            <Tab>TypeAhead</Tab>
            <Tab>More Recipes</Tab>
          </TabList>

          <TabPanel>
            <PowerSelectDemos />
          </TabPanel>
          <TabPanel>
            <MultiPowerSelectDemos />
          </TabPanel>
          <TabPanel>
            <TypeAheadDemos />
          </TabPanel>
          <TabPanel>
            <Recipes />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
