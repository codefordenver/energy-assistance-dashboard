import Link from "next/link";
import nav from "../styles/nav.module.css";


// TODO: Add Navbar Styles

const Nav = () => (
  <nav className={nav.navbar}>
    <div className={nav['nav-links']}>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/counties'>
        <a>Data</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </div>
  </nav>
);

export default Nav;
