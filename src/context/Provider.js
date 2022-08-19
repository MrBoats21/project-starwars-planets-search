import { object } from 'prop-types';
import React, { useEffect } from 'react';
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
      .filter((planet) => planet.name.toLowerCase().includes(value));
    setNameFilter(filter);
  }

  function filterByPlanetSpecs({ target: { value, name } }) {
    if (name) {
      setFilterList({ ...filterList,
        planetSpecs: { ...filterList.planetSpecs,
          [name]: value } });
    }
  }

  const contextValue = {
    planetList,
    setPlanetList,
    nameFilter,
    setNameFilter,
    newFilter,
    setNewFilter,
    filterByName,
    filterByPlanetSpecs,
    filterList,
    setFilterList,
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
