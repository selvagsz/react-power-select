import PlainArrayDemo from './PowerSelect/PlainArrayDemo';
import WithoutSearchDemo from './PowerSelect/WithoutSearchDemo';
import ArrayOfObjectsDemo from './PowerSelect/ArrayOfObjectsDemo';
import HighlightSearchDemo from './PowerSelect/HighlightSearch';
import SearchFieldsDemo from './PowerSelect/SearchFieldsDemo';
import CustomOptionDemo from './PowerSelect/CustomOptionDemo';
import CustomSelectedOptionDemo from './PowerSelect/CustomSelectedOptionDemo';
import AfterOptionsDemo from './PowerSelect/AfterOptionsDemo';
import BeforeOptionsDemo from './PowerSelect/BeforeOptionsDemo';

import TypeAheadPlainArray from './TypeAhead/PlainArray';
import TypeAheadArrayOfObjects from './TypeAhead/ArrayOfObjectsDemo';

import MultiSelectPlainArray from './PowerSelectMultiple/PlainArray';
import MultiSelectArrayOfObjects
  from './PowerSelectMultiple/ArrayOfObjectsDemo';
import MultiSelectCustomSelectedOption
  from './PowerSelectMultiple/CustomSelectedOption';

import Snippet from './Snippet';

export default () => {
  return (
    <div>
      <header className="header">React Power Select</header>
      <div className="container">

        <section>
          <h1>Power Select</h1>
          <div className="Section">
            <div className="Section__Demo">
              <PlainArrayDemo />
            </div>
            <div className="Section__Code">
              <Snippet
                highlightLines={[[10, 12], [19, 23]]}
                snippetName="PowerSelectPlainArrayDemo"
              />
            </div>
          </div>

          <div className="Section">
            <div className="Section__Demo">
              <ArrayOfObjectsDemo />
            </div>
            <div className="Section__Code">
              <Snippet
                highlightLines={[[21, 21]]}
                snippetName="PowerSelectArrayOfObjectsDemo"
              />
            </div>
          </div>

          <div className="Section">
            <div className="Section__Demo">
              <WithoutSearchDemo />
            </div>
            <div className="Section__Code">
              <Snippet
                highlightLines={[[21, 21]]}
                snippetName="PowerSelectWithoutSearchDemo"
              />
            </div>
          </div>

          <div className="Section">
            <div className="Section__Demo">
              <SearchFieldsDemo />
            </div>
            <div className="Section__Code">
              <Snippet
                highlightLines={[[22, 22]]}
                snippetName="PowerSelectSearchFieldsDemo"
              />
            </div>
          </div>

          <div className="Section">
            <div className="Section__Demo">
              <CustomOptionDemo />
            </div>
            <div className="Section__Code">
              <Snippet
                highlightLines={[[4, 10], [30, 30]]}
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
                highlightLines={[[11, 17], [36, 36]]}
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
                highlightLines={[[13, 16], [27, 37]]}
                snippetName="PowerSelectAfterOptionsDemo"
              />
            </div>
          </div>

          <div className="Section">
            <div className="Section__Demo">
              <BeforeOptionsDemo />
            </div>
            <div className="Section__Code">
              <Snippet
                highlightLines={[[46, 61]]}
                snippetName="PowerSelectBeforeOptionsDemo"
              />
            </div>
          </div>
        </section>

        <section>
          <h1>TypeAhead</h1>
          <div className="Section">
            <div className="Section__Demo">
              <TypeAheadPlainArray />
            </div>
            <div className="Section__Code">
              <Snippet
                highlightLines={[[9, 12], [19, 23]]}
                snippetName="TypeAheadPlainArray"
              />
            </div>
          </div>

          <div className="Section">
            <div className="Section__Demo">
              <TypeAheadArrayOfObjects />
            </div>
            <div className="Section__Code">
              <Snippet
                highlightLines={[[28, 28]]}
                snippetName="TypeAheadArrayOfObjectsDemo"
              />
            </div>
          </div>
        </section>

        <section>
          <h1>MultiSelect</h1>
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

        <section>
          <h1>More Receipes</h1>
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
        </section>
      </div>
    </div>
  );
};
