import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"

/*
	Делает встроенный экран-заставку (настроенный в app.json) видимым до тех пор, пока не будет
	вызван метод hideAsync. Рекомендуется вызывать это в глобальной области без ожидания,
	а не внутри компонентов или хуков React, потому что в противном случае это может
	быть вызвано слишком поздно, когда заставка уже скрыта.
*/
// SplashScreen.preventAutoHideAsync(); //todo разобраться почему SplashScreen всегда активен

export default Layout = () => {
	//Подключение кастомных шрифтов
	const [fontsLoaded] = useFonts({
		"DMSans-Bold": require("../assets/fonts/DMSans-Bold.ttf"),
		"DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
		"DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			//Скрываем SplashScreen, если шрифты загружены или ошибка
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return <Stack onLayout={onLayoutRootView} />

}