import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Map from '../components/Map';
import './CountriesSingle.css';

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWeather] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const country = location.state ? location.state.country : null;

  useEffect(() => {
    if (country) {
      // Fetch weather data
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            country.capital
          }&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API}`
        )
        .then((res) => {
          setWeather(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
        });

      // Fetch image from Unsplash
      const fallbackImage =
        'https://via.placeholder.com/1600x900?text=No+Image+Available';
      axios

        .get('https://api.unsplash.com/search/photos', {
          params: { query: country.capital, per_page: 1 },
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.UNSPLASH_API_ACCESS_KEY
            }`,
          },
        })
        .then((res) => {
          console.log('API Response:', res.data);
          if (res.data.results.length > 0) {
            // Image URL from Unsplash
            const imageUrl = res.data.results[0].urls.regular;
            console.log('Image URL:', imageUrl); // Log the image URL
            setImage(imageUrl);
          } else {
            setImage(fallbackImage); // Use fallback image if no result
          }
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [country]);

  if (loading || !country) {
    return (
      <div className="text-center m-5">
        <div>Loading...</div>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row m-5">
        <div className="col">
          <h2 className="display-4">{country.name.common}</h2>
          <h3>Capital {country.capital}</h3>
          {!error && weather && (
            <div>
              <p>
                Right now it is <strong>{weather.main.temp}</strong> degrees in{' '}
                {country.capital} and {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
        </div>
        <div className="col">
          <img
            className="thumbnail"
            src={image}
            alt={country.capital}
            crossOrigin=""
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            className="backToCountries"
            onClick={() => navigate('/countries')}
          >
            Go Back
          </button>
          <Map country={country} />
        </div>
      </div>
    </div>
  );
};

export default CountriesSingle;
