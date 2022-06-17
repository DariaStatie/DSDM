import {View, Button, Text, SafeAreaView, Modal, ActivityIndicator, ImageBackground, KeyboardAvoidingView} from 'react-native';
import generalStyles from '../styles/generalStyles';
import { auth, database } from '../firebase';
import { signOut, sendEmailVerification } from 'firebase/auth';
import InlineButton from '../components/InlineButton';
import React, { useEffect } from 'react';
import AddNote from '../components/AddNote';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { FlatList } from 'react-native-gesture-handler';



export default function Note({navigation}){
    const background= require("../assets/background.jpg");

    let [modalVisible, setModalVisible] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(true);
    let [notes, setNotes] =React.useState([]);
    let [isRefreshing, setIsRefreshing] = React.useState(false);

    let loadNotesList = async () => {
        const q = query(collection(database, "notes"), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        let notes = [];
        querySnapshot.forEach((doc) => {
            let note = doc.data();
            note.id = doc.id;
            notes.push(note);
        });
        setNotes(notes);
        setIsLoading(false);
        setIsRefreshing(false);
    };

    if (isLoading){
        loadNotesList();
    };

    
    let checkNoteItem = (item, isChecked) => {
        const noteRef = doc(database, 'notes', item.id);
        setDoc(noteRef, { completed: isChecked }, { merge: true });
    };

    let deleteNote = async (noteId) => {
        await deleteDoc(doc(database, "notes", noteId));
        let updatedNotes = [...notes].filter((item) => item.id != noteId);
        setNotes(updatedNotes);
    };

    let renderNoteItem = ({item}) => {
        return (
            <View style={[generalStyles.rowContainer, generalStyles.rightMargin, generalStyles.leftMargin]}>
                <View style={generalStyles.fillSpace}>
                    <BouncyCheckbox isChecked={item.completed} size={15} fillColor="#098778" unfillColor='#FFFFFF' text={item.text} iconStyle={{borderColor: "#098778"}} textStyle={{fontFamily: "Times New Roman"}} onPress={(isChecked) => { checkNoteItem(item, isChecked)}}/>
                </View>
                <InlineButton text="Delete" color="#098778" onPress={() => deleteNote(item.id)} />         
            </View>
        );
    };

    let showNotesList = () => {
        return (
            <FlatList data={notes} refreshing={isRefreshing} onRefresh={() => {loadNotesList(); setIsRefreshing(true);}} renderItem={renderNoteItem} keyExtractor={item => item.id} />
        )
    };

    let showContent = () => {
        return (
        <View>
            {isLoading ? <ActivityIndicator size="large" /> : showNotesList() }
            <Button title="Add Note" onPress={() => setModalVisible(true)}  color="#098778"/>
        </View>
        );
    };

    let showSendVerificationEmail = () => {
        return (
            <View>
                <Text>Please verify your email to use Notes</Text>
                <Button title="Send Verification Email" onPress={() => {
                    sendEmailVerification(auth.currentUser)
                    navigation.navigate("Login")
                }} />
            </View>
        );
    };

    let addNote = async (note) => {
        let noteToSave = {
            text:note,
            completed:false,
            userId: auth.currentUser.uid
        };
        const docRef = await addDoc(collection(database, "notes"), noteToSave);

        noteToSave.id = docRef.id;

        let updateNotes = [...notes];
        updateNotes.push(noteToSave);

        setNotes(updateNotes);
    };
    
    // useEffect(() => {
    //     navigation.addListener('focus', () => {
    //         if (auth.currentUser.emailVerified) {

    //         }
    //     });
    // }, []);

    //console.log('safga:', auth.currentUser.emailVerified);
    return (
        <ImageBackground style={generalStyles.container} source={background}>
         <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={40}>
            <SafeAreaView >
                <View style={[generalStyles.notesRowContainer, generalStyles.rightAlign, generalStyles.notesTopMargin]}>
                    <InlineButton text="Manage Account" color="#098778" onPress={() => navigation.navigate("ManageAccount")} />
                </View>
                
                <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <AddNote onClose={() => setModalVisible(false)} addNote={addNote}/>
                </Modal>

                <Text style={[generalStyles.notesHeader, generalStyles.notesSpace]}> Notes </Text>
                {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
            
            </SafeAreaView>
         </KeyboardAvoidingView>
        </ImageBackground>
        
    );

}