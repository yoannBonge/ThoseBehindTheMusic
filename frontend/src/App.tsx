import ReactModal from "react-modal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import AddComposer from "./pages/AddComposer";
import Categories from "./pages/Categories";
import Cinema from "./pages/Cinema";
import Home from "./pages/Landing";
import ModifyComposer from "./pages/ModifyComposer";
import Music from "./pages/Music";
import SuggestComposer from "./pages/SuggestComposer";
import Videogame from "./pages/Videogame";
import { device } from "./utils/constants";
import { AuthProvider } from "./utils/context/auth/AuthContext";
import { ComposersProvider } from "./utils/context/composers/ComposersContext";

ReactModal.setAppElement("#root");

/////////////////////////////////////////////////////////////////////////////STYLE
const GlobalStyle = createGlobalStyle`
    body {
        width: 100vw;
        height: 90vh;
        overflow: hidden;
        margin: 10vh 0 0 0;
        background-color: #D1DDCC;
        box-sizing: border-box;
        @media ${device.md} {
      overflow: inherit;
    }
    } `;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function App() {
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
              <Route path='/suggest-composer' element={<SuggestComposer />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ComposersProvider>
    </AuthProvider>
  );
}

export default App;
