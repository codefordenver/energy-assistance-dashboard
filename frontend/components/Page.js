import Header from "./Header";
import Meta from "./Meta";
import Footer from "./Footer";
import Nav from "./Nav";
import global from "../styles/global.module.css";


function Page (props) {
    return (
      <div class={global.container}>
        <Meta />
        <Header />
        <div className={global.layout}>
          <div className={global.sidebar}>
            <h1>
              <div className={global.highlight}></div>
              <span className={global.bold}>
                Energy
              </span>
              <br></br> 
              <div className={global['highlight-assistance']}></div>
              <span class={global.bold}>
                Assistance
              </span>
              <br></br> 
              in&nbsp;Colorado
            </h1>
          </div>
          <div className={global['content-container']}>
            <Nav />
            <div>{props.children}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

export default Page;
