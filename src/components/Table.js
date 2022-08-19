import React, { useContext } from 'react';
import '../App.css';
import Filters from './Filters';
import Context from '../context/Context';

function Table() {
  const { nameFilter } = useContext(Context);
  return (
    <div>
      <h1>Star Wars Planets</h1>

      <Filters />

      <table id="planetTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        {
          nameFilter.map((planet, index) => (
            <tbody key={ index }>
              <tr>
                <td id={ planet.name }>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>
                  {planet.films.map((film) => (
                    <p key={ film }>
                      {film}
                    </p>
                  ))}
                </td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            </tbody>
          ))
        }
      </table>
    </div>
  );
}

export default Table;
