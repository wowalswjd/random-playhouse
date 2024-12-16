import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  const [fontsLoaded, setfontsLoaded] = useState(false);

  async function loadFonts() {
    await SplashScreen.preventAutoHideAsync();
    try {
      await Font.loadAsync({
        "COOKIERUN-BOLD": require("../assets/fonts/CookieRun-Bold.ttf"),
        "PRETENDARD-BOLD": require("../assets/fonts/Pretendard-Bold.ttf"),
        "PRETENDARD-SEMIBOLD": require("../assets/fonts/Pretendard-SemiBold.ttf"),
        "PRETENDARD-MEDIUM": require("../assets/fonts/Pretendard-Medium.ttf"),
      });
      setfontsLoaded(true);
      await SplashScreen.hideAsync();
    } catch (error) {
      console.log("font error", error);
    }
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // 로딩 화면을 커스텀하려면 컴포넌트를 추가 가능
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="dutchpay/index"
        options={{ title: "더치페이 정보 입력" }}
      />
      <Stack.Screen
        name="dutchpay/result"
        options={{ title: "더치페이 계산기" }}
      />
      <Stack.Screen
        name="ghostleg/index"
        options={{ title: "사다리타기 정보 입력" }}
      />
      <Stack.Screen
        name="ghostleg/index2"
        options={{ title: "사다리타기 정보 입력" }}
      />
      <Stack.Screen
        name="ghostleg/game"
        options={{ title: "사다리타기 게임" }}
      />
      <Stack.Screen
        name="chatgame/index"
        options={{ title: "채팅 랜덤 게임" }}
      />
    </Stack>
  );
}
