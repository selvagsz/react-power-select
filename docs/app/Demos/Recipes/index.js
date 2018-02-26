import { Component } from 'react';
import Snippet from '../Snippet';
import HighlightSearchDemo from './HighlightSearch';
import TaggedInputDemo from './TaggedInput';
import AutoFillTypeAheadDemo from './AutoFillTypeAhead';

export default class TypeAheadDemos extends Component {
  render() {
    return (
      <section>
        <div className="Section">
          <div className="Section__Demo">
            <HighlightSearchDemo />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[4, 32], [51, 51]]}
              snippetName="PowerSelectHighlightSearch"
            />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <TaggedInputDemo />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[18, 64], [79, 79]]}
              snippetName="PowerSelectMultipleTaggedInput"
            />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <AutoFillTypeAheadDemo />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[5, 47], [64, 69]]}
              snippetName="TypeAheadAutoFillTypeAhead"
            />
          </div>
        </div>
      </section>
    );
  }
}
