export default (props) => (
  <div
    className='powerselect__after-options'
    onClick={props.onAfterOptionClick}
  >
    {props.label}
  </div>
)
