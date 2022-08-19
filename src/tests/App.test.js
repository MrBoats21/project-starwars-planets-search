import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import MockAPI from './MockAPI'
import Provider from '../context/Provider';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Filters from '../components/Filters';

describe('Testa a aplicação', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(MockAPI),
    });
  });

  it('Verifica igual a', async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const addFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, ['diameter']);
    userEvent.selectOptions(comparisonFilter, ['igual a']);
    userEvent.type(valueFilter, '9000');
    userEvent.click(addFilter);
  });

  it('Verifica maior que', async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const addFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, ['diameter']);
    userEvent.selectOptions(comparisonFilter, ['maior que']);
    userEvent.type(valueFilter, '10000');
    userEvent.click(addFilter);
    expect(screen.queryAllByRole('row')).toHaveLength(8);
  });

  it('Verifica menor que', async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const addFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, ['diameter']);
    userEvent.selectOptions(comparisonFilter, ['menor que']);
    userEvent.type(valueFilter, '5000');
    userEvent.click(addFilter);
    expect(screen.queryAllByRole('row')).toHaveLength(2);
  });

  

  it('Testa se os filtros funcionam', () => {
    render(
      <Provider>
        <Filters />
      </Provider>,
    );

   const nameFilter = screen.getByTestId('name-filter');
   const columnFilter = screen.getByTestId('column-filter');
   const comparisonFilter = screen.getByTestId('comparison-filter');
   const valueFilter = screen.getByTestId('value-filter');

   userEvent.type(nameFilter, 'planet');
   userEvent.selectOptions(columnFilter, ['diameter']);
   userEvent.selectOptions(comparisonFilter, ['maior que']);
   userEvent.type(valueFilter, '10000');

   expect(nameFilter).toHaveValue('planet');
   expect(columnFilter).toHaveValue('diameter');
   expect(comparisonFilter).toHaveValue('maior que');
   expect(valueFilter).toHaveValue(10000);
  });
});
