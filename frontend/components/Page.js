import Header from "./Header";
import Meta from "./Meta";
import Footer from "./Footer";
import Nav from "./Nav";
import global from "../styles/global.module.css";
import sidebar from "../styles/sidebar.module.css";


function Page (props) {
    return (
      <div class={global.container}>
        <Meta />
        <Header />
        <div className={global.layout}>
          <div className={sidebar.sidebar}>
            <h1>
              <div className={sidebar['highlight-energy']}></div>
              <span className={sidebar.bold}>
                Energy
              </span>
              <br></br> 
              <div className={sidebar['highlight-assistance']}></div>
              <span className={sidebar.bold}>
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
