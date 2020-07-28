import about from "../styles/about.module.css";
// TODO: Create and style about page

function About(props) {
  return(
    <div className={about.container}>
      <h1>About Page</h1>
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