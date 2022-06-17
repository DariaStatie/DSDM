import {Text, View, ImageBackground, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import generalStyles from '../styles/generalStyles';
import React from 'react';
import InlineButton from '../components/InlineButton';
import {auth} from "../firebase"
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function Login({navigation}) {
  const background_log = require("../assets/background-log.jpg");

  if(auth.currentUser){
    navigation.navigate("Note");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Note");
      }
    });
  }

  let [errorMessage,setErrorMessage] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  
  let login = () => {
    if(email !== "" && password !== ""){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //console.log(userCredential);
        // setErrorMessage("");
        // setEmail("");
        // setPassword("");
        navigation.navigate("Note", {user: userCredential.user});
      })
      .catch((error) => {
        errorMessage(error.message)
      });
    } else {
        setErrorMessage("Please enter an email and password");
    }
  };


  return (
    <ImageBackground style={generalStyles.container} source={background_log}>
      <KeyboardAvoidingView style={generalStyles.backgroundCover} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={40}>
        <Text style={[generalStyles.lightText, generalStyles.header]}>Login</Text>
        <Text style={generalStyles.errorMessage}>{errorMessage}</Text>
        <TextInput style={[generalStyles.textInput, generalStyles.lightTextInput, generalStyles.lightText]} placeholder='Email' placeholderTextColor="#BEBEBE" value={email} onChangeText={setEmail}/>
        <TextInput style={[generalStyles.textInput, generalStyles.lightTextInput, generalStyles.lightText]} placeholder='Password' placeholderTextColor="#BEBEBE" secureTextEntry={true} value={password} onChangeText={setPassword}/>
        <View style={[generalStyles.rowContainer, generalStyles.topMargin]}>
          <Text style={generalStyles.lightText}> Don't have an account? </Text> 
          <InlineButton text="Sign Up" onPress={() => navigation.navigate("SignUp")} />
        </View>
        <View style={[generalStyles.rowContainer, generalStyles.bottomMargin]}>
          <Text style={generalStyles.lightText}> Forgotten your password? </Text> 
          <InlineButton text="Reset" onPress={() => navigation.navigate("ResetPassword")}/>
        </View>
        <Button title="Login" onPress={login} color="#098778"/>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
