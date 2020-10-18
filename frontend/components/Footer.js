import Link from "next/link";
import footer from "../styles/footer.module.css";

function Footer (props) {
    return (
        <footer className={footer.footer}>
            <div className={footer['footer-content']}>
                <p>Created by 
                    <Link href='//www.energyoutreach.org'>
                        <a className={footer.link}>Energy Outreach Colorado</a>
                    </Link> 
                    in partnership with
                    <Link href='//codefordenver.org'>
                        <a className={footer.link}>Code for Denver</a>
                    </Link> 
                </p>
            </div>
            <div className={footer['footer-links']}>
                <Link href='//www.energyoutreach.org'>
                    <a>
                    <img
                        src='/energy-outreach-logo.png'
                        alt='Energy Outreach Colorado Logo'
                        className={footer['eoc-logo']}
                    />
                    </a>
                </Link>
                <Link href='//codefordenver.org'>
                    <a>
                    <img
                        src='/code-for-denver.png'
                        alt='Code For Denver Logo'
                        className={footer['cfd-logo']}
                    />
                    </a>
                </Link>
            </div>

        </footer>
    );
  }

export default Footer;