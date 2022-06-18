import React from "react";
import tw from "tailwind-styled-components";
import { IconType } from "react-icons";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  text: string;
  iconRight?: IconType;
  iconLeft?: IconType;
}

export const Text = ({ text, iconRight, iconLeft, ...props }: Props) => {
  return (
    <TextContainer {...props}>
      {iconLeft && React.createElement(iconLeft)}
      {text}
      {iconRight && React.createElement(iconRight)}
    </TextContainer>
  );
};

const TextContainer = tw.div``;
