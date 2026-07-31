import Hero from "../components/hero/Hero";
import NavBar from "../components/layout/Navbar";
import Offer from "../components/offer/Offer";
import Services from "../components/servicios/Services";
import Testimonials from "../components/testimonials/Testimonials";

function Home(params) {
    return (
        <>
        <NavBar/>
        <Hero/>
        <Services/>
        <Offer/>
        <Testimonials/>
        </>
    )
}

export default Home;