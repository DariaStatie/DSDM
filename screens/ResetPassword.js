import {Text, View, ImageBackground, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import generalStyles from '../styles/generalStyles';
import React from 'react';
import InlineButton from '../components/InlineButton';
import {auth} from "../firebase"
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassword({navigation}) {
  const background_log = require("../assets/background-log.jpg");

  let [email, setEmail] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");

  let resetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then (() => {
      navigation.popToTop();
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });
  }

  return (
    <ImageBackground style={generalStyles.container} source={background_log}>
      <KeyboardAvoidingView style={generalStyles.backgroundCover} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={40}>
        <Text style={[generalStyles.lightText, generalStyles.header]}>Reset Password</Text>
        <Text style={generalStyles.errorMessage}>{errorMessage}</Text>
        <TextInput style={[generalStyles.textInput, generalStyles.lightTextInput, generalStyles.lightText]} placeholder='Email' placeholderTextColor="#BEBEBE" value={email} onChangeText={setEmail}/>
        <View style={[generalStyles.rowContainer, generalStyles.bottomMargin]}>
          <Text style={generalStyles.lightText}> Don't have an account? <InlineButton text="Sign Up" onPress={() => navigation.navigate("SignUp")} /></Text>
        </View>
        <Button title="Reset Password" onPress={resetPassword} color="#098778"/>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
