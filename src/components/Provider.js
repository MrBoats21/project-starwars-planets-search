import React, { useEffect } from 'react';
import { object } from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planetList, setPlanetList] = React.useState([]);
  const [nameFilter, setNameFilter] = React.useState([]);
  const [filterList, setFilterList] = React.useState({
    planetSpecs: {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  });

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = ('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanetList(results);
      setNameFilter(results);
    };
    getPlanets();
  }, []);
  const contextValue = {
    planetList,
    setPlanetList,
    nameFilter,
    setNameFilter,
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
