import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Home (){

  const navigation = useNavigation();

  const [ user , setUser] = useState('usuario name')

  const _retrieveData = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem('EMAIL');
      if (TOKEN !== null) {
        setUser(TOKEN);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect( async () => {
    await _retrieveData();
  }, [user])

    const logout = (navigation) => {
      AsyncStorage.setItem("TOKEN","").then(() => {
          navigation.reset({
              index: 0,
              routes: [{name: "login1"}]
          })
      }).catch((error) => {
          console.log(error)
          Alert.alert("Erro ao sair")
      })
   }

    return (
      <View>
        <Text style={{alignSelf:'center',justifyContent:'center',top: 80}}>{user}</Text>
        <TouchableOpacity
            onPress={() => logout(navigation)}
          >
            <Text
             style={{
              fontSize: 20,
              top: 180,
              alignSelf: 'center',
              justifyContent: 'center'
            }}
            >Logout</Text>
            </TouchableOpacity>
      </View>
    )
}