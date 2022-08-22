import { createContext } from "react";

const NavBarContext = createContext({
  navBarSubreddit: "",
  setNavBarSubreddit: (subreddit: string) => {},
});

export default NavBarContext;
