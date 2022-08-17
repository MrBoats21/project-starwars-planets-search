import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = ('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanetList(results);
    };
    getPlanets();
  }, []);

  return (
    <Context.Provider value={ { planetList } }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: object,
}.isRequired;

export default Provider;
