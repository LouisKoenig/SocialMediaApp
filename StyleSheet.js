import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "600"
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "600"
    },
    buttonSizes:{
        small: {
            padding: 10,
            borderRadius: 25,
        },
        medium: {
            padding: 10,
            borderRadius: 25,
        },
        iconpreview:{
            flexShrink: 1,
            padding: 5,
            borderRadius: 21,
            backgroundColor: "#4A0080",
            alignItems: 'center',
            alignSelf: 'flex-end',
            marginRight: 5,
            marginTop: 5,
        },
        iconmedium:{
            padding: 10,
            borderRadius: 25,
            marginRight: 7
        },
        dialog: {
            padding: 10,
            borderRadius: 25,
            marginLeft: 7
        }
    },
    textSizes:{
        small: {
            fontSize: 20,
        },
        medium: {
            fontSize: 25,
        },
        iconpreview:{
            fontSize: 15,
        },
        iconmedium: {
            fontSize: 25,
        },
        dialog: {
            fontSize: 18,
        }
    },
    buttonContainer: {
        backgroundColor: "#4A0080",
        alignItems: 'center',
    },
    disabled: {
        backgroundColor: 'grey',
    },
    button: {
        color: "white"
    },
    field: {
        marginTop: 20,
    },
    inputHint: {
        paddingBottom: 5
    },
    input: {
        fontSize: 18,
        height: 45,
        padding: 10,
        borderRadius: 3,
        backgroundColor: "white",

    },
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 20,
        paddingHorizontal: 20
    },
    itemRow: {
        flexDirection: "row"
    }
});

export default Styles;
