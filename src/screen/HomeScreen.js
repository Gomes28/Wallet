import { Text , View , StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { Component, useEffect } from 'react'
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usuarioService from '../service/components/usuarioservice';
import img1 from '../../assets/mao.png'
import logo from '../../assets/logo.png'

export default function login (){

  const logarComToken = (token) => {

    setLoadingToken(true)
    let data = {
      token: token
    }
    
    usuarioService.loginComToken(data)
    .then((response) => {
      setLoadingToken(false)
      navigation.reset({
        index: 0,
        routes: [{name: "Home"}]
      })
    })
    .catch((error) => {
      setLoadingToken(false)      
    })
  }

  useEffect(() => {
    AsyncStorage.getItem("TOKEN").then((token) => {
      logarComToken(token)
    })
  }, [])

  const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        'MonumentExtended-Ultrabold': require('../../assets/fonts/MonumentExtended-Ultrabold.otf'),
        'PoppinsSemiBold': require('../../assets/fonts/PoppinsSemiBold.ttf'),
    });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
      <View style={styles.container}>
          <Image style={styles.logo} source={logo} />
          <Image style={styles.image} source={img1} />
          <Text style={styles.title}>Venha Cuidar De Suas Finanças Com Segurança</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
        <Text style={styles.font}>Vamos Começar?</Text>
    </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#854BFE',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
     width: 280,
     height:180,
     top: -60,
     alignSelf: 'center',
     justifyContent: 'center',
    },
    button:{
      backgroundColor: '#fff',
      width: 351,
      height: 55,
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      top: 60,
    },
    font:{
      alignSelf: 'center',
      justifyContent: 'center',
      fontFamily: 'PoppinsSemiBold',
      fontSize: 18
    },
    image:{
      width: 248,
      height: 256,
      top: 110
    },
    title:{
        fontFamily: 'MonumentExtended-Ultrabold',
        fontSize: 32,
        color: '#fff',
        top: -300
    }
  });