import styled from "styled-components/native";
import { globalColor } from "@/styles/globalStyle";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import AssiMessage from "./AssiMessage";
import UserMessage from "./UserMessage";

const ChatScreen = () => {
  return (
    <Container>
      <GestureHandlerRootView>
        <ScrollView>
          <AssiMessage text="uguug" />
          <UserMessage text="wgdsg" />
          <AssiMessage text="uguug" />
          <UserMessage text="wgdsg" />
          <AssiMessage text="uguug" />
          <UserMessage text="wgdsg" />
          <AssiMessage text="uguug" />
          <UserMessage text="wgdsg" />
          <AssiMessage text="uguug" />
          <UserMessage text="wgdsg" />
        </ScrollView>
      </GestureHandlerRootView>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.View`
  /* background-color: ${globalColor.darkBeige}; */
  border-width: 1px;
  border-color: ${globalColor.darkBeige};
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;