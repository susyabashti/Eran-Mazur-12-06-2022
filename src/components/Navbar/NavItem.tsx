import { NavLink, useLocation } from "react-router-dom";
import tw from "tailwind-styled-components";

interface NavItemProps {
  toPath: string;
  name: string;
}

export const NavItem = ({ toPath, name }: NavItemProps) => {
  const location = useLocation();

  return (
    <NavRoute
      $isActive={location.pathname === toPath ? true : false}
      to={toPath}
    >
      {name}
    </NavRoute>
  );
};

const NavRoute = tw(NavLink)`
  ${(p: { $isActive: boolean }) =>
    p.$isActive ? "bg-gradient-to-r text-white" : "bg-gray-100 text-black"}
  w-1/2
  h-20
  flex
  justify-center
  items-center
  mx-auto
  rounded-xl
  text-center
  text-xl
  font-semibold
  hover:bg-gradient-to-r
  from-purple-700
  to-pink-500
  hover:text-white
  md:w-full
  md:rounded-3xl
  md:text-left
  md:pl-5
  md:justify-start
  dark:bg-zinc-800
  dark:text-white
`;
