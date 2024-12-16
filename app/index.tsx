import { router } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="dutch-pay" onPress={() => router.navigate("/dutchpay")} />
      <Button title="ghost-leg" onPress={() => router.navigate("/ghostleg")} />
      <Button title="chat-game" onPress={() => router.navigate("/chatgame")} />

      {/* 앱 설명 페이지 */}
    </View>
  );
}
