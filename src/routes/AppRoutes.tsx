import { Route, Routes } from "react-router-dom";
import { Navbar } from "@components/Navbar/Navbar";
import { NotificationMessage } from "@components/NotificationMessage/NotificationMessage";
import { Favorites } from "./Favorites/Favorites";
import { Home } from "@routes/Home/Home";
import { NotFound } from "@routes/NotFound/NotFound";
import tw from "tailwind-styled-components";

export const AppRoutes = () => (
  <AppContainer>
    <Navbar />
    <RoutesContainer>
      <NotificationMessage />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageContainer>
    </RoutesContainer>
  </AppContainer>
);

const AppContainer = tw.div`
  bg-white
  dark:bg-zinc-900
  grid
  content-start
  min-h-screen
  md:flex
  md:flex-row
`;

const RoutesContainer = tw.div`
  w-full
`;

const PageContainer = tw.div`
  md:mt-20
  p-5
`;
