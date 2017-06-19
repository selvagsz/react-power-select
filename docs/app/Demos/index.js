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

import MultiSelectPlainArray from './MultiSelect/PlainArray';
import MultiSelectArrayOfObjects from './MultiSelect/ArrayOfObjectsDemo';
import MultiSelectCustomSelectedOption from './MultiSelect/CustomSelectedOption';

export default () => {
  return (
    <div className="container">

      <section>
        <h1>Power Select</h1>
        <PlainArrayDemo />
        <WithoutSearchDemo />
        <ArrayOfObjectsDemo />
        <SearchFieldsDemo />
        <CustomOptionDemo />
        <HighlightSearchDemo />
        <CustomSelectedOptionDemo />
        <AfterOptionsDemo />
        <BeforeOptionsDemo />
      </section>

      <section>
        <h1>TypeAhead</h1>
        <TypeAheadPlainArray />
        <TypeAheadArrayOfObjects />
      </section>

      <section>
        <h1>MultiSelect</h1>
        <MultiSelectPlainArray />
        <MultiSelectArrayOfObjects />
        <MultiSelectCustomSelectedOption />
      </section>
    </div>
  );
};
