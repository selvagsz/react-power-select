export default (props) => (
  <div
    className={`option ${props.isHighlighted ? 'highlighted' : ''}`}
    onClick={props.onOptionClick}
  >
    {props.option}
  </div>
)
