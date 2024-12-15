import { globalColor } from "@/styles/globalStyle";
import styled from "styled-components/native";
import ChatProfile from "./ChatProfile";

const AssiMessage = ({ text }: { text: string }) => {
  return (
    <AssiMessageBox>
      <ChatProfile />
      <AssiBubble>
        <ChatText>{text}</ChatText>
      </AssiBubble>
    </AssiMessageBox>
  );
};

export default AssiMessage;

const AssiMessageBox = styled.View`
  gap: 8px;
  margin-top: 24px;
  width: 100%;

  align-items: flex-start;
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

const AssiBubble = styled(Bubble)`
  background-color: ${globalColor.lightGreen};

  display: flex;
  flex-direction: column;
  gap: 20px;

  white-space: pre-wrap;
`;

const ChatText = styled.Text`
  font-size: 16px;
  color: ${globalColor.darkgrey};
  flex-wrap: wrap;
`;
