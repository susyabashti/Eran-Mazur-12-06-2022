import tw from "tailwind-styled-components";
import { SearchInput } from "@components/SearchInput/SearchInput";
import { CityWeather } from "@components/CityWeather/CityWeather";

export const Home = () => (
  <HomeContainer>
    <SearchInput />
    <CityWeather />
  </HomeContainer>
);

const HomeContainer = tw.div`
  container
  mx-auto
  grid
  gap-3
`;
