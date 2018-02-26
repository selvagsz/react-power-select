import { Component } from 'react';
import Snippet from '../Snippet';
import PlainArrayDemo from './PlainArrayDemo';
import WithoutSearchDemo from './WithoutSearchDemo';
import ArrayOfObjectsDemo from './ArrayOfObjectsDemo';
import OptGroupDemo from './OptGroupDemo';
import SearchFieldsDemo from './SearchFieldsDemo';
import CustomOptionDemo from './CustomOptionDemo';
import CustomSelectedOptionDemo from './CustomSelectedOptionDemo';
import AfterOptionsDemo from './AfterOptionsDemo';
import BeforeOptionsDemo from './BeforeOptionsDemo';

export default class PowerSelectDemos extends Component {
  render() {
    return (
      <section>
        <div className="Section">
          <div className="Section__Demo">
            <PlainArrayDemo />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[10, 12], [19, 24]]}
              snippetName="PowerSelectPlainArrayDemo"
            />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <ArrayOfObjectsDemo />
          </div>
          <div className="Section__Code">
            <Snippet highlightLines={[[21, 21]]} snippetName="PowerSelectArrayOfObjectsDemo" />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <OptGroupDemo />
          </div>
          <div className="Section__Code">
            <Snippet highlightLines={[[4, 11], [43, 43]]} snippetName="PowerSelectOptGroupDemo" />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <WithoutSearchDemo />
          </div>
          <div className="Section__Code">
            <Snippet highlightLines={[[21, 21]]} snippetName="PowerSelectWithoutSearchDemo" />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <SearchFieldsDemo />
          </div>
          <div className="Section__Code">
            <Snippet highlightLines={[[22, 22]]} snippetName="PowerSelectSearchFieldsDemo" />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <CustomOptionDemo />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[4, 11], [30, 30]]}
              snippetName="PowerSelectCustomOptionDemo"
            />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <CustomSelectedOptionDemo />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[11, 15], [35, 35]]}
              snippetName="PowerSelectCustomSelectedOptionDemo"
            />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <AfterOptionsDemo />
          </div>
          <div className="Section__Code">
            <Snippet
              highlightLines={[[13, 16], [28, 37]]}
              snippetName="PowerSelectAfterOptionsDemo"
            />
          </div>
        </div>

        <div className="Section">
          <div className="Section__Demo">
            <BeforeOptionsDemo />
          </div>
          <div className="Section__Code">
            <Snippet highlightLines={[[46, 61]]} snippetName="PowerSelectBeforeOptionsDemo" />
          </div>
        </div>
      </section>
    );
  }
}
