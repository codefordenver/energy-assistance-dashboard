import Page from "../components/Page";

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
      <style jsx global>{`
        #blockColorblindContent {
          display: none;
        }
      `}</style>
    </Page>
    
  );
}

export default MyApp;
