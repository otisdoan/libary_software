import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/Header";
import Content from "../Body/content";

function Home() {

    return (
        <>
            <Header />
            <div className="container mx-auto px-[120px] bg-[#f0f0f0]">
                <Content />
            </div>
            <Footer />
        </>
    )
}
export default Home;