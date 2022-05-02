import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './src/service/api';
import Homescreen from './src/screen/HomeScreen'
import Signup from './src/login/signup'
import Home from './src/screen/Home';
import login from './src//login/login'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen name="login" component={login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function defineInterceptor(){
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      if (err.response.status == 401 && err.config && !err.config._retry){
        originalReq._retry = true
        AsyncStorage.getItem("TOKEN").then((token) => {
          let res = axios.put(`${Config.API_URL}token/refresh`, {oldToken: token})
          .then((res) => {
            AsyncStorage.setItem("TOKEN", res.data.access_token)
            originalReq.headers["Authorization"] = `Bearer ${res.data.access_token}`
            return axios(originalReq)
          })
          resolve(res)
        })
      }else{
        reject(err)
      }
    })
  })
}

export default function App() {
  
  defineInterceptor()

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}