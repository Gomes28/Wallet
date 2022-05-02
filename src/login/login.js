import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import usuarioService from '../service/components/usuarioservice';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Input from '../components/input';


export default function Login({navigation}) {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isLoadingToken, setLoadingToken] = useState(true)

  const entrar = () => {

    let data = {
      username: email,
      password: password
    }
    
    usuarioService.login(data)
    .then((response) => {
     console.log(response.data)
      setLoading(false)
      navigation.reset({
        index: 0,
        routes: [{name: "Home"}]
      })
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
      Alert.alert("Usuário não existe")
    })
  }

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
        routes: [{name: "Principal"}]
      })
    })
    .catch((error) => {
      setLoadingToken(false)      
    })
  }

  const cadastrar = () => {
    navigation.navigate("Cadastro")
  }

  let [fontsLoaded] = useFonts({
    'MonumentExtended-Ultrabold': require('../../assets/fonts/MonumentExtended-Ultrabold.otf'),
    'PoppinsSemiBold': require('../../assets/fonts/PoppinsSemiBold.ttf'),
  });

  if (!fontsLoaded) {
      return <AppLoading />;
  }

  return (
    <View style={styles.container}>

    <Image style={styles.logo} source={require('../../assets/logo.png')} />

    <Text style={{fontFamily:'PoppinsSemiBold', top: -90, fontSize:25, color:'#fff'}}>Bem vindo de Volta</Text>

    <Input
      onChangeText={value => setEmail(value)}
      iconName="email-outline"
      placeholder="Email"
    />
    <Input
      onChangeText={value => setPassword(value)}
      iconName="lock-outline"
      placeholder="Senha"
      password
    />

  <TouchableOpacity style={styles.button} onPress={() => entrar()}>
    <Text style={styles.font}>Fazer Login</Text>
  </TouchableOpacity>

  <Text style={{fontSize:'20', color:'#fff', top: -20, alignSelf: 'center', justifyContent:'center'}}>____________                ____________</Text>

  {/* GOOGLE LOGIN */}
  <TouchableOpacity style={styles.border}>
    <Image style={styles.login} source={require('../../assets/icongoogle.jpeg')}/>
    <Text style={styles.google}>Fazer Login com Google</Text>
  </TouchableOpacity>

  {/* FACEBOOK LOGIN */}
  <TouchableOpacity style={styles.border}>
    <Image style={styles.login} source={require('../../assets/iconfacebook.png')}/>
    <Text style={styles.google}>Fazer Login com Google</Text>
  </TouchableOpacity>

<TouchableOpacity>
  <Text style={styles.senha}>Esqueceu sua senha?</Text>
</TouchableOpacity>

<View>
   <Text style={{fontFamily: 'PoppinsSemiBold', fontSize:14, top:35, color:'#fff', alignSelf:'center',justifyContent:'center'}}>
     Ainda não possui uma conta? <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
   <Text style={styles.signup}>Vamos Começar?</Text></TouchableOpacity></Text>
</View>

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
top: -70,
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
top: -40,
},
font:{
alignSelf: 'center',
justifyContent: 'center',
fontFamily: 'PoppinsSemiBold',
},
image:{
width: 248,
height: 256,
top: 24
},
box:{
backgroundColor: '#fff',
width: 343,
height: 48,
alignSelf: 'center',
justifyContent: 'center',
borderRadius: 8
},
imageStyle: {
padding: 10,
margin: 5,
height: 25,
width: 25,
resizeMode: 'stretch',
alignItems: 'center',
},
login:{
width:44,
height:44,
left: -120,
alignSelf: 'center',
justifyContent: 'center',
top:10
},
border:{
backgroundColor: '#fff',
width: 343,
height: 57,
alignItems: 'center',
justifyContent: 'center',
borderRadius: 7,
top: 0,
marginTop: 16
},
google:{
fontFamily: 'PoppinsSemiBold',
alignSelf: 'center',
justifyContent: 'center',
top: -20,
left: 20
},
senha:{
top: 32,
fontFamily: 'PoppinsSemiBold',
color: '#40BFFF',
},
signup:{
fontFamily: 'PoppinsSemiBold',
color: '#40BFFF',
fontSize: 14,
alignSelf:'center',
justifyContent:'center',
top:3
}
});