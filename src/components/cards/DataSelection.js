// Imports
import { View, Text, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Dropdown from "../picker/Dropdown";
import { useState } from "react";
import colors from "../../colors";
//----------------------------------------------------------------------------------------------

// Componente Principal
export function DataSelection({ onChange }) {
	const year = Array.from({ length: 8 }, (_, i) => ({
		label: String(2025 - i),
		value: String(2025 - i),
	}));

	const month = [
		{ label: "Janeiro", value: "Janeiro" },
		{ label: "Fevereiro", value: "Fevereiro" },
		{ label: "Março", value: "Março" },
		{ label: "Abril", value: "Abril" },
		{ label: "Maio", value: "Maio" },
		{ label: "Junho", value: "Junho" },
		{ label: "Julho", value: "Julho" },
		{ label: "Agosto", value: "Agosto" },
		{ label: "Setembro", value: "Setembro" },
		{ label: "Outubro", value: "Outubro" },
		{ label: "Novembro", value: "Novembro" },
		{ label: "Dezembro", value: "Dezembro" },
	];

	const day = Array.from({ length: 31 }, (_, i) => ({
		label: String(i + 1),
		value: String(i + 1),
	}));

	const [value1, setValue1] = useState(null);
	const [value2, setValue2] = useState(null);
	const [value3, setValue3] = useState(null);

	const restoreDropdowns = () => {
		setValue1(null);
		setValue2(null);
		setValue3(null);
		if (typeof onChange === "function") onChange({ year: null, month: null, day: null });
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={[styles.cardFree, { zIndex: 1000, flex: 3, paddingHorizontal: "0.25rem" }]}>
					<Dropdown
						items={year}
						placeholder="Ano"
						value={value1}
						setValue={(v) => {
							setValue1(v);
							if (typeof onChange === "function") onChange({ year: v, month: value2, day: value3 });
						}}
						style={{ width: "100%" }}
						dropDownContainerStyle={{ width: "100%" }}
					/>
				</View>
				<View style={[styles.cardFree, { zIndex: 900, flex: 3, paddingHorizontal: "0.25rem" }]}>
					<Dropdown
						items={month}
						placeholder="Mês"
						value={value2}
						setValue={(v) => {
							setValue2(v);
							if (typeof onChange === "function") onChange({ year: value1, month: v, day: value3 });
						}}
						style={{ width: "100%" }}
						dropDownContainerStyle={{ width: "100%" }}
					/>
				</View>
				<View style={[styles.cardFree, { zIndex: 800, flex: 2, paddingHorizontal: "0.25rem" }]}>
					<Dropdown
						items={day}
						placeholder="Dia"
						value={value3}
						setValue={(v) => {
							setValue3(v);
							if (typeof onChange === "function") onChange({ year: value1, month: value2, day: v });
						}}
						style={{ width: "100%" }}
						dropDownContainerStyle={{ width: "100%" }}
					/>
				</View>
				<View style={[styles.cardFree, { flex: 1, paddingHorizontal: "0.25rem", minWidth: "10%" }]}>
					<TouchableOpacity onPress={restoreDropdowns} style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
						<View style={styles.ImageStyle}>
							<Image
								style={styles.deleteImage}
								resizeMode="contain"
								source={require("../../assets/icons/UI/delete.png")}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

//----------------------------------------------------------------------------------------------

// Styles
const styles = EStyleSheet.create({
	container: {
		flex: 1,
		padding: "0.625rem",
		paddingBottom: 0,
		justifyContent: "space-between",
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginVertical: "0.625rem",
		width: "100%",
		display: "flex",
	},

	cardFree: {
		borderRadius: "0.625rem",
		alignItems: "center",
		justifyContent: "center",
	},

	titleFree: {
		fontSize: "1.125rem",
		fontWeight: "normal",
		color: "black",
	},

	ImageStyle: {
		backgroundColor: colors.white_medium,
		borderRadius: "0.625rem",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		borderWidth: 0,
	},

	deleteImage: {
		width: "70%",
		height: "70%",
	},
});
