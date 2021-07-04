import React from "react";
import { ActivityIndicator, GestureResponderEvent } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const Button = styled.TouchableOpacity<{ width: string }>`
  padding: 15px 0;
  margin-left: 20px;
  border-radius: 3px;
  /* width: ${props => props.width}; */
  opacity: ${props => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: ${colors.orange};
  font-weight: 600;
  text-align: center;
  font-size: 20px;
`;

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  text: string;
  loading?: boolean;
  width?: string;
};

export default function SkeletonButton({
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
