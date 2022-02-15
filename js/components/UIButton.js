import React from 'react';
import {Text, Pressable} from 'react-native';
import Styles from '../../StyleSheet';

interface UIButtonProps
{
    size: string,
    disabled: boolean,
    onClick: event
}

const UIButton = (props: UIButtonProps) => {
    let size = Styles.buttonSizes[props?.size ?? "medium"];
    let textSize = Styles.textSizes[props?.size ?? "medium"];

    return (
        <Pressable style={[Styles.buttonContainer, size, props.disabled ? Styles.disabled : ""]}
                   onPress={() => props.onClick()}
                   disabled={props.disabled}>
            <Text style={[Styles.button, textSize]}>{props.children}</Text>
        </Pressable>

    );
}

export default UIButton;
