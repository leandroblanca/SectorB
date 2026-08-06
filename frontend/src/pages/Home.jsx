import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import NavBar from "../components/layout/Navbar";
import Offer from "../components/offer/Offer";
import Services from "../components/services/Services";
import Testimonials from "../components/testimonials/Testimonials";
import useAuthStore from "../components/store/authStore";

function Home(params) {
    const user = useAuthStore((state) => state.user)
    console.log(user)
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