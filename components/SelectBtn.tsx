import { globalColor } from "@/styles/globalStyle";
import styled from "styled-components/native";

const SelectBtn = ({
  btnState,
  name,
  handlePress,
}: {
  btnState: boolean;
  name: string;
  handlePress: () => void;
}) => {
  return (
    <BtnContainer state={btnState} onPress={handlePress}>
      <SelectText>{name}</SelectText>
    </BtnContainer>
  );
};

export default SelectBtn;

const BtnContainer = styled.TouchableOpacity<{ state: boolean }>`
  padding: 8px;
  border: 2px solid ${globalColor.beige};
  border-radius: 10px;
  background-color: ${(props) =>
    props.state ? globalColor.pink : globalColor.darkBeige};

  /* iOS Shadow */
  shadow-color: ${globalColor.darkgrey};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 1px;

  /* Android Shadow */
  elevation: 1;
`;

const SelectText = styled.Text`
  font-family: "PRETENDARD-SEMIBOLD";

  color: ${globalColor.white};
  font-size: 16px;
`;
