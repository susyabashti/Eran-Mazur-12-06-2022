import React from "react";
import tw from "tailwind-styled-components";
import { HiMenu } from "react-icons/hi";
import { Text } from "@components/Text/Text";
import RainbowLogo from "@assets/rainbow.png";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { selectMetricState } from "@store/selectors/selectors";
import { userActions } from "@store/slices/user";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { NavItem } from "./NavItem";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isMetric = useAppSelector(selectMetricState);
  const [settingsMenu, setSettingsMenu] = React.useState(false);

  const buttonToggleMetric = () => dispatch(userActions.toggleMetric());

  const closeSettings = React.useCallback(() => {
    if (!settingsMenu) return;

    document.body.classList.remove("overflow-hidden", "md:overflow-auto");
    setSettingsMenu(false);
  }, [settingsMenu, setSettingsMenu]);

  const openSettings = () => {
    document.body.classList.add("overflow-hidden", "md:overflow-auto");
    setSettingsMenu(true);
  };

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <IconButton onClick={openSettings}>
          <HiMenu />
        </IconButton>
        <AppName>
          <Logo src={RainbowLogo} />
          <TitleText text="Weather App" />
        </AppName>
        <IconButton onClick={buttonToggleMetric}>
          {isMetric ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit />}
        </IconButton>
        <NavMenuBlur $display={settingsMenu} onClick={closeSettings}>
          <NavList>
            <NavItem toPath="/" name="Home" />
            <NavItem toPath="/favorites" name="Favorites" />
          </NavList>
        </NavMenuBlur>
      </NavbarWrapper>
    </NavbarContainer>
  );
};

const NavbarContainer = tw.div`
  bg-white
  shadow-sm
  container-fluid
  md:w-96
  sticky
  top-0
  z-20
  py-2
  md:relative
  md:min-h-fit
  md:border-r
`;

const NavbarWrapper = tw.div`
  container
  px-5
  mx-auto
  flex
  items-center
  justify-between
  md:flex-col
  md:items-start
`;

const AppName = tw.div`
  md:mb-8
`;

const Logo = tw.img`
  w-14
  md:w-20
  mx-auto
`;

const TitleText = tw(Text)`
  text-3xl
  md:text-4xl
  font-bold
  whitespace-nowrap
  bg-clip-text
  text-transparent
  bg-gradient-to-r
  from-purple-700
  to-pink-500
`;

const IconButton = tw.button`
  text-4xl
  hover:text-pink-600
  hover:scale-110
  transition
  md:hidden
`;

const NavMenuBlur = tw.div`
  ${(p: { $display: boolean }) => (p.$display ? "grid" : "hidden")}
  fixed
  inset-0
  z-50
  grid-cols-1
  place-content-center
  backdrop-blur-sm
  backdrop-brightness-50
  md:block
  md:w-full
  md:relative
  md:backdrop-blur-none
  md:backdrop-brightness-100
`;

const NavList = tw.div`
  grid
  gap-5
`;
