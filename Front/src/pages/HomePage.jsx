import homeBackground from "../assets/utils/home-background.jpg";
import flechaHaciaAbajo from "../assets/utils/flecha-hacia-abajo.png";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <section id="first-watch" className="first-watch">
        <img className="home-background" src={homeBackground} alt="fondo" />
        <h1 className="home-background-text">
          OBJETOS DE DECORACIÓN <br /> RUSTICOS Y DELICADOS
        </h1>
        <a href="#second-watch">
          <div class="catalogo">
            <span>VER MÁS</span>
            <img className="flecha" src={flechaHaciaAbajo} alt="flecha" />
          </div>
        </a>
      </section>
      <br />
      <br />
      <br />
      <br />
      <section id="second-watch">
        <h1>HOLA</h1>
      </section>
    </>
  );
};

export default HomePage;
