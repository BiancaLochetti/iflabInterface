import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import Button from "../buttons/Button";
import colors from "../../colors";

const BottomSheet = ({ modalizeRef, labInfo = {}, navigation }) => {
	// Evita navegação se não houver info do lab
	const handleNavigate = (stack, screen, extraParams = {}) => {
		if (!labInfo?.labId || !labInfo?.labName) return;

		navigation.navigate(stack, {
			screen,
			params: {
				labName: labInfo.labName,
				labId: labInfo.labId,
				...extraParams,
			},
		});
	};

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
				{labInfo?.labName && (
					<Text style={styles.title}>Laboratório: {labInfo.labName}</Text>
				)}

				<Button
					text="Sessões no laboratório"
					type="White"
					icon={require("../../assets/icons/UI/schedule.png")}
					onPress={() => handleNavigate("Elements", "Sessions")}
				/>

				<Button
					text="Elementos do laboratório"
					type="White"
					icon={require("../../assets/icons/UI/potion.png")}
					onPress={() =>
						navigation.navigate("Elements", {
							labName: labInfo.labName,
							labId: labInfo.labId,
						})
					}
				/>
				
				<Button
					text="Equipamentos do laboratório"
					type="White"
					icon={require("../../assets/icons/UI/equipment.png")}
				onPress={() =>
						navigation.navigate("Equipaments", {
							labName: labInfo.labName,
							labId: labInfo.labId,
						})	
					}
				/>

				<Button
					text="Gerenciar acessos do laboratório"
					type="White"
					icon={require("../../assets/icons/UI/access-management.png")}
					onPress={() => handleNavigate("AcessLab", "AcessMain")}
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
