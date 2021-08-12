import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import CharactersListPage from "./pages/CharactersListPage";
import ErrorPage from "./pages/ErrorPage";

ReactDOM.render(
  <BrowserRouter>
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
  </BrowserRouter>,
  document.getElementById("root")
);
