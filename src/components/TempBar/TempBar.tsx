import tw from "tailwind-styled-components";
import { Text } from "@components/Text/Text";
import { useAppSelector } from "@store/hooks/hooks";
import { selectMetricState } from "@store/selectors/selectors";
import { Temperature } from "@store/types/currentWeatherTypes";

interface TempBarProps {
  tempMinMax?: Temperature;
  tempAvg?: number;
}

export const TempBar = ({ tempMinMax, tempAvg }: TempBarProps) => {
  const isMetric = useAppSelector(selectMetricState);

  const minTemp = isMetric ? tempMinMax?.min : convertToF(tempMinMax?.min);
  const maxTemp = isMetric ? tempMinMax?.max : convertToF(tempMinMax?.max);
  const avgTemp = isMetric ? tempAvg : convertToF(tempAvg);
  const degreeType = isMetric ? "C" : "F";

  return (
    <TemperatureContainer>
      {tempMinMax && (
        <TempText
          text={`L: ${minTemp} °${degreeType} | H: ${maxTemp} °${degreeType}`}
        />
      )}
      {avgTemp && <TempText text={`${avgTemp} °${degreeType}`} />}
    </TemperatureContainer>
  );
};

const convertToF = (temp: number | undefined) => {
  if (!temp) return null;

  return (temp * 1.8 + 32).toFixed(1);
};

const TempText = tw(Text)`
  whitespace-nowrap
`;

const TemperatureContainer = tw.div``;
