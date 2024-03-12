import { AuthProvider } from "./utils/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Home from "./pages/Landing";
import Categories from "./pages/Categories";
import Music from "./pages/Music";
import Cinema from "./pages/Cinema";
import Videogame from "./pages/Videogame";
import AddComposer from "./pages/AddComposer";
import { ComposersProvider } from "./utils/ComposersContext";
import ModifyComposer from "./pages/ModifyComposer";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

/////////////////////////////////////////////////////////////////////////////STYLE
const GlobalStyle = createGlobalStyle`
   /* @font-face {
    font-family: 'Rangile';
    src: url('./src/fonts/rangile.woff2') format("woff2");
    font-weight: normal;
    font-style: normal;
  } */
    body {
        width: 100vw;
        height: 90vh;
        overflow-x: hidden;
        margin: 10vh 0 0 0;
        background-color: #D1DDCC;
        /* background-image: url("musical-background-1.jpeg");
        background-attachment: fixed;
        background-position: center; */
        box-sizing: border-box;
    } `;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function App() {
  // console.log("RENDER APP");

  return (
    <AuthProvider>
      <ComposersProvider>
        <BrowserRouter>
          <GlobalStyle />
          <div>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/music' element={<Music />} />
              <Route path='/cinema' element={<Cinema />} />
              <Route path='/videogame' element={<Videogame />} />
              <Route path='/add-composer' element={<AddComposer />} />
              <Route path='/modify-composer/:id' element={<ModifyComposer />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ComposersProvider>
    </AuthProvider>
  );
}

export default App;
