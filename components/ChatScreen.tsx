import styled from "styled-components/native";
import { globalColor } from "@/styles/globalStyle";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import AssiMessage from "./AssiMessage";
import UserMessage from "./UserMessage";
import { useEffect, useRef } from "react";
import { ChatType } from "@/app/chatgame";

const ChatScreen = ({ chatList }: { chatList: ChatType[] }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // 컴포넌트가 렌더링되면 맨 아래로 스크롤
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatList.length]);

  return (
    <Container>
      <GestureHandlerRootView>
        <ScrollView ref={scrollViewRef}>
          <AssiMessage
            text={`안녕하세요. 저는 지피티입니다. ${"\n"}고민이 있으신가요?${"\n"}당신의 선택을 도와드릴게요!`}
          />
          {chatList.map((message, index) => {
            return message.role === "user" ? (
              <UserMessage key={index} text={message.content} />
            ) : (
              <AssiMessage key={index} text={message.content} />
            );
          })}
        </ScrollView>
      </GestureHandlerRootView>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.View`
  /* background-color: ${globalColor.darkBeige}; */
  border-width: 1px;
  border-color: ${globalColor.darkBeige};
  border-radius: 10px;
  width: 100%;
  height: 96%;

`;
