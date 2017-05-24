import Option from './Option'

export default ({ option, optionLabelPath, optionComponent, isHighlighted, onOptionClick, select }) => (
  <div
    className={
      `powerselect__option ${isHighlighted ? 'powerselect__option--highlighted' : ''}`
    }
    onClick={onOptionClick}
  >
    <Option
      option={option}
      optionLabelPath={optionLabelPath}
      optionComponent={optionComponent}
      select={select}
    />
  </div>
)
