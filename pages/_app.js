import 'styles/globals.scss'
import 'styles/grid.scss'
import Layout from "layouts/default";
import axios from 'axios';
import { Endpoints } from 'utils/endpoints';
function MyApp({ Component, pageProps, pagesInfo }) {

    console.log('pages list', pagesInfo)
    const getLayout = Component.getLayout || ((page) => <Layout pages={pagesInfo}>{page}</Layout>)

    return getLayout(<Component {...pageProps} />)
}


export default MyApp

MyApp.getInitialProps = async ({ ctx }) => {

    if (ctx.req) {
        try {
            const pagesInfo = await axios.get(`${Endpoints.baseUrl}/pages`)
            return {
                pagesInfo: pagesInfo.data.data.pages
            };
        } catch (err) {
            console.warn('error',err)
        }
    }

};