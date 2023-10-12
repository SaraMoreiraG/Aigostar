import Navbar from './components/NavBar/navbar';
import Home from './components/home';
import Categories from './components/categories';
import Airfryers from './components/airfryers';
import Banner from './components/banner';
import Accesories from './components/accesories';
import Blog from './components/blog';
import Shipping from './components/shipping';
import Footer from './components/footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Categories />
      <Airfryers />
      <Banner />
      <Accesories />
      <Blog />
      <Shipping />
      <Footer />
      <div className='row text-center py-2'>
        <span>Web desarrollada por <a href='https://www.linkedin.com/in/sara-moreira-g' target='blank'>SaraMorDev</a></span>
      </div>
    </div>
  );
}

export default App;
