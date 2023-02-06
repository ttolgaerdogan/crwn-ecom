import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import { useEffect, lazy, Suspense } from "react";
import Spinner from "./components/spinner/spinner.component";
import { GlobalStyle } from "./global.styles";

// import Home from "./routes/home/home.component";
// import Authentication from "./routes/authentication/authentication.component";
// const Home = await import("./routes/home/home.component");
const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.component"));
const Navigation = lazy(() =>import("./routes/navigation/navigation.component"));
const Shop = lazy(() =>import( "./routes/shop/shop.component"));
const Checkout = lazy(() =>import("./routes/checkout/checkout.component"));

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [])

  return (
    <Suspense fallback={<Spinner/>}>
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path="/shop/*" element={<Shop/>}/>
          <Route path="/auth" element={<Authentication/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
        </Route>
      </Routes>
    </Suspense>
  ); 
}

export default App;