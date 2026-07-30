import Hero from "../components/hero/Hero";
import NavBar from "../components/layout/Navbar";
import Offer from "../components/offer/Offer";
import Services from "../components/servicios/Services";

function Home(params) {
    return (
        <>
        <NavBar/>
        <Hero/>
        <Services/>
        <Offer/>
        <h1> Bienvenido a SectorB </h1>
        </>
    )
}

export default Home;