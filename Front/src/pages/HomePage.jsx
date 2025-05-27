import homeBackground from "../assets/utils/home-background.jpg";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <section id="first-watch" className="first-watch">
        <img className="home-background" src={homeBackground} alt="fondo" />
        <h1 className="home-background-text">
          OBJETOS DE DECORACIÓN <br /> RUSTICOS Y DELICADOS
        </h1>
        <a href="second-watch">
          <div class="catalogo">
            <span>CATALOGO</span>
            <div class="flecha"></div>
          </div>
        </a>
      </section>
      <section>
        <h1>HOLA</h1>
      </section>
    </>
  );
};

export default HomePage;
