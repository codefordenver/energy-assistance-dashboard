import home from "../styles/home.module.css";
// TODO: Create home page

function Index(props) {
  return(
    <div className={home.container}>
      <h1>Home Page</h1>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
}

export default Index;