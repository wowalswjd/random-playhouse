import { Dispatch, SetStateAction, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import btn_send from "../assets/images/chatgame/btn_send.png";
import btn_send_pink from "../assets/images/chatgame/btn_send_pink.png";
import { globalColor } from "@/styles/globalStyle";
import { ChatType } from "@/app/chatgame";

const ChatInput = ({
  chatList,
  setChatList,
}: {
  chatList: ChatType[];
  setChatList: Dispatch<SetStateAction<ChatType[]>>;
}) => {
  const maxChatLength = 50; // 최대 글자 수
  const [chatInput, setChatInput] = useState(""); // input 내용 state

  // input onChange 함수
  const handleChange = (text: string) => {
    setChatInput(text);
  };

  const handleSubmit = () => {
    const copy = [...chatList];
    copy.push({ role: "user", content: chatInput });
    setChatList(copy);
    setChatInput(""); // 채팅창 초기화
  };

  return (
    <Wrapper>
      <Input
        value={chatInput}
        returnKeyType="done"
        maxLength={maxChatLength}
        placeholder="ex) 오늘 저녁에 치킨을 먹을까 피자를 먹을까?"
        onChangeText={handleChange}
      />

      {chatInput.length > 0 ? (
        <TouchableOpacity onPress={handleSubmit}>
          <SendBtn source={btn_send_pink} />
        </TouchableOpacity>
      ) : (
        <SendBtn source={btn_send} />
      )}
    </Wrapper>
  );
};

export default ChatInput;

const Wrapper = styled.View`
  width: 100%;
  max-width: 700px;
  height: 48px;
  position: absolute;
  top: 0;

  background-color: ${globalColor.white};

  /* iOS Shadow */
  shadow-color: ${globalColor.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;

  /* Android Shadow */
  elevation: 2;
  padding: 8px 20px;

  flex-direction: row;
  gap: 8px;
`;

const Input = styled.TextInput`
  flex-grow: 1;
  border: none;
  outline: none;
`;

const SendBtn = styled.Image``;
