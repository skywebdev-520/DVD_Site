import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../component/Home";
import List from "../component/List";
import Product from "../component/Product";
import Header from "../component/Header";

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
