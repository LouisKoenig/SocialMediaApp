import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "600"
    },
    test: {
        flex: 1
    },
    buttonContainer: {
        flexShrink: 1,
        padding: 10,
        borderRadius: 21,
        backgroundColor: "#4A0080",
        alignItems: 'center',
    },
    buttonContainerDisabled: {
        flexShrink: 1,
        padding: 10,
        borderRadius: 21,
        backgroundColor: 'grey',
        alignItems: 'center',
    },
    button: {
        fontSize: 20,
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
    }
});

export default Styles;
