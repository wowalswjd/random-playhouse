import { useState } from "react";
import { Button, Text, TouchableOpacity } from "react-native";

import styled from "styled-components/native";

import background from "../../assets/images/ghostleg/background2.png";
import roof from "../../assets/images/ghostleg/roof.png";
import pinkbtn from "../../assets/images/pinkbtn.png";

import { characterImageArr, globalColor } from "@/styles/globalStyle";
import { useSearchParams } from "expo-router/build/hooks";
import GhostLegSvg from "@/components/GhostLegSvg";
import { Modal } from "react-native";

export default function GhostLegGamePage() {
  const search = useSearchParams();
  const cases = search.get("case")?.split(","); // 두 번째 입력 페이지의 case 배열

  const [buttonPressed, setButtonPressed] = useState(false);
  const [gameResult, setGameResult] = useState<number[]>([]); // 각 아이콘에 맞는 case 결과

  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 관리

  const handlePress = () => {
    setButtonPressed(true);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <Background source={background} resizeMode="cover">
      <Roof source={roof} resizeMode="contain" />
      <Container>
        {cases && (
          <GhostLegSvg
            cases={cases}
            buttonPressed={buttonPressed}
            setGameResult={setGameResult}
          />
        )}
        {buttonPressed && (
          <TouchableOpacity onPress={handleModalOpen}>
            <TextBtn>
              <Text>{"결과 확인 > "}</Text>
            </TextBtn>
          </TouchableOpacity>
        )}
      </Container>

      {!buttonPressed && (
        <TouchableOpacity onPress={handlePress}>
          <BtnContainer>
            <CompleteBtn source={pinkbtn} resizeMode="cover">
              <BtnText style={{ marginBottom: 8 }}>시작하기</BtnText>
            </CompleteBtn>
          </BtnContainer>
        </TouchableOpacity>
      )}

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <ModalOverlay>
          <ModalContainer>
            <SubTitleText>결과</SubTitleText>
            {cases &&
              gameResult.map((result, index) => {
                return (
                  <ResultView key={index}>
                    <ResultImage source={characterImageArr[index]} />
                    <DescText>{cases[result]}</DescText>
                  </ResultView>
                );
              })}
            <TouchableOpacity onPress={handleModalClose}>
              <ModalButton>
                <Text style={{ color: globalColor.white }}>닫기</Text>
              </ModalButton>
            </TouchableOpacity>
          </ModalContainer>
        </ModalOverlay>
      </Modal>
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

  gap: 8px;

  /* iOS Shadow */
  shadow-color: ${globalColor.black};
  shadow-offset: 5px 5px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;

  /* Android Shadow */
  elevation: 10;
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

const TextBtn = styled.Text`
  margin-top: 40px;
  font-size: 20px;
  font-family: "COOKIERUN-BOLD";
  text-decoration: underline;

  color: ${globalColor.darkgrey};
  justify-self: flex-end;
`;

const BtnText = styled.Text`
  font-family: "COOKIERUN-BOLD";
  color: ${globalColor.white};
  font-size: 24px;
`;

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  width: 80%;
  padding: 20px;
  background-color: ${globalColor.white};
  border-radius: 10px;

  align-items: center;
  shadow-color: ${globalColor.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;

  elevation: 5;
`;

const ModalButton = styled.View`
  margin-top: 20px;
  background-color: ${globalColor.pink};
  padding: 10px 20px;
  border-radius: 5px;
`;

const SubTitleText = styled.Text`
  font-family: "COOKIERUN-BOLD";
  font-size: 24px;
`;

const DescText = styled.Text`
  font-family: "PRETENDARD-MEDIUM";
  font-size: 20px;
`;

const ResultView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;

  margin-top: 8px;
`;

const ResultImage = styled.Image`
  width: 40px;
  height: 40px;
`;
