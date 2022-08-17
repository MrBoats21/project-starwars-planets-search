import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planetList, setPlanetList] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = ('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanetList(results.filter((planet) => planet.name.toLowerCase()
        .includes(nameFilter.toLowerCase())));
    };
    getPlanets();
  }, [nameFilter]);

  return (
    <Context.Provider
      value={ { planetList,
        setPlanetList,
        setNameFilter } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: object,
}.isRequired;

export default Provider;
