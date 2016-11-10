export default (props) => (
  <div
    className={`option ${props.isHighlighted ? 'highlighted' : ''}`}
    onClick={props.onOptionClick}
  >
    {
      props.optionComponent ?
      props.optionComponent(props.option) :
      props.option
    }
  </div>
)
