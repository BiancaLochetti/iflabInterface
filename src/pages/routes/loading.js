// Imports
import { useEffect, useRef, useState } from "react";
import { View, Animated, Easing, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../colors";

// Loader com 9 quadradinhos animados e destaque sequencial (ida e volta)
function BanterLoader() {
	const anims = useRef(
		Array.from({ length: 9 }, () => new Animated.Value(0))
	).current;

	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const [direction, setDirection] = useState(1); // 1 = indo pra frente, -1 = voltando

	useEffect(() => {
		const ANIMATION_DURATION = 1600; // 800 up + 800 down

		// animações de escala/opacidade
		const createLoop = (anim, delay) =>
			Animated.loop(
				Animated.sequence([
					Animated.delay(delay),
					Animated.timing(anim, {
						toValue: 1,
						duration: 800,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: Platform.OS !== "web",
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

		// Destaque indo e voltando (sequencialmente)
		const colorInterval = setInterval(() => {
			setHighlightedIndex((prev) => {
				if (prev === 8 && direction === 1) {
					setDirection(-1);
					return 7;
				}
				if (prev === 0 && direction === -1) {
					setDirection(1);
					return 1;
				}
				return prev + direction;
			});
		}, ANIMATION_DURATION); // sincronizado com o ciclo completo

		return () => {
			loops.forEach((loop) => loop.stop());
			clearInterval(colorInterval);
		};
	}, [direction]);

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

				const backgroundColor =
					highlightedIndex === i
						? colors.alert_red_btns
						: colors.primary_green_light;

				return (
					<Animated.View
						key={i}
						style={[
							styles.box,
							{
								transform: [{ scale }],
								opacity,
								backgroundColor,
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

		let count = 0;
		const interval = setInterval(() => {
			count = (count + 1) % 4;
			setDots(".".repeat(count));
		}, 400);

		return () => {
			clearInterval(interval);
			loop.stop();
		};
	}, []);

	return (
		<Animated.Text style={[styles.statusText]}>
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
