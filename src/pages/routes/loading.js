// Imports
import { useEffect, useRef, useState } from "react";
import {
	View,
	Animated,
	Easing,
	StyleSheet,
	Platform,
	Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../colors";

// Loader simples com 9 quadradinhos animados
function BanterLoader() {
	const anims = useRef(
		Array.from({ length: 9 }, () => new Animated.Value(0))
	).current;

	useEffect(() => {
		const createLoop = (anim, delay) =>
			Animated.loop(
				Animated.sequence([
					Animated.delay(delay),
					Animated.timing(anim, {
						toValue: 1,
						duration: 800,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: Platform.OS !== "web", // evita bug no RN Web
					}),
					Animated.timing(anim, {
						toValue: 0,
						duration: 800,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: Platform.OS !== "web",
					}),
				])
			);

		const loops = anims.map((anim, i) => createLoop(anim, i * 100));
		loops.forEach((loop) => loop.start());

		return () => loops.forEach((loop) => loop.stop());
	}, []);

	return (
		<View style={styles.loaderContainer}>
			{anims.map((anim, i) => {
				const scale = anim.interpolate({
					inputRange: [0, 1],
					outputRange: [1, 0.3],
				});

				const opacity = anim.interpolate({
					inputRange: [0, 1],
					outputRange: [1, 0.4],
				});

				return (
					<Animated.View
						key={i}
						style={[
							styles.box,
							{
								transform: [{ scale }],
								opacity,
							},
						]}
					/>
				);
			})}
		</View>
	);
}

// Texto animado com pontinhos
function AnimatedStatusText({ text }) {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [dots, setDots] = useState("");

	useEffect(() => {
		// Animação de fade infinito
		const loop = Animated.loop(
			Animated.sequence([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnim, {
					toValue: 0.5,
					duration: 800,
					useNativeDriver: true,
				}),
			])
		);
		loop.start();

		// Efeito de digitação dos "..."
		let count = 0;
		const interval = setInterval(() => {
			count = (count + 1) % 4; // alterna entre "", ".", "..", "..."
			setDots(".".repeat(count));
		}, 400);

		return () => {
			clearInterval(interval);
			loop.stop();
		};
	}, []);

	return (
		<Animated.Text style={[styles.statusText, { opacity: fadeAnim }]}>
			{text}
			{dots}
		</Animated.Text>
	);
}

// Tela principal de loading
export function Loading({ status_msg }) {
	return (
		<SafeAreaView style={styles.page}>
			<View style={styles.center}>
				<BanterLoader />
				<AnimatedStatusText text={status_msg} />
			</View>
		</SafeAreaView>
	);
}

// Estilos
const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: colors.white_full,
		justifyContent: "center",
		alignItems: "center",
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
	},
	loaderContainer: {
		width: 90,
		height: 90,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
	},
	box: {
		width: 24,
		height: 24,
		margin: 3,
		backgroundColor: colors.primary_green_light,
		borderRadius: 5,
	},
	statusText: {
		marginTop: 20,
		color: colors.primary_green_light,
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
});
