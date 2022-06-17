import { StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16
    },


    noPadding: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "red"
    },

  backgroundCover: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    opacity: 0.7,
    padding: 16
  },

  lightText: {
    color: "#fff"
  },

  header: {
    fontSize: 20,
    alignSelf: "center"
  },

  notesHeader:{
    fontSize: 30,
    alignSelf: "center"
  },

  fillSpace: {
    flex: 1
  },

  leftMargin: {
    marginLeft: 16
  },

  rightMargin: {
    marginRight: 16
  },

  textInput: {
    alignSelf: 'stretch',
    padding: 8,
    borderBottomWidth: 2,
    marginVertical: 8
  },

  lightTextInput: {
    borderBottomColor: '#ffffff'
  },

  darkTextInput: {
    borderBottomColor: '#000000'
  },

  inlineButton: {
    color: "#6DC5C0"
  },

  pressedInlineButton: {
    color: "#41B49D",
    opacity: 0.6
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4
  },

  notesRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,
    marginRight: 17,
    marginLeft: 17
  },


  strech: {
    alignSelf:"stretch"
  },

  topMargin: {
    marginTop: 16
  },

  notesTopMargin: {
    marginTop: 240,
    marginLeft: 180
  },

  notesSpace:{
    marginBottom: 40
  },

  addNoteButton:{
    marginTop: 700
  },

  bottomMargin: {
    bottomMargin: 16
  },
  
  errorMessage: {
    color: "#ff0000"
  },

  notesContainer: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },

  rightAlign: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  }




  });
  
