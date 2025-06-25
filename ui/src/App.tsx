import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./pages/landing";
import Layout from "./components/layout";
import { PrivateRoute } from "./lib/private-routes";
import NotFound from "./pages/not-found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route element={<PrivateRoute />}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
