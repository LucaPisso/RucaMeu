import homeBackground from "../assets/utils/home-background.jpg";
import flechaHaciaAbajo from "../assets/utils/flecha-hacia-abajo.png";
import "./HomePage.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  return (
    <>
      <section id="first-watch" className="first-watch">
        <img className="home-background" src={homeBackground} alt="fondo" />
        <h1 className="home-background-text">
          OBJETOS DE DECORACIÓN <br /> RUSTICOS Y DELICADOS
        </h1>
        <a href="#second-watch">
          <div className="catalogo">
            <span>VER MÁS</span>
            <img className="flecha" src={flechaHaciaAbajo} alt="flecha" />
          </div>
        </a>
      </section>
      <br />
      <br />
      <br />
      <br />
      <section id="second-watch"></section>
      <div className="map-container">
        <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.3265889319728!2d-60.89020578910511!3d-32.915968573495796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b64bc30575d64f%3A0xbc3fe9dda92b29c5!2sDon%20Bosco%2C%20Rold%C3%A1n%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1748552148447!5m2!1ses!2sar"
        ></iframe>
      </div>

      <Link to={"/products"}> Ver Todos Nuestros Productos</Link>
    </>
  );
};

export default HomePage;
