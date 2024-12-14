import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter, useSearchParams } from "expo-router/build/hooks";

import styled from "styled-components/native";

import background from "../../assets/images/ghostleg/background2.png";
import roof from "../../assets/images/ghostleg/roof.png";
import pinkbtn from "../../assets/images/pinkbtn.png";

import { globalColor } from "@/styles/globalStyle";

export default function GhostLegIndex2Page() {
  const search = useSearchParams();
  const people = Number(search.get("people")) || 2;
  const [cases, setCases] = useState(Array(people).fill("")); // people 수 만큼 case 생성

  const router = useRouter();

  // 입력값 변경 핸들러
  const handleInputChange = (value: string, index: number) => {
    const updatedCases = [...cases];
    updatedCases[index] = value;
    setCases(updatedCases);
  };

  // 입력된 값 확인 핸들러
  const handleSubmit = () => {
    // 각 case에 ""가 있으면 return
    if (cases.filter((elem) => elem === "").length) {
      alert("Case를 모두 입력해주세요.");
      return;
    }
    router.navigate({
      pathname: "/ghostleg/game",
      params: {
        case: cases,
      },
    });
    // 게임 페이지로 이동
  };

  return (
    <Background source={background} resizeMode="cover">
      <Roof source={roof} resizeMode="contain" />
      <Container>
        <TextContainer>
          <DescText>각 항목을 입력해주세요.</DescText>
          <Desc2Text>(7자 제한)</Desc2Text>
        </TextContainer>

        <InputContainer>
          {Array.from({ length: people }).map((_, index) => (
            <InputView key={index}>
              <DescText>{index + 1 + ")"}</DescText>
              <CaseInput
                placeholder={`Case ${index + 1}`}
                returnKeyType="done"
                value={cases[index]}
                maxLength={7}
                onChangeText={(value) => handleInputChange(value, index)}
              />
            </InputView>
          ))}
        </InputContainer>
      </Container>

      <TouchableOpacity onPress={handleSubmit}>
        <BtnContainer>
          <CompleteBtn source={pinkbtn} resizeMode="cover">
            <BtnText style={{ marginBottom: 8 }}>입력 완료</BtnText>
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

const InputContainer = styled.View`
  gap: 16px;
`;

const InputView = styled.View`
  flex-direction: row;
  align-items: center;
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

const CaseInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${globalColor.darkgrey};
  padding: 0 8px;

  font-size: 20px;
`;
