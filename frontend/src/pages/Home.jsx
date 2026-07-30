import Hero from "../components/hero/Hero";
import NavBar from "../components/layout/Navbar";
import Services from "../components/servicios/Services";

function Home(params) {
    return (
        <>
        <NavBar/>
        <Hero/>
        <Services/>
        <h1> Bienvenido a SectorB </h1>
        </>
    )
}

export default Home;