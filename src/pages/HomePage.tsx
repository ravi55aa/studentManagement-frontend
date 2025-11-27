import { Navbar, Hero, Features, Pricing, Stats, Footer } from "@/components/HomePage";

const HomePage = () => {

    return (
        <div>
            <section id="navbar"><Navbar/></section>
            <section id="hero"><Hero/></section>
            <section id="feature"><Features/></section>
            <section id="stats"><Stats/></section>
            <section id="pricing"><Pricing/></section>
            <section id="footer"><Footer/></section>
        </div>
    )
}

export default HomePage


