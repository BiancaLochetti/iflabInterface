// Imports
import { Text, View, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Componente Principal
const AcessLabCard = ({ name, email, acess, image }) => {
	return (
		<View
			style={{
				backgroundColor: "#eceaeaff",
				flexDirection: "row",
				padding: 20,
				gap: 20,
				borderRadius: 20,
				marginBottom: 20,
			}}
		>
			{/* Imagem */}
			<View>
				<Image
					source={image}
					style={{ width: 100, height: 100, borderRadius: 100 }}
				/>
			</View>

			{/* Informações */}
			<View style={{ flexDirection: "column", gap: 10 }}>
				{/* Nome */}
				<View>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 12,
						}}
					>
						Nome de usuário
					</Text>
					<Text> {name} </Text>
				</View>

				{/* Email */}
				<View>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 12,
						}}
					>
						Email de usuário
					</Text>
					<Text style={{ fontSize: 12 }}> {email} </Text>
				</View>

				<View>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 12,
						}}
					>
						Nível de acesso
					</Text>
					<Text> {acess} </Text>
				</View>
			</View>
		</View>
	);
};

export default AcessLabCard;

//----------------------------------------------------------------------------------------------

// Styles
const styles = EStyleSheet.create({
	card: {
		height: "9.375rem",
		width: "100%",
		borderRadius: "0.625rem",
		padding: "0.625rem",
	},

	header: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	content: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-end",
	},

	text: {
		color: colors.white_full,
		fontSize: "0.875rem",
		flexDirection: "row",
	},

	icon: {
		width: "1.375rem",
		height: "1.375rem",
		marginLeft: "0.625rem",
	},
});
