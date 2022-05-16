import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { findLocation, getMoment, setCurrentCity } from './utils/helper';
import useWeatherAPI from './hooks/useWeatherAPI';


import WeatherSetting from './views/WeatherSetting';
import WeatherCard from './views/WeatherCard';

const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;




const AUTHORIZATION_KEY = 'CWB-507B37E0-0383-4D8C-878D-628B54EC3536';




const App = () => {

  const storageCity = localStorage.getItem('cityName') || '臺北市';

  const [currentPage, setCurrentPage] = useState('WeatherCard');

  console.log('--- invoke function component ---');
  const [currentTheme, setCurrentTheme] = useState('light');

  const [currentCity, setCurrentCity] = useState(storageCity);

  const currentLocation = useMemo(() => findLocation(currentCity), [currentCity]);

  const { cityName, locationName, sunriseCityName } = currentLocation;

  const [weatherElement, fetchData] = useWeatherAPI({
    locationName,
    cityName,
    authorizationKey: AUTHORIZATION_KEY,
  });


  const handleCurrentCityChange = (currentCity) => {
    setCurrentCity(currentCity);
  };

  //優化getMoment如果沒有更新就不重新更新LOCATION_NAME_FORECAST
  const moment = useMemo(() => getMoment(sunriseCityName), [sunriseCityName]);

  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark');
  }, [moment]);


  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };



  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === 'WeatherCard' && (
          <WeatherCard cityName={cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData} handleCurrentPageChange={handleCurrentPageChange} />

        )}

      </Container>
      {currentPage === 'WeatherSetting' &&   <WeatherSetting
            cityName={cityName}
            handleCurrentCityChange={handleCurrentCityChange}
            handleCurrentPageChange={handleCurrentPageChange}
          />}

    </ThemeProvider>
  );
};

export default App;