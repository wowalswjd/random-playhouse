import { Dispatch, SetStateAction } from "react";
import { characterImageArr, globalColor } from "@/styles/globalStyle";

import { Modal, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface GhostLegModalProps {
  cases: string[] | undefined;
  gameResult: number[];
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const GhostLegModal = ({
  cases,
  gameResult,
  modalVisible,
  setModalVisible,
}: GhostLegModalProps) => {

  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
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
  );
};

export default GhostLegModal;

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

const SubTitleText = styled.Text`
  font-family: "COOKIERUN-BOLD";
  font-size: 24px;
`;

const DescText = styled.Text`
  font-family: "PRETENDARD-MEDIUM";
  font-size: 20px;
`;
