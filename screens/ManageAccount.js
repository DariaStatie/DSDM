import { Button, TextInput, Text, ImageBackground , KeyboardAvoidingView} from "react-native";
import React from "react";
import generalStyles from "../styles/generalStyles";
import { auth, database } from "../firebase";
import { signOut, updatePassword, deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";


export default function ManageAccount({ navigation }) {
    const background_log = require("../assets/background-log.jpg");

    let[newPassword, setNewPassword] = React.useState("");
    let[errorMessage, setErrorMessage] = React.useState("");
    let[currentPassword, setCurrentPassword] = React.useState("");

    let logout = () => {
        signOut(auth).then(() => {
            navigation.popToTop();
        });
    };

    let updateUserPassword = () => {
        signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                updatePassword(user, newPassword).then (() => {
                    setNewPassword("");
                    setErrorMessage("");
                    setCurrentPassword("");
            }).catch((error) => {
                setErrorMessage(error.message);
            });
        })
         .catch((error) => {
            setErrorMessage(error.message);
        });
    };

    let deleteAccount = () => {
        if(currentPassword === ""){
            setErrorMessage("Must enter current password to delete account.");
        } else {
            signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                let batch = writeBatch(database);
                const q = query(collection(database, "notes"), where("userId", "==", user.uid));
                getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        batch.delete(doc.ref);
                     });
                     batch.commit();
                         
                     deleteUser(user).then(() => {
                         navigation.popToTop();
                     }).catch((error) => {
                         setErrorMessage(error.message);
                     });
                });
                
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        }
    };

    return (
        <ImageBackground style={generalStyles.container} source={background_log}>
            <KeyboardAvoidingView style={generalStyles.backgroundCover} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={40}>
                <Text style={[generalStyles.lightText, generalStyles.header]}>Manager Account</Text>
                <Text style={generalStyles.errorMessage}>{errorMessage}</Text>
                <TextInput style={[generalStyles.textInput, generalStyles.lightTextInput, generalStyles.lightText]} placeholder='Current Password' placeholderTextColor="#BEBEBE" value={currentPassword} secureTextEntry={true} onChangeText={setCurrentPassword} />
                <TextInput style={[generalStyles.textInput, generalStyles.lightTextInput, generalStyles.lightText]} placeholder='New Password' placeholderTextColor="#BEBEBE" value={newPassword} secureTextEntry={true} onChangeText={setNewPassword} />
                <Button title="Update Password" onPress={updateUserPassword} color="#098778"/>
                <Button title="Delete Account" onPress={deleteAccount} color="#098778"/>
                <Button title="Logout" onPress={logout} color="#098778"/>
                <Button title="Back to Notes" onPress={() => navigation.pop()} color="#098778" />
            </KeyboardAvoidingView>
        </ImageBackground>
    );

}