import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Landing";
import Categories from "./pages/Categories";
import Videogame from "./pages/Videogame";

///////////////////////////////////////////////STYLE
const GlobalStyle = createGlobalStyle`
   @font-face {
    font-family: 'rangile';
    src: url('./src/fonts/rangile.woff2') format("woff2");
    font-weight: normal;
    font-style: normal;
  }
    body {
        width: 100vw;
        overflow-x: hidden;
        margin: 5em 0 0 0;
        background-image: url("musical-background-1.jpeg");
        background-attachment: fixed;
        background-position: center;
        box-sizing: border-box;
    } `;

///////////////////////////////////////////////COMPONENT
function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/categories' element={<Categories />}></Route>
          <Route path='/videogame' element={<Videogame />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
