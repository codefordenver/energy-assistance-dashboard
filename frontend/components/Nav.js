import Link from "next/link";
import nav from "../styles/nav.module.css";


const Nav = () => (
  <nav className={nav.navbar}>
    <img
        src='/lightbulb.png'
        alt='Lightbulb'
        className={nav['lightbulb']}
    />
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
