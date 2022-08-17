import React, { useContext } from 'react';

import Context from './Context';

function Filters() {
  const {
    planetList,
    setNameFilter,
    nameFilter,
    setFilterList,
    filterList } = useContext(Context);

  function filterByName({ target: { value } }) {
    const filter = planetList
      .filter((planet) => planet.name.toLowerCase().includes(value));
    setNameFilter(filter);
  }

  function filterByPlanetSpecs({ target: { value, name } }) {
    setFilterList({ ...filterList,
      planetSpecs: { ...filterList.planetSpecs,
        [name]: value } });
  }

  function addFilter() {
    const { planetSpecs: { column, comparison, value } } = filterList;
    const filter = nameFilter.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      return Number(planet[column]) === Number(value);
    });
    setNameFilter(filter);
  }

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
          onChange={ filterByPlanetSpecs }
          name="column"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          onClick={ addFilter }
          type="button"
        >
          Add Filter
        </button>
      </div>

    </div>
  );
}
export default Filters;
