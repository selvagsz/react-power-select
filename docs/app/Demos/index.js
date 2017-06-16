import PlainArrayDemo from './PlainArrayDemo'
import WithoutSearchDemo from './WithoutSearchDemo'
import ArrayOfObjectsDemo from './ArrayOfObjectsDemo'
import SearchFieldsDemo from './SearchFieldsDemo'
import CustomOptionDemo from './CustomOptionDemo'
import CustomSelectedOptionDemo from './CustomSelectedOptionDemo'
import AfterOptionsDemo from './AfterOptionsDemo'
import BeforeOptionsDemo from './BeforeOptionsDemo'

import TypeAheadPlainArray from './TypeAhead/PlainArray'
import TypeAheadArrayOfObjects from './TypeAhead/ArrayOfObjectsDemo'

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
        <CustomSelectedOptionDemo />
        <AfterOptionsDemo />
        <BeforeOptionsDemo />
      </section>

      <section>
        <h1>TypeAhead</h1>
        <TypeAheadPlainArray />
        <TypeAheadArrayOfObjects />
      </section>
    </div>
  )
}
