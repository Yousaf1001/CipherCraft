import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Forms from "./pages/Form";
import Layout from "./pages/Layout";
import ChooseMethod from "./components/ChooseMethod";
import ResultPage from "./pages/Result";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/form" element={<Forms></Forms>}></Route>
        <Route path="/methods" element={<ChooseMethod></ChooseMethod>}></Route>
        <Route path="/result" element={<ResultPage></ResultPage>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
