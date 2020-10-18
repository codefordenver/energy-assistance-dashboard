import about from "../styles/about.module.css";

function About(props) {
  return(
    <div className={about.container}>
      <div>
        <img
            className={about['eoc-logo']}
            src='/energy-outreach-logo.png'
            alt='Energy Outreach Colorado Logo'
        />
        <p>Energy Outreach Colorado was established in 1989 and we believe everyone deserves affordable access to the vital resources that power their homes. When everyone can afford and maintain their home, then they can focus on living, rather than merely surviving.</p>
        <p>We lead a network of industry, state and local partners to Support, Stabilize and Sustain Coloradans to afford their energy needs.</p>
      </div>
      <div>
      <img
            className={about['cfd-logo']}
            src='/code-for-denver.png'
            alt='Code For Denver Logo'
        />
        <p>Code for Denver is a group of volunteer technologists who build software to help nonprofits and local government better serve their community.</p>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
}

export default About;