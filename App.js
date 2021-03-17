import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ImageBackground} from 'react-native';

const App = () => {
  const homeImg = require('./images/home.jpeg');
  const cloudyImg = require('./images/cloudy.jpeg');
  const rannyImg = require('./images/ranny.jpeg');
  const clearImg = require('./images/sunny.jpeg');
  const [query, setQuery] = useState('');
  const [isloding, setIsloding] = useState(false);
  const [weather, setWeather] = useState({});
  const [image, setImage] = useState(homeImg);
  // console.log(weather, 'q');
  const api = {
    key: '61f3e3b2631399db61455773d93cc57c',
    base: 'https://api.openweathermap.org/data/2.5/',
  };

  const datebuilder = (d) => {
    let months = [
      'janvery',
      'febrary',
      'march',
      'april',
      'may',
      'jun',
      'jully',
      'auguest',
      'september',
      'octuber',
      'november',
      'december',
    ];
    let days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  const search = () => {
    // if (query === 'karachi') {
    setIsloding(true);
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.weather[0], 'result');

        switch (result.weather[0].main) {
          case 'Rain':
            console.log('kk');
            setImage(rannyImg);
            break;
          case 'Clear':
            setImage(clearImg);
            break;
          case 'Clouds':
            setImage(cloudyImg);
            break;
          default:
            setImage(homeImg);
            break;
        }
        // if (result.weather[0].main === 'Rain') {
        //   setImage(rannyImg);
        // }
        // if (result.weather[0].main === 'Clear') {
        //   setImage(clearImg);
        // }
        // if (result.weather[0].main === 'Clouds') {
        //   setImage(cloudyImg);
        // }
        // if (
        //   result.weather[0].main != 'Rain' ||
        //   result.weather[0].main != 'Clear' ||
        //   result.weather[0].main != 'Clouds'
        // ) {
        //   setImage(homeImg);
        // }
        setWeather(result);
        setIsloding(false);
      });
  };
  // if (weather.weather[0].main === 'Rain') {
  //   setImage(rannyImg);
  // }
  // };
  // console.log(weather, 'befor');
  if (isloding) {
    return (
      <ImageBackground
        style={{
          paddingTop: 20,
          alignItems: 'center',
          flex: 1,
        }}
        source={image}>
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <View
            style={{
              borderWidth: 1,
              width: '80%',
              borderColor: 'white',
              borderRadius: 20,
            }}>
            <TextInput
              style={{
                color: 'white',
                fontSize: 20,
                marginLeft: 10,
              }}
              placeholder="Search"
              placeholderTextColor="white"
              value={query}
              onChangeText={(e) => {
                setQuery(e);
              }}
              onKeyPress={search}
            />
          </View>
          <Text
            style={{
              fontSize: 30,
              textTransform: 'capitalize',
              // color: 'rgb(218, 218, 218)',
              color: 'red',
              marginTop: 20,
            }}>
            loding ...
          </Text>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        style={{
          paddingTop: 20,
          alignItems: 'center',
          flex: 1,
        }}
        source={image}>
        {typeof weather.main != 'undefined' ? (
          <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
            <View
              style={{
                borderWidth: 1,
                width: '80%',
                borderColor: 'white',
                borderRadius: 20,
              }}>
              <TextInput
                style={{
                  color: 'white',
                  fontSize: 20,
                  marginLeft: 10,
                }}
                placeholder="Search"
                placeholderTextColor="white"
                value={query}
                onChangeText={(e) => {
                  setQuery(e);
                }}
                onKeyPress={search}
              />
            </View>
            <Text
              style={{
                fontSize: 30,
                textTransform: 'capitalize',
                // color: 'rgb(218, 218, 218)',
                color: 'red',
                marginTop: 20,
              }}>
              {weather.name}, {weather.sys.country}
            </Text>
            <Text
              style={{
                fontSize: 30,
                textTransform: 'capitalize',
                // color: 'rgb(218, 218, 218)',
                color: 'red',
                marginTop: 20,
              }}>
              {datebuilder(new Date())}
            </Text>
            <Text
              style={{
                fontSize: 30,
                textTransform: 'capitalize',
                // color: 'rgb(218, 218, 218)',
                color: 'red',
                marginTop: 20,
              }}>
              {Math.round(weather.main.temp)} c
            </Text>
            <Text
              style={{
                fontSize: 30,
                textTransform: 'capitalize',
                // color: 'rgb(218, 218, 218)',
                color: 'red',
                marginTop: 20,
              }}>
              {weather.weather[0].main}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 3,
                width: '80%',
                borderColor: 'white',
                borderRadius: 20,
              }}>
              <TextInput
                style={{color: 'white', fontSize: 20, marginLeft: 10}}
                placeholder="Search"
                placeholderTextColor="white"
                value={query}
                onChangeText={(e) => {
                  setQuery(e);
                }}
                onKeyPress={search}
              />
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 40,
                  textTransform: 'capitalize',
                  color: 'rgb(37, 37, 37)',
                }}>
                nothing to show
              </Text>
            </View>
          </View>
        )}
      </ImageBackground>
    );
  }
};

const style = StyleSheet.create({
  main: {
    backgroundColor: 'red',
    flex: 1,
  },
  tem: {
    backgroundColor: 'orange',
    flex: 1,
  },
});
export default App;
