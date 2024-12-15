import { useEffect, useState } from "react";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";

import { globalColor } from "@/styles/globalStyle";

import background from "../../assets/images/chatgame/background3.png";
import ChatInput from "@/components/ChatInput";
import ChatScreen from "@/components/ChatScreen";
import { callChatGPT } from "@/api/chatgpt";

export type ChatType = {
  role: string;
  content: string;
};

export default function ChatGamePage() {
  const [chatList, setChatList] = useState<ChatType[]>([]);

  const fetchData = async () => {
    try {
      const res = await callChatGPT(chatList); // GPT 질문 보내기
      const messageContent = res.data.choices[0].message.content; // GPT 답변

      const copy = [...chatList];
      copy.push({ role: "assistant", content: messageContent });
      setChatList(copy);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatList.length % 2 === 1) {
      // chatList 길이가 홀수 (즉 user가 메시지 보낸 상황이면)
      fetchData();
    }
  }, [chatList.length]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Background source={background} resizeMode="cover">
        <ChatInput chatList={chatList} setChatList={setChatList} />
        <Container>
          <Head />
          <ChatScreen chatList={chatList} />
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
