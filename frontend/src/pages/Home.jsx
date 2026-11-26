import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import NavBar from "../components/layout/Navbar";
import Offer from "../components/offer/Offer";
import Services from "../components/services/Services";
import Testimonials from "../components/testimonials/Testimonials";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash === "#servicios") {
            document.getElementById("servicios")?.scrollIntoView();
        }
    }, [hash]);

    return (
        <>
        <NavBar/>
        <Hero/>
        <Services/>
        <Offer/>
        <Testimonials/>
        <Footer/>

        </>
    )
}

export default Home;
