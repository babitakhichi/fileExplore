import { Route, Routes, useRoutes } from "react-router-dom";
import "./App.css";
// import { routes } from "./routes";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { selectRouteData } from "./redux/routeSlice";
import PublicLayout from "./layout";
import { Download } from "./pages";

function App() {
  const rout= useSelector(selectRouteData)


  function RouteLayout({ path }) {
    const element = useRoutes(path);
    return element;
  }
  return (
    <Suspense fallback={<div className="loader"></div>}>
      <Routes>
            {rout.map(route => (
              <Route key={route.key} path={route.path} element={<PublicLayout/>} />
            ))}
          </Routes>
      {/* <RouteLayout path={routes()} /> */}
    </Suspense>
  );
}

export default App;
