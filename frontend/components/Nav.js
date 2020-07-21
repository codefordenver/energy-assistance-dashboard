import Link from "next/link";

// TODO: Add Navbar Styles

const Nav = () => (
  <div>
    <Link href='/about'>
      <a>About</a>
    </Link>
    <Link href='/counties'>
      <a>Counties</a>
    </Link>
  </div>
);

export default Nav;
