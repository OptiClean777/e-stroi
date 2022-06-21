import "./App.css";
import { Header } from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Carousel } from "./components/carousel/Carousel";
import firstImg from "./imgs/1.png";
import secondImg from "./imgs/3.png";
import thirdImg from "./imgs/4.png";
import fourthImg from "./imgs/6.png";
import fifthImg from "./imgs/8.png";
import { CatalogPage } from "./pages/CatalogPage";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="build">
    <div className="App">
      <Header />

      <Carousel>
        <div className="all">
          <img src={firstImg} alt="/" />
          <img src={fifthImg} alt="/" />

          <img src={secondImg} alt="/" />

          <img src={thirdImg} alt="/" />

          <img src={fourthImg} alt="/" />
        </div>
      </Carousel>
      
        <Routes>
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
        </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
