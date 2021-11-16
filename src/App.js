import react from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
//react需在次要 component 導入react-router-dom module 使用Switch 和 Route, 以至於做到router的效果
import { Switch, Route } from "react-router-dom";
import "./styles/style.css";

function App() {
  return (
    <div className="App">
      <Nav />
      {/*所有的router頁面需要包在Switch之中 */}
      {/*每一個需要被處理的component(Homepage, About), 又需要個別被包在Route中 */}
      {/*每一個path 後面一定要增加exact，否則會出問題，大概就是避免模糊搜尋的概念 */}
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
