import React from 'react';
import {Text, Pressable} from 'react-native';
import Styles from '../../StyleSheet';

const UIButton = (props) => {

    return (
        <Pressable style={[Styles.buttonContainer]}
                          onPress={() => props.onClick()}>
            <Text style={[Styles.button]}>{props.children}</Text>
        </Pressable>

    );
}

export default UIButton;
