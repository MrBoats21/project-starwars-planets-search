import React, { useContext } from 'react';
import '../App.css';
import Context from './Context';

function Inputs() {
  const { setNameFilter } = useContext(Context);

  const filterByName = ({ target: { value } }) => {
    setNameFilter(value);
  };

  return (
    <input
      placeholder="Nome do planeta"
      data-testid="name-filter"
      onChange={ filterByName }
    />
  );
}

export default Inputs;
