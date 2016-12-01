export default (props) => (
  <div
    className={
      `powerselect__option ${props.isHighlighted ? 'powerselect__option--highlighted' : ''}`
    }
    onClick={props.onOptionClick}
  >
    {
      props.optionComponent ?
      props.optionComponent({
        option: props.option,
        select: props.select
      }) :
      props.option
    }
  </div>
)
