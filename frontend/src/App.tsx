import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Home from "./pages/Landing";
import Categories from "./pages/Categories";
import Music from "./pages/Music";
import Cinema from "./pages/Cinema";
import Videogame from "./pages/Videogame";
import AddArtist from "./pages/Videogame";

/////////////////////////////////////////////////////////////////////////////STYLE
const GlobalStyle = createGlobalStyle`
   @font-face {
    font-family: 'rangile';
    src: url('./src/fonts/rangile.woff2') format("woff2");
    font-weight: normal;
    font-style: normal;
  }
    body {
        width: 100vw;
        height: 90vh;
        overflow-x: hidden;
        margin: 10vh 0 0 0;
        /* background-image: url("musical-background-1.jpeg");
        background-attachment: fixed;
        background-position: center; */
        box-sizing: border-box;
    } `;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function App() {
  // console.log("RENDER APP");
  return (
    <BrowserRouter>
      <GlobalStyle />
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/categories' element={<Categories />}></Route>
          <Route path='/music' element={<Music />}></Route>
          <Route path='/cinema' element={<Cinema />}></Route>
          <Route path='/videogame' element={<Videogame />}></Route>
          <Route path='/contribute' element={<AddArtist />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
