import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import styles from "../styles/global.module.css";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <div className={("bar", styles["no-print"])}></div>
);

export default Header;
