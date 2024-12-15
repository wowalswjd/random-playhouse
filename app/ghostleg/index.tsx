import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import styled from "styled-components/native";

import background from "../../assets/images/ghostleg/background2.png";
import roof from "../../assets/images/ghostleg/roof.png";
import pinkbtn from "../../assets/images/pinkbtn.png";

import { globalColor } from "@/styles/globalStyle";

export default function GhostLegIndexPage() {
  const [people, setPeople] = useState(2);
  const handleMinusPress = () => {
    if (people <= 2) {
      alert("최소 인원 수는 2명입니다.");
      return;
    }
    setPeople(people - 1);
  };

  const handlePlusPress = () => {
    if (people >= 5) {
      alert("최대 인원 수는 5명입니다.");
      return;
    }
    setPeople(people + 1);
  };

  const router = useRouter();

  const handleSubmitPress = () => {
    router.navigate({
      pathname: "/ghostleg/index2",
      params: {
        people: people,
      },
    });
    // 두 번째 입력 페이지로 이동
  };

  return (
    <Background source={background} resizeMode="cover">
      <Roof source={roof} resizeMode="contain" />
      <Container>
        <TextContainer>
          <DescText>인원 수를 입력해주세요.</DescText>
          <Desc2Text>(최소 2명, 최대 5명)</Desc2Text>
        </TextContainer>

        <CountContainer>
          <RoundBtn onPress={handleMinusPress}>
            <BtnText style={{ marginTop: -2 }}>-</BtnText>
          </RoundBtn>
          <SubTitleText>{people}</SubTitleText>
          <RoundBtn onPress={handlePlusPress}>
            <BtnText style={{ marginTop: -2 }}>+</BtnText>
          </RoundBtn>
        </CountContainer>
      </Container>

      <TouchableOpacity onPress={handleSubmitPress}>
        <BtnContainer>
          <CompleteBtn source={pinkbtn} resizeMode="cover">
            <BtnText style={{ marginBottom: 8 }}>다음으로</BtnText>
          </CompleteBtn>
        </BtnContainer>
      </TouchableOpacity>
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

const Roof = styled.Image`
  width: 90%;

  position: absolute;
  top: 0;
  margin-top: 10%;
  z-index: 10;
`;

const Container = styled.View`
  width: 80%;
  height: 70%;
  background-color: ${globalColor.beige};
  border-radius: 30px;

  border: 1.5px solid ${globalColor.darkBeige};
  padding: 0 12px;
  padding-bottom: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 16px;

  /* iOS Shadow */
  shadow-color: ${globalColor.black};
  shadow-offset: 5px 5px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;

  /* Android Shadow */
  elevation: 10;
`;

const TextContainer = styled.View`
  align-items: center;
  text-align: center;
`;

const CountContainer = styled.View`
  align-items: center;
  flex-direction: row;

  gap: 16px;
`;

const BtnContainer = styled.View`
  width: 40%;
  aspect-ratio: 3.5;
`;

const CompleteBtn = styled.ImageBackground`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoundBtn = styled.TouchableOpacity`
  width: 30px;
  height: 30px;

  border: 2px solid ${globalColor.beige};
  border-radius: 50%;

  justify-content: center;
  align-items: center;

  background-color: ${globalColor.pink};
`;

const SubTitleText = styled.Text`
  font-family: "COOKIERUN-BOLD";
  font-size: 28px;
`;

const DescText = styled.Text`
  font-family: "PRETENDARD-MEDIUM";
  font-size: 20px;
`;

const Desc2Text = styled.Text`
  font-family: "PRETENDARD-MEDIUM";
  font-size: 16px;
`;

const BtnText = styled.Text`
  font-family: "COOKIERUN-BOLD";
  color: ${globalColor.white};
  font-size: 24px;
`;
