import React, { FC, useState, useEffect, useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.scss";
import Header from "./components/Header";
import ListPoll from "./pages/ListPolls";
import ViewPoll from "./pages/ViewPoll";
import CreatePoll from "./pages/CreatePoll";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

import { ActionTypes, Poll, State } from "./models/interfaces";
import { getAllPolls } from "./services/api";
import { AppContext } from "./services/AppContext";
import pollsReducer from "./services/pollsReducer";

const App: FC = () => {
  // Selected page
  const [selectedPage, setSelectedPage] = useState<string>("list-polls");

  // Get current url
  const getCurrentUrl: () => void = () => {
    const wholePath: string[] = window.location.href.split("/");
    const currentUrl = wholePath[wholePath.length - 1];
    if (currentUrl === "list-polls" || currentUrl === "create-poll") {
      setSelectedPage(currentUrl);
    } else {
      setSelectedPage("list-polls");
    }
  };

  // Get all polls
  const fetchPolls: () => Promise<void> = async () => {
    const polls: Poll[] = await getAllPolls();
    dispatch({
      type: "SET_POLLS",
      payload: {
        polls: polls.reverse(),
      },
    });
  };

  // UseEffect on init
  useEffect((): void => {
    fetchPolls();
    getCurrentUrl();
  }, []);

  // Initial reducer state
  const initialPollsState: State = {
    polls: [],
  };

  // Declare polls useReducer
  const [statePolls, dispatch] = useReducer<
    (state: State, action: ActionTypes) => State
  >(pollsReducer, initialPollsState);

  // Return JSX
  return (
    <Router>
      <AppContext.Provider
        value={{ selectedPage, setSelectedPage, statePolls, dispatch }}
      >
        <div className="app">
          <Header />
          <Switch>
            <Redirect exact from="/" to="/list-polls" />
            <Route exact path="/list-polls">
              {statePolls.polls && <ListPoll />}
            </Route>
            <Route path="/list-polls/:pollsId">
              <ViewPoll />
            </Route>
            <Route path="/create-poll">
              {statePolls.polls && <CreatePoll />}
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </div>
      </AppContext.Provider>
    </Router>
  );
};

export default App;
