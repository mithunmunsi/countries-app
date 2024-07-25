// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../store/countriesSlice';
import { clearFavourites, getFromFirebase } from '../store/favouritesSlice';
import './Favourites.css';

const Favourites = () => {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites.favourites);

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFromFirebase());
  }, [dispatch]);

  return (
    <div className="container">
      <button
        className="button"
        onClick={() => dispatch(clearFavourites())}
        type="button"
      >
        Clear Favourites
      </button>
      <div className="row">
        {favourites.map((country) => (
          <div key={country.name.official} className="col">
            <div className="card">
              <img src={country.flags.svg} alt={country.name.common} />
              <div className="card-body">
                <h3 className="card-title">{country.name.common}</h3>
                <h4 className="card-subtitle">{country.name.official}</h4>
                <ul className="list-group">
                  <li className="list-group-item" title="languages">
                    🗣️ {Object.values(country.languages ?? {}).join(', ')}
                  </li>
                  <li className="list-group-item" title="currencies">
                    💰{' '}
                    {Object.values(country.currencies || {})
                      .map((currency) => currency.name)
                      .join(', ')}
                  </li>
                  <li className="list-group-item" title="population">
                    👥 {country.population.toLocaleString()}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
