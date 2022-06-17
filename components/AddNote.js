import { Button, View, TextInput, Text, ImageBackground, KeyboardAvoidingView } from "react-native";
import React from "react";
import generalStyles from "../styles/generalStyles";

export default function AddNote(props){
    const background= require("../assets/background.jpg");

    let [note, setNote] = React.useState("");

    return (
        <ImageBackground style={generalStyles.container} source={background}> 
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={40}>
            <Text style={generalStyles.header}> Add Note </Text>
            <TextInput styles={[generalStyles.textInput, generalStyles.darkTextInput]} placeholder='Note' value={note} onChangeText={setNote} />
            <View style={[generalStyles.rowContainer, generalStyles.rightAlign, generalStyles.rightMargin]}>
                <Button title="Cancel" onPress={props.onClose}/>
                <Button title="Add" onPress={() => { 
                    props.addNote(note); 
                    setNote(""); 
                    props.onClose();
                } }/>
            </View>
        </KeyboardAvoidingView>
        </ImageBackground>
    )
}