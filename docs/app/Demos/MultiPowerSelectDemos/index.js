import { Component } from 'react';
import Snippet from '../Snippet';
import MultiSelectPlainArray from './PlainArray';
import MultiSelectArrayOfObjects from './ArrayOfObjectsDemo';
import MultiSelectCustomSelectedOption from './CustomSelectedOption';

export default class MultiPowerSelectDemos extends Component {
  render() {
    return (
      <section>
        <div className="Section">
          <div className="Section__Demo">
            <MultiSelectPlainArray />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[9, 12], [19, 23]]}
              snippetName="PowerSelectMultiplePlainArray"
            />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <MultiSelectArrayOfObjects />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[28, 28]]}
              snippetName="PowerSelectMultipleArrayOfObjectsDemo"
            />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <MultiSelectCustomSelectedOption />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[12, 33], [53, 53]]}
              snippetName="PowerSelectMultipleCustomSelectedOption"
            />
          </div>
        </div>
      </section>
    );
  }
}
