import "styles/globals.scss";
import "styles/grid.scss";
import Layout from "layouts/default";
import axios from "axios";
import { Endpoints } from "utils/endpoints";
import { wrapper } from "redux/store";
import { setUserInfo } from "redux/users";
import cookie from "cookie";
import PropTypes from "prop-types";
import { useStore } from "react-redux";
import ErrorBoundary from "components/errorBoundary/errorBoundary";

function MyApp({ Component, pageProps, pagesInfo, userInfo }) {
  const store = useStore();
  store.dispatch(setUserInfo(userInfo));

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout footer={pageProps?.footer} pages={pagesInfo}>
        {page}
      </Layout>
    ));

  return (
    <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async ({ ctx }) => {
  if (ctx.req) {
    try {
      const accessToken = ctx?.req?.headers?.cookie
        ? cookie.parse(ctx.req.headers.cookie)
        : null;

      const pagesInfo = await axios.get(`${Endpoints.baseUrl}/pages`);

      let userInfo = { data: { data: { me: null } } };
      if (accessToken) {
        userInfo = await axios.get(Endpoints.baseUrl + "/user/me", {
          headers: {
            authorization: accessToken.accessToken,
          },
        });
      }

      return {
        pagesInfo: pagesInfo.data.data.pages,
        userInfo: userInfo.data.data.me,
      };
    } catch (err) {
      return {
        pagesInfo: "",
        userInfo: null,
      };
    }
  }

  /* return empty object instead undefined for prevent error */
  return {};
};

export default wrapper.withRedux(MyApp);
