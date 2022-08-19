import React, { useEffect } from 'react';
import { object } from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planetList, setPlanetList] = React.useState([]);
  const [nameFilter, setNameFilter] = React.useState([]);
  const [newFilter, setNewFilter] = React.useState([]);
  const [filterList, setFilterList] = React.useState({
    planetSpecs: {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  });

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = ('https://swapi.dev/api/planets');
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanetList(results);
      setNameFilter(results);
    };
    getPlanets();
  }, []);

  function filterByName({ target: { value } }) {
    const filter = planetList
      .filter((planet) => planet.name.toUpperCase()
        .includes(value.toUpperCase()));
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

  const contextValue = {
    planetList,
    setPlanetList,
    nameFilter,
    setNameFilter,
    filterList,
    setFilterList,
    filterByName,
    filterByPlanetSpecs,
    newFilter,
    addFilter,
    setNewFilter,
  };
  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: object,
}.isRequired;

export default Provider;
