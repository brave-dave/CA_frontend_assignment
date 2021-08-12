import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import CharactersListPage from "./pages/CharactersListPage";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./redux";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppLayout>
        <Switch>
          <Route path="/" exact>
            <CharactersListPage />
          </Route>
          <Route path="/page-:page">
            <CharactersListPage />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </AppLayout>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
