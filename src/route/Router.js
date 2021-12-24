import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import List from "../components/List";
import Product from "../components/Product";
import Header from "../components/Header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true}></Route>
        <Route path="/list" component={List} exact={true}></Route>
        <Route path="/product/:id" component={Product}></Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
