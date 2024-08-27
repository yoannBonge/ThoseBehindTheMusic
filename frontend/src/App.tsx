import ReactModal from "react-modal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import AddComposer from "./pages/AddComposer";
import Categories from "./pages/Categories";
import Composers from "./pages/Composers";
import Index from "./pages/Index";
import Home from "./pages/Landing";
import ModifyComposer from "./pages/ModifyComposer";
import SpecificComposer from "./pages/SpecificComposer";
import SuggestComposer from "./pages/SuggestComposer";
import { colors } from "./utils/constants";
import { ComposersProvider } from "./utils/context/ComposersContext";

ReactModal.setAppElement("#root");

/////////////////////////////////////////////////////////////////////////////STYLE
const GlobalStyle = createGlobalStyle`
    body {
        max-width: 100vw;
        max-height: 100vw;
        overflow: hidden;
        margin: 10vh 0 0 0;
        background-color: #424242;
        box-sizing: border-box;
        ::selection {
          color:${colors.tbtm2};
          background-color: ${colors.tbtm};
        }
    } `;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function App() {
  return (
    <ComposersProvider>
      <GlobalStyle />
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route
              path='/composers/music'
              element={<Composers category='music' />}
            />
            <Route
              path='/composers/cinema'
              element={<Composers category='cinema' />}
            />
            <Route
              path='/composers/videogame'
              element={<Composers category='videogame' />}
            />
            <Route path='/index' element={<Index />} />
            <Route path='/composer/:id' element={<SpecificComposer />} />
            <Route path='/add-composer' element={<AddComposer />} />
            <Route path='/modify-composer/:id' element={<ModifyComposer />} />
            <Route path='/suggest-composer' element={<SuggestComposer />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ComposersProvider>
  );
}

export default App;
