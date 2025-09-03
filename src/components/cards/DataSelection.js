import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export function DataSelection() {
    return (
        <View style={styles.container}>
            <view>
                <text style={styles.titleFree}>Selecione a Data:</text>
            </view>
            <view style={styles.header}>
                <view style={styles.cardFree}>
                    <text>aaa</text>
                </view>
                <view style={styles.cardFree}>
                    <text>bbb</text>
                </view>
                <view style={styles.cardFree}>
                    <text>ccc</text>
                </view>
                <view style={styles.cardFree}>
                    <text>ddd</text>
                </view>
            </view>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
    },
    header:{
        height: "10%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: "1%",
        width: "100%",
        display: 'flex',
    },

    cardFree:{
        flex: 1,
        backgroundColor: "#EAEAEA",
        borderRadius: 10,
        padding: 10,
        margin: "1%",
        width: "100%",
    },

    titleFree: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
    },
});