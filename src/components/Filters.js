import React, { useContext, useState } from 'react';

import Context from '../context/Context';

function Filters() {
  const [selectedColummn, setSelectedColumn] = useState('[]');

  const {
    filterList,
    filterByName,
    filterByPlanetSpecs,
    addFilter,
  } = useContext(Context);

  const columnOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ].filter((column) => column !== selectedColummn);

  // const columnOptions = [
  //   'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  // ];

  return (
    <div className="filters">
      <input
        data-testid="name-filter"
        type="text"
        onChange={ filterByName }
        placeholder="Planet name"
      />
      <div>
        <select
          data-testid="column-filter"
          id="options"
          onChange={ filterByPlanetSpecs }
          name="column"
        >
          {columnOptions.filter((column) => column !== selectedColummn).map((column) => (
            <option key={ column }>{column}</option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          onChange={ filterByPlanetSpecs }
          name="comparison"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          onChange={ filterByPlanetSpecs }
          type="number"
          min={ 0 }
          value={ filterList.planetSpecs.value }
          name="value"
        />

        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => {
            addFilter();
            const choosed = document.getElementById('options').value;
            setSelectedColumn(choosed);
            console.log(columnOptions);
            console.log(filterList);
          } }
        >
          Add Filter
        </button>
      </div>

    </div>
  );
}
export default Filters;
