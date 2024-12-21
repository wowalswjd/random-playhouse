import { router } from "expo-router";
import { Button, View } from "react-native";

import background from "../assets/images/background.png";
import styled from "styled-components/native";

export default function Index() {
  return (
    <Background source={background} resizeMode="cover">
      <Button title="더치페이 계산기" onPress={() => router.navigate("/dutchpay")} />
      <Button title="사다리타기 게임" onPress={() => router.navigate("/ghostleg")} />
      <Button title="GPT 의사결정 도우미" onPress={() => router.navigate("/chatgame")} />
    </Background>
  );
}

const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;

  flex: 1;
  justify-content: center;
  align-items: center;

  gap: 16px;
`;