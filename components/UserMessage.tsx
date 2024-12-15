import { globalColor } from "@/styles/globalStyle";
import styled from "styled-components/native";

const UserMessage = ({ text }: { text: string }) => {
  return (
    <UserMessageBox>
      <UserBubble>
        <ChatText>{text}</ChatText>
      </UserBubble>
    </UserMessageBox>
  );
};

export default UserMessage;

const UserMessageBox = styled.View`
  gap: 8px;
  margin-top: 24px;
  width: 100%;

  align-items: flex-end;
`;

// 말풍선
const Bubble = styled.View`
  box-sizing: border-box;
  max-width: 200px;
  padding: 8px 12px;

  border-radius: 8px;

  word-break: keep-all;
  overflow-wrap: break-word;
`;

const UserBubble = styled(Bubble)`
  background: ${globalColor.lightPink};
`;

const ChatText = styled.Text`
  font-size: 16px;
  color: ${globalColor.darkgrey};
  flex-wrap: wrap;
`;
