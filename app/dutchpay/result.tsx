import { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { characterImageArr, globalColor } from "@/styles/globalStyle";
import { useSearchParams } from "expo-router/build/hooks";

import heart_image from "../../assets/images/dutchpay/heart.png";
import money_image from "../../assets/images/dutchpay/money.png";
import thunderbolt_image from "../../assets/images/dutchpay/thunderbolt.png";

export default function DutchPayResultPage() {
  const search = useSearchParams();
  const people = Number(search.get("people")) || 0;
  const price = Number(search.get("price")) || 0;
  const cut = Number(search.get("cut")) || 0;

  const [sharingArr, setSharingArr] = useState<number[]>([]);
  const [leftoverData, setLeftoverData] = useState(0);

  const calculateSplitAmounts = (
    totalAmount: number,
    peopleCount: number,
    unit: number
  ) => {
    // 기본 분배 금액 계산
    const baseShare = Math.floor(totalAmount / peopleCount / unit) * unit;
    const remainingAmount = totalAmount - baseShare * peopleCount;

    // 잔여 금액을 단위로 나눠야 할 사람 수 계산
    const extraPeople = Math.floor(remainingAmount / unit);

    // 결과 배열 생성
    const amounts = Array(peopleCount).fill(baseShare);

    // 잔여 금액을 공평하게 분배
    for (let i = 0; i < extraPeople; i++) {
      amounts[i] += unit;
    }

    // 남은 금액 계산 (totalAmount - 분배된 금액 합계)
    const distributedTotal = amounts.reduce((sum, value) => sum + value, 0);
    const leftoverAmount = totalAmount - distributedTotal;

    return { amounts, leftoverAmount };
  };

  useEffect(() => {
    const { amounts, leftoverAmount } = calculateSplitAmounts(
      price,
      people,
      cut
    );
    setSharingArr(amounts);
    setLeftoverData(leftoverAmount);
  }, []);

  return (
    <Background
      source={require("../../assets/images/background.png")}
      resizeMode="cover"
    >
      <Container>
        <Head />
        <TitleText style={{ color: globalColor.white }}>
          더치페이 계산기
        </TitleText>

        <SubContainer>
          <InputContainer>
            <InputDataContainer>
              <Icon source={heart_image} />
              <SubTitleText style={{ color: globalColor.black }}>
                {people + "명"}
              </SubTitleText>
            </InputDataContainer>

            <InputDataContainer>
              <Icon source={thunderbolt_image} />
              <SubTitleText style={{ color: globalColor.black }}>
                {cut + "원 단위"}
              </SubTitleText>
            </InputDataContainer>
            <InputDataContainer>
              <Icon source={money_image} />
              <SubTitleText style={{ color: globalColor.black }}>
                {"₩" + price.toLocaleString()}
              </SubTitleText>
            </InputDataContainer>
          </InputContainer>

          <Line />

          <InfoContainer>
            <View>
              <DescText>배분 결과는 다음과 같습니다.</DescText>
              <DescText>나머지 금액은 {leftoverData}원 입니다.</DescText>
            </View>

            {sharingArr.map((elem, index) => {
              return (
                <InputDataContainer key={index}>
                  <Icon source={characterImageArr[index]} />
                  <SubTitleText>{elem + "원"}</SubTitleText>
                </InputDataContainer>
              );
            })}
          </InfoContainer>
        </SubContainer>
      </Container>
    </Background>
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

const InputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

const InputDataContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;

  width: 50%;
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
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
  font-family: "COOKIERUN-BOLD";
  font-size: 20px;
`;

const DescText = styled.Text`
  font-family: "COOKIERUN-BOLD";
  font-size: 16px;
`;
