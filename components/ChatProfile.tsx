import { globalColor } from "@/styles/globalStyle";
import styled from "styled-components/native";

import chatgpt from "../assets/images/chatgame/chatgpt_icon.png";

const ChatProfile = () => {
  const currentDate = new Date();

  // 각 구성 요소 가져오기
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  return (
    <Wrapper>
      <ProfileImage source={chatgpt} />
      <ProfileText>지피티</ProfileText>
      <ProfileText>
        {month}/{day} {hours}:{String(minutes).padStart(2, "0")}
      </ProfileText>
    </Wrapper>
  );
};

export default ChatProfile;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ProfileImage = styled.Image`
  width: 28px;
  height: 28px;
`;

const ProfileText = styled.Text`
  font-family: "PRETENDARD-SEMIBOLD";
  font-size: 12px;
  color: ${globalColor.darkgrey};
`;
