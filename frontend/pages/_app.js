import Page from "../components/Page";

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          background: #e5e5e5;
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
    </Page>
    
  );
}

export default MyApp;
