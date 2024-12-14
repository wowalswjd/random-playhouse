import { useState } from "react";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
import styled from "styled-components/native";

import { globalColor } from "@/styles/globalStyle";
import SelectBtn from "@/components/SelectBtn";

import background from "../../assets/images/background.png";
import pinkbtn from "../../assets/images/pinkbtn.png";

export default function DutchPayPage() {
  const [people, setPeople] = useState(2); // 인원 수
  const [price, setPrice] = useState(0); // 지불할 가격
  const [cut, setCut] = useState(10); // 절사 단위 선택
  const unit = [10, 100, 1000, 10000]; // 절사 단위
  const [btnState, setBtnState] = useState([true, false, false, false]); // 버튼 상태

  const router = useRouter();

  const handleMinusPress = () => {
    if (people <= 2) {
      alert("최소 인원 수는 2명입니다.");
      return;
    }
    setPeople(people - 1);
  };

  const handlePlusPress = () => {
    if (people >= 6) {
      alert("최대 인원 수는 6명입니다.");
      return;
    }
    setPeople(people + 1);
  };

  const handlePriceChange = (text: string) => {
    // 숫자로 변환 가능한 경우만 업데이트
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      setPrice(numericValue);
    }
  };

  const handleSelectPress = (cut: number, index: number) => {
    // 해당되는 index만 true로 설정
    setBtnState((prevState) => prevState.map((_, i) => i === index));
    // 절사 단위 저장
    setCut(cut);
  };

  const handleSubmitPress = () => {
    // price가 0이거나 숫자가 아닌 경우 alert 후 return
    if (!price || isNaN(price)) {
      alert("정확한 금액을 입력해주세요.");
      return;
    }
    if (price <= 10) {
      alert("10원 이상의 금액을 입력해주세요.");
      return;
    }
    router.navigate({
      pathname: "/dutchpay/result",
      params: {
        people: people,
        price: price,
        cut: cut,
      },
    });
    // 결과 페이지로 이동
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Background source={background} resizeMode="cover">
        <Container>
          <Head />
          <TitleText style={{ color: globalColor.white }}>
            더치페이 계산기
          </TitleText>

          <SubContainer>
            <SubTitleText style={{ color: globalColor.black }}>
              정보 입력
            </SubTitleText>
            <Line />

            <InfoContainer>
              <Category>
                <DescText>1) 인원 수 (최소 2명, 최대 6명)</DescText>
                <CountContainer>
                  <RoundBtn onPress={handleMinusPress}>
                    <BtnText style={{ marginTop: -4 }}>-</BtnText>
                  </RoundBtn>
                  <SubTitleText>{people}</SubTitleText>
                  <RoundBtn onPress={handlePlusPress}>
                    <BtnText style={{ marginTop: -4 }}>+</BtnText>
                  </RoundBtn>
                </CountContainer>
              </Category>

              <Category>
                <DescText>2) 지불할 금액</DescText>
                <InputContainer>
                  <SubTitleText>￦</SubTitleText>
                  <PriceInput
                    keyboardType="numeric"
                    placeholder="ex) 12000"
                    returnKeyType="done"
                    value={price.toString()}
                    onChangeText={handlePriceChange}
                  />
                </InputContainer>
              </Category>

              <Category>
                <DescText>3) 절사 단위</DescText>
                <SelectContainer>
                  {unit.map((elem, index) => {
                    return (
                      <SelectBtn
                        btnState={btnState[index]}
                        name={elem + "원"}
                        handlePress={() => handleSelectPress(elem, index)}
                        key={index}
                      />
                    );
                  })}
                </SelectContainer>
              </Category>
            </InfoContainer>
          </SubContainer>
        </Container>

        <TouchableOpacity onPress={handleSubmitPress}>
          <BtnContainer>
            <CompleteBtn source={pinkbtn} resizeMode="cover">
              <BtnText style={{ marginBottom: 8 }}>입력 완료</BtnText>
            </CompleteBtn>
          </BtnContainer>
        </TouchableOpacity>
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
  background-color: ${globalColor.pink};
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

const SubContainer = styled.View`
  width: 100%;
  height: 84%;
  border-radius: 20px;
  padding: 16px;
  background-color: ${globalColor.beige};

  align-items: center;
`;

const Category = styled.View`
  gap: 8px;
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  margin: 12px 0;
  background-color: ${globalColor.darkgrey};
`;

const InfoContainer = styled.View`
  width: 100%;
  gap: 16px;
`;

const TitleText = styled.Text`
  font-family: "COOKIERUN-BOLD";
  font-size: 24px;
`;

const SubTitleText = styled.Text`
  font-family: "PRETENDARD-SEMIBOLD";
  font-size: 20px;
`;

const DescText = styled.Text`
  font-family: "PRETENDARD-MEDIUM";
  font-size: 16px;
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

const BtnText = styled.Text`
  font-family: "COOKIERUN-BOLD";
  color: ${globalColor.white};
  font-size: 20px;
`;

const RoundBtn = styled.TouchableOpacity`
  width: 20px;
  height: 20px;

  border: 2px solid ${globalColor.beige};
  border-radius: 50%;

  justify-content: center;
  align-items: center;

  background-color: ${globalColor.pink};
`;

const InputContainer = styled.View`
  flex-direction: row;
`;

const PriceInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${globalColor.darkgrey};
  padding: 0 8px;

  font-size: 20px;
`;

const SelectContainer = styled.View`
  align-items: flex-start;
  gap: 8px;
`;
