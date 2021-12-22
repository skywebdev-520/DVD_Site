import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import Product from "./Product";
import Header from "./Header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true}></Route>
        <Route path="/list" component={List}></Route>
        <Route path="/product/:id" component={Product}></Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
