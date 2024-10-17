import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroSlider from "./components/Hero/Hero";
import FeaturedProducts from "./components/Products/FeaturedProducts";

function App() {
  return (
    <>
      <Header />
      <HeroSlider />
      <FeaturedProducts />
      <Footer />
    </>
  );
}

export default App;
