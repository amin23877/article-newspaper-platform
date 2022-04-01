import Navbar from "components/layouts/default/navbar";
import Footer from "components/layouts/default/footer";


export default function Layout({ children, pages, footer = true }) {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Navbar pages={pages} />
            <main style={{ flexGrow: 1, paddingTop: 64 }}>{children}</main>
            {footer && <Footer />}
        </div>
    )
}
