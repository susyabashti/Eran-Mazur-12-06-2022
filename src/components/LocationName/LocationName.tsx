import tw from "tailwind-styled-components";
import { Text } from "@components/Text/Text";
import { MdLocationPin } from "react-icons/md";

interface LocationNameProps {
  name: string;
}

export const LocationName = ({ name }: LocationNameProps) => (
  <LocationNameText text={name} iconLeft={LocationIcon} />
);

const LocationIcon = tw(MdLocationPin)`
  text-red-500
  inline
`;

const LocationNameText = tw(Text)`
  text-2xl
  font-bold
`;
