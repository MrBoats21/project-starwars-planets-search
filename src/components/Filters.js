import React, { useContext, useState, useEffect } from 'react';

import Context from '../context/Context';

function Filters() {
  const {
    planetList,
    setNameFilter,
    setFilterList,
    filterList,
    newFilter,
    setNewFilter,
    filterByName,
    filterByPlanetSpecs,
  } = useContext(Context);

  const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [filterByOptions, setFilterByOptions] = useState([]);
  const [columns, setColumns] = useState(columnOptions);

  useEffect(() => {
    const ApplyFilter = newFilter.reduce((acc, curr) => {
      const { column, comparison, value } = curr;
      acc = acc.filter((planet) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        return Number(planet[column]) === Number(value);
      });
      return acc;
    }, planetList);
    setNameFilter(ApplyFilter);
  }, [newFilter, planetList, setNameFilter]);

  function addFilter() {
    const { planetSpecs, planetSpecs: { column, comparison, value } } = filterList;
    if (column) {
      setNewFilter([...newFilter, planetSpecs]);
      setFilterByOptions([...filterByOptions, `${column} ${comparison} ${value}`]);
      setFilterList({ ...filterList,
        planetSpecs: { ...filterList.planetSpecs,
          column: '' } });
      setColumns(columns.filter((option) => option !== column));
      console.log(column);
    }
  }

  return (
    <div className="filters">

      <input
        data-testid="name-filter"
        type="text"
        onChange={ filterByName }
        placeholder="Planet name"
      />

      <select
        data-testid="column-filter"
        onChange={ filterByPlanetSpecs }
        onClick={ filterByPlanetSpecs }
        name="column"
      >
        { columns.map((option) => (
          <option key={ option }>
            { option }
          </option>)) }
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
        value={ filterList.planetSpecs.value }
        name="value"
      />

      <button
        data-testid="button-filter"
        onClick={ addFilter }
        type="button"
      >
        Aplicar Filtro
      </button>
    </div>
  );
}

export default Filters;
