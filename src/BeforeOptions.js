export default (props) => (
  <div
    className='powerselect__before-options'
    onClick={props.onAfterOptionClick}
  >
    {props.label}
  </div>
)
