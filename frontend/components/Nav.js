import Link from "next/link";
import nav from "../styles/nav.module.css";


// TODO: Add Navbar Styles

const Nav = () => (
  <nav className={nav.navbar}>
    <div className={nav.brand}>
      <Link href='/'>
        <a>
          <img
            src='/energy-outreach-logo.png'
            alt='Energy Outreach Colorado Logo'
            className={nav.logo}
          />
        </a>
      </Link>
    </div>
    <div className={nav['nav-links']}>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <Link href='/counties'>
        <a>Counties</a>
      </Link>
    </div>
  </nav>
);

export default Nav;
