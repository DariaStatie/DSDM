import { Text, Pressable } from "react-native";
import generalStyles from "../styles/generalStyles";

export default function InlineButton(props) {
    let style = {};
    if(props.color){
        style.color = props.color
    };
    return(
        <Pressable onPress={props.onPress}>
            {({pressed}) =>(
                <Text style={[pressed ? generalStyles.pressedInlineButton : generalStyles.inlineButton , style]}>{props.text}</Text>
            )}
        </Pressable>
    )
}