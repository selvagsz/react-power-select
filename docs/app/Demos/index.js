import PlainArrayDemo from './PlainArrayDemo'
import WithoutSearchDemo from './WithoutSearchDemo'
import ArrayOfObjectsDemo from './ArrayOfObjectsDemo'
import SearchFieldsDemo from './SearchFieldsDemo'
import CustomOptionDemo from './CustomOptionDemo'
import CustomSelectedOptionDemo from './CustomSelectedOptionDemo'
import AfterOptionsDemo from './AfterOptionsDemo'
import BeforeOptionsDemo from './BeforeOptionsDemo'

export default () => {
  return (
    <div className="container">
      <PlainArrayDemo />
      <WithoutSearchDemo />
      <ArrayOfObjectsDemo />
      <SearchFieldsDemo />
      <CustomOptionDemo />
      <CustomSelectedOptionDemo />
      <AfterOptionsDemo />
      <BeforeOptionsDemo />
    </div>
  )
}
