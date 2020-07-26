import React from "react";
import { Dashboard, DashboardMenu, DashboardButton } from '../../components'

const Home = () => (
  <Dashboard>
    <DashboardMenu title="Memory Game">
      <DashboardButton route="/game">Start Game</DashboardButton>
    </DashboardMenu>
  </Dashboard>
);

export default Home;
