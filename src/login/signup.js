import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { Component, useState } from 'react'
import Input from '../components/input'
import COLORS from '../components/colors'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import usuarioService from '../service/components/usuarioservice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function signup (){
     const [name , setName ] = useState('')
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')

     const [visibleDialog, setVisibleDialog] = useState(false);
     const [titulo, setTitulo] = useState(null)
     const [mensagem, setMensagem] = useState(null)
     const [tipo, setTipo] = useState(null)

     const showDialog = (titulo, mensagem, tipo) => {
        setVisibleDialog(true)
        setTitulo(titulo)
        setMensagem(mensagem)
        setTipo(tipo)
      }

     const salvar = () => {
          
          let data = {
            email: email,
            nome: name,
            password: password
          }
          
          usuarioService.cadastrar(data)
          .then((response) => {
            const titulo = (response.data.status) ? "Sucesso" : "Erro"
            showDialog(titulo, response.data.mensagem, "SUCESSO")
            Alert.alert("Usuario cadastrado com sucesso")
            usuarioService.loginCadastrar({ username: data.email, password: data.password})
          .then(async (response) =>{
            AsyncStorage.setItem("TOKEN", response.data.access_token)
            AsyncStorage.setItem("NAME", name)
            AsyncStorage.setItem("EMAIL", email)
            navigation.reset({
              index: 0,
              routes: [{name: "Home"}]
            })
          })
          })
          .catch((error) => {
            console.log(error)
            showDialog("Erro","Houve um erro inesperado", "ERRO")
          })
    }
   
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

            <Image style={styles.logo} source={require('../../assets/logo.png')} />

            <Text style={{fontFamily:'PoppinsSemiBold', top: -55, fontSize:25, color:'#fff'}}>Bem vindo de Volta</Text>

            <Input
            onChangeText={value => setName(value)}
            iconName="account-outline"
            placeholder="Nome"
          />

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

        <TouchableOpacity style={styles.button} onPress={() => salvar()}>
          <Text style={styles.font}>Criar Conta</Text>
        </TouchableOpacity>

        <Text style={{fontSize:'20', color:'#fff', top: -10, alignSelf: 'center', justifyContent:'center'}}>____________                ____________</Text>

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
      
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
         <Text style={{fontFamily: 'PoppinsSemiBold', fontSize:14, top:45, color:'#40BFFF', alignSelf:'center',justifyContent:'center'}}>
           Fazer Login
         </Text>
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
    top: -30,
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
    top: -25,
    },
    font:{
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'PoppinsSemiBold',
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
});