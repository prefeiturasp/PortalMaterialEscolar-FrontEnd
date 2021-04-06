import React from "react";
import Routes from "routing/config";
import "styles/style.scss";
import { CODE_GA } from "config";
import ReactGA from "react-ga";

ReactGA.initialize(`${CODE_GA}`);
ReactGA.pageview(window.location.pathname + window.location.search);

export const App = () => {
  return <Routes />;
};

export default App;
