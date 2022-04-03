import React from 'react';
import {Pressable} from 'react-native';
import Styles from '../../StyleSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface UIIconButtonProps
{
    icon: string,
    style?: string,
    size: string,
    disabled: boolean,
    onClick: event
}

const UIIconButton = (props: UIIconButtonProps) => {

    return (
        <Pressable style={[props.style, Styles.iconButtonContainer]}
                   onPress={() => props.onClick()}
                   disabled={props.disabled}>
            <MaterialCommunityIcons name={props.icon} size={props.size} color={props.disabled ? "gray" : "#4A0080"}/>
        </Pressable>

    );
}

export default UIIconButton;
