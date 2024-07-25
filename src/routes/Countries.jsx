// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../store/countriesSlice';
import { addFavourite, removeFavourite } from '../store/favouritesSlice';
import { NavLink } from 'react-router-dom';
import './Countries.css';

const Countries = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  let searchResult = countriesList.filter((country) =>
    country.name.official.toLowerCase().includes(search.toLowerCase())
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center m-5">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  function getCountryName(countryShortName) {
    let filtered = countriesList.filter(
      (country) => country.cca3 === countryShortName
    );
    return filtered[0].name.common;
  }

  return (
    <div className="container">
      <input
        className="search-input"
        placeholder="Search"
        onChange={searchHandler}
      />
      <div className="row">
        {searchResult.map((country) => (
          <div key={country.name.official} className="col">
            <div className="card">
              <NavLink
                style={{ textDecoration: 'none' }}
                to={`/countries/${country.name.official}`}
                state={{ country: country }}
              >
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  style={{
                    objectFit: 'cover',
                    minHeight: '200px',
                    maxHeight: '200px',
                  }}
                />
                <div className="card-body">
                  <div className="card-title">{country.name.common}</div>
                  <div className="card-subtitle">{country.name.official}</div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      language:{' '}
                      {Object.values(country.languages ?? {}).join(', ')}
                    </li>
                    <li className="list-group-item">
                      currency:{' '}
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(', ')}
                    </li>
                    <li className="list-group-item">
                      population: {country.population.toLocaleString()} people
                    </li>
                    <li className="list-group-item">
                      neighbour:{' '}
                      {country.borders && country.borders.length > 0
                        ? country.borders
                            .map((border) => getCountryName(border))
                            .join(', ')
                        : 'No neighbouring countries'}
                    </li>
                  </ul>
                </div>
              </NavLink>
              <div className="likeDislikeButtons">
                <p
                  className="button-like"
                  onClick={() => dispatch(addFavourite(country))}
                >
                  ❤️
                </p>
                <p
                  className="button-dislike"
                  onClick={() =>
                    dispatch(
                      removeFavourite({ id: country.id, name: country.name })
                    )
                  }
                >
                  ❌
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
