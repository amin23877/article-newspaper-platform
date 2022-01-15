import Navbar from "components/layouts/default/navbar";


export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}
