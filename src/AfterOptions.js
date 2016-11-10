export default (props) => (
  <div
    className='after-options'
    onClick={props.onAfterOptionClick}
  >
    {props.label}
  </div>
)
