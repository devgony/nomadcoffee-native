import React from "react";
import { ActivityIndicator, GestureResponderEvent } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const Button = styled.TouchableOpacity<{ width: string }>`
  background-color: ${colors.orange};
  padding: 15px 10px;
  border-radius: 3px;
  width: ${props => props.width};
  opacity: ${props => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  text: string;
  loading?: boolean;
  width?: string;
};

export default function AuthButton({
  onPress,
  disabled,
  text,
  loading,
  width = "100%",
}: Props) {
  return (
    <Button disabled={disabled} onPress={onPress} width={width}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
