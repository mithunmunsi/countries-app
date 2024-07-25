const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Country App</h1>
      <h2>Begin Countries Application setup...</h2>
      <h3>Steps:</h3>
      <p>
        1. Install react-redux and react-redux toolkit Install react-redux and
        @reduxjs/toolkit using npm or yarn. These libraries will be used to
        manage the state of your application.
      </p>
      <code>npm install react-redux @reduxjs/toolkit</code>
      <p>
        2. Signup for weather api at:
        https://home.openweathermap.org/users/sign_up Sign up for the
        OpenWeatherMap API at https://home.openweathermap.org/users/sign_up. You
        will receive an API key which will be used to fetch weather data. The
        signup means we have to wait 2 hours for the API key to be available. We
        will not be using this right away.
      </p>
      <p>
        3. Set up store, slice and (do api call together - service) Set up your
        Redux store and create a slice for your countries data. In the slice,
        define actions and reducers to handle the fetching of country data. You
        can use createAsyncThunk from Redux Toolkit to handle the API call.
      </p>
      <p>
        4. Test that redux in chrome is showing the empty countries array. Test
        your Redux setup by checking the Redux DevTools in your browser.
      </p>
      <p>
        5. Connect Countries.jsx to store and replace the countriesList and
        loading with values from redux. In your Countries.jsx component, connect
        to the Redux store using the useSelector and useDispatch hooks from
        react-redux. Replace the local countriesList and loading state with
        values from the Redux store.
      </p>
      <p>6. Use framework component to fetch data and display.</p>
      <p>
        7. Create search function for all countries Implement a search function
        that filters the list of countries based on the user&apos;s input. This
        could be done in the Redux slice or in the component itself, depending
        on your preference.
      </p>
      <p>
        8. Create link container and add in link for single page later
        (suggested wrapping Card.Img) Create a link container component that
        wraps around each country item. This component should use the Link
        component from react-router-dom to navigate to a detailed view of the
        country when clicked. It&apos;s suggested to wrap the Card.Img component
        with this link container.
      </p>
      <p>9. Set up country single.</p>
    </div>
  );
};

export default Home;
