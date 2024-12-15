import { useState } from "react";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";

import { globalColor } from "@/styles/globalStyle";

import background from "../../assets/images/chatgame/background3.png";
import ChatInput from "@/components/ChatInput";
import ChatScreen from "@/components/ChatScreen";

export default function ChatGamePage() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Background source={background} resizeMode="cover">
        <ChatInput />
        <Container>
          <Head />
          <ChatScreen />
        </Container>
      </Background>
    </KeyboardAvoidingView>
  );
}

const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;

  flex: 1;
  justify-content: center;
  align-items: center;

  gap: 5%;
`;

const Container = styled.View`
  width: 80%;
  height: 70%;
  background-color: ${globalColor.beige};
  border-radius: 30px;

  border: 3px solid ${globalColor.darkgrey};
  padding: 0 12px;
  padding-bottom: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  /* iOS Shadow */
  shadow-color: ${globalColor.black};
  shadow-offset: 5px 5px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;

  /* Android Shadow */
  elevation: 10;
`;

const Head = styled.View`
  width: 20%;
  height: 8px;
  background-color: ${globalColor.darkgrey};
  margin-bottom: 8px;
`;

