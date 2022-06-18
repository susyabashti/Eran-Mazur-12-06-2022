import React from "react";
import tw from "tailwind-styled-components";
import { HiMenu } from "react-icons/hi";
import { Text } from "@components/Text/Text";
import RainbowLogo from "@assets/rainbow.png";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import {
  selectDarkModeState,
  selectMetricState,
} from "@store/selectors/selectors";
import { userActions } from "@store/slices/user";
import {
  TbTemperatureCelsius,
  TbTemperatureFahrenheit,
  TbSun,
  TbMoon,
} from "react-icons/tb";
import { NavItem } from "./NavItem";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isMetric = useAppSelector(selectMetricState);
  const isDark = useAppSelector(selectDarkModeState);
  const [settingsMenu, setSettingsMenu] = React.useState(false);

  const buttonToggleMetric = () => dispatch(userActions.toggleMetric());
  const buttonToggleDark = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    dispatch(userActions.toggleDark());
  };

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
        <NavButton onClick={openSettings}>
          <HiMenu />
        </NavButton>
        <AppName>
          <Logo src={RainbowLogo} />
          <TitleText text="Weather App" />
        </AppName>
        <SettingsButtons>
          <IconButton onClick={buttonToggleMetric}>
            {isMetric ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit />}
          </IconButton>
          <IconButton onClick={buttonToggleDark}>
            {isDark ? <TbMoon /> : <TbSun />}
          </IconButton>
        </SettingsButtons>
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
  dark:bg-zinc-900
  dark:text-white
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
  dark:md:border-r-zinc-800
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
  grid
  w-full
`;

const Logo = tw.img`
  w-14
  md:w-20
  mx-auto
`;

const TitleText = tw(Text)`
  mx-auto
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
  hover:scale-105
  active:scale-125
  transition
`;

const NavButton = tw(IconButton)`
  md:hidden
`;

const SettingsButtons = tw.div`
  grid
  gap-2
  md:grid-flow-col
  md:gap-5
  md:mb-10
  md:w-full
  md:justify-center
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
