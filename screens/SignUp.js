import {Text, View, ImageBackground, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import generalStyles from '../styles/generalStyles';
import React from 'react';
import InlineButton from '../components/InlineButton';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import {auth} from "../firebase";

export default function SignUp({navigation}) {
  const background_log = require("../assets/background-log.jpg");

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [validationMessage, setValidationMessage] = React.useState("");

  let validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }

    setValue(value);
  };

  let signUp = () => {
    if(password === confirmPassword){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser);
        navigation.navigate("Note", {user: userCredential.user});
      })
      .catch((error) => {
        setValidationMessage(error.message);
      });
    }
  };

  return (
    <ImageBackground style={generalStyles.container} source={background_log}>
      <KeyboardAvoidingView style={generalStyles.backgroundCover} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={40}>
        <Text style={[generalStyles.lightText, generalStyles.header]}>Sign Up</Text>
        <Text style={[generalStyles.errorMessage]}>{validationMessage}</Text>
        <TextInput style={[generalStyles.textInput, generalStyles.lightTextInput, generalStyles.lightText]} placeholder='Email' placeholderTextColor="#BEBEBE" value={email} onChangeText={setEmail}/>
        <TextInput style={[generalStyles.textInput, generalStyles.lightTextInput, generalStyles.lightText]} placeholder='Password' placeholderTextColor="#BEBEBE" secureTextEntry={true} value={password} onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}/>
        <TextInput style={[generalStyles.textInput, generalStyles.lightTextInput, generalStyles.lightText]} placeholder='Confirm Password' placeholderTextColor="#BEBEBE" secureTextEntry={true} value={confirmPassword} onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}/>
        <View style={[generalStyles.rowContainer, generalStyles.bottomMargin]}>
          <Text style={generalStyles.lightText}> Already have an account? </Text>
          <InlineButton text="Login" onPress={() => navigation.popToTop()}/>
        </View>
        <Button title="Sign Up" onPress={signUp} color="#098778"/>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
