import React from 'react';
import Select from 'react-select';

const MultiSelectComponent = ({ options, selectedOptions, onSelectionChange }) => {

  const handleChange = (selected) => {
    onSelectionChange(selected);
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: 120, // Adjust this value to change the max height
      overflowY: 'auto',
    }),
  };

  return (
    <div>
     
      <Select
        isMulti
        name="options"
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
        styles={customStyles} // Apply custom styles here
      />
    </div>
  );
};

export default MultiSelectComponent;
