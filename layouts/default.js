import Navbar from "components/layouts/default/navbar";
import Footer from "components/layouts/default/footer";


export default function Layout({ children , pages }) {
    return (
        <>
            <Navbar pages={pages}/>
            <main>{children}</main>
            <Footer />
        </>
    )
}
