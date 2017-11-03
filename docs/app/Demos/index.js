import PlainArrayDemo from './PowerSelect/PlainArrayDemo';
import WithoutSearchDemo from './PowerSelect/WithoutSearchDemo';
import ArrayOfObjectsDemo from './PowerSelect/ArrayOfObjectsDemo';
import OptGroupDemo from './PowerSelect/OptGroupDemo';
import HighlightSearchDemo from './PowerSelect/HighlightSearch';
import SearchFieldsDemo from './PowerSelect/SearchFieldsDemo';
import CustomOptionDemo from './PowerSelect/CustomOptionDemo';
import CustomSelectedOptionDemo from './PowerSelect/CustomSelectedOptionDemo';
import AfterOptionsDemo from './PowerSelect/AfterOptionsDemo';
import BeforeOptionsDemo from './PowerSelect/BeforeOptionsDemo';

import TypeAheadPlainArray from './TypeAhead/PlainArray';
import TypeAheadArrayOfObjects from './TypeAhead/ArrayOfObjectsDemo';

import MultiSelectPlainArray from './PowerSelectMultiple/PlainArray';
import MultiSelectArrayOfObjects from './PowerSelectMultiple/ArrayOfObjectsDemo';
import MultiSelectCustomSelectedOption from './PowerSelectMultiple/CustomSelectedOption';
import TaggedInputDemo from './PowerSelectMultiple/TaggedInput';

import Snippet from './Snippet';

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
        <section>
          <h1>Power Select</h1>
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

        <section>
          <h1>TypeAhead</h1>
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

          <div className="Section">
            <div className="Section__Demo">
              <TaggedInputDemo />
              <div className="help">
                Type some text & type <code>','</code>
              </div>
            </div>
            <div className="Section__Code">
              <Snippet
                highlightLines={[[18, 64], [79, 79]]}
                snippetName="PowerSelectMultipleTaggedInput"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
