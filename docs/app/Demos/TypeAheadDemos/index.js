import { Component } from 'react';
import Snippet from '../Snippet';
import TypeAheadPlainArray from './PlainArray';
import TypeAheadArrayOfObjects from './ArrayOfObjectsDemo';

export default class TypeAheadDemos extends Component {
  render() {
    return (
      <section>
        <div className="Section">
          <div className="Section__Demo">
            <TypeAheadPlainArray />
          </div>
          <div className="Section__Code">
            <Snippet highlightLines={[[9, 12], [19, 23]]} snippetName="TypeAheadPlainArray" />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <TypeAheadArrayOfObjects />
          </div>
          <div className="Section__Code">
            <Snippet highlightLines={[[28, 28]]} snippetName="TypeAheadArrayOfObjectsDemo" />
          </div>
        </div>
      </section>
    );
  }
}
