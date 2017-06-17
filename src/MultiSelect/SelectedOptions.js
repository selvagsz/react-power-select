import SelectedOption from './SelectedOption';

export default ({ selected, optionLabelPath, select }) => {
  return (
    <ul className="powerselectmultiple__selectedOptions">
      {selected.map((selectedOption, index) => {
        return (
          <SelectedOption
            key={index}
            option={selectedOption}
            optionLabelPath={optionLabelPath}
            select={select}
          />
        );
      })}
    </ul>
  );
};
