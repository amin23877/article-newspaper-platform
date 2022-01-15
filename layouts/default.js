import Navbar from "components/layouts/default/navbar";
import Footer from "components/layouts/default/footer";


export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
