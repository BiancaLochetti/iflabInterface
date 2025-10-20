import { View, Text, Image, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import Button from "../buttons/Button";
import colors from "../../colors";

const BottomSheet = ({ modalizeRef, labInfo, navigation }) => {
	return (
		<Modalize
			ref={modalizeRef}
			snapPoint={450}
			modalHeight={480}
			withHandle={false}
			HeaderComponent={
				<View style={styles.grabber}>
					<Image
						source={require("../../assets/icons/UI/drag-horizontal.png")}
						style={{ tintColor: colors.primary_green_dark }}
						resizeMode="contain"
					/>
				</View>
			}
		>
			<View style={styles.container}>
				{labInfo && (
					<>
						<Text style={styles.title}>Laboratório: {labInfo.labName}</Text>
					</>
				)}

				<Button
					text="Sessões no laboratório"
					type="White"
					icon={require("../../assets/icons/UI/schedule.png")}
				/>
				<Button
					text="Elementos do laboratório"
					type="White"
					icon={require("../../assets/icons/UI/potion.png")}
					onPress={() =>
						navigation.navigate("Elements", {
							screen: "Inventory",
							params: { labName: labInfo.labName },
						})
					}
				/>
				<Button
					text="Equipamentos do laboratório"
					type="White"
					icon={require("../../assets/icons/UI/equipment.png")}
					onPress={() =>
						navigation.navigate("Equipaments", {
							screen: "EquipmentInventory",
							params: { labName: labInfo.labName },
						})
					}
				/>
				<Button
					text="Gerenciar acessos do laboratório"
					type="White"
					icon={require("../../assets/icons/UI/access-management.png")}
					onPress={() =>
						navigation.navigate("AcessLab", {
							params: { labName: labInfo.labName },
						})
					}
				/>
				<Button
					text="Gerar relatório do laboratório"
					type="White"
					icon={require("../../assets/icons/UI/access-relatory.png")}
				/>
			</View>
		</Modalize>
	);
};

export default BottomSheet;

const styles = StyleSheet.create({
	grabber: {
		alignItems: "center",
		paddingBottom: 20,
	},

	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: colors.primary_green_dark,
	},

	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		flexDirection: "column",
		backgroundColor: colors.white_full,
		paddingHorizontal: 20,
		gap: 10,
	},
});
