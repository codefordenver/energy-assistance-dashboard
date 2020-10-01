import home from "../styles/home.module.css";
import Link from "next/link";

function Index(props) {
  return(
    <div className={home.container}>
      <p>In Colorado, thousands of families can’t afford to pay their energy bills. Living in Energy Poverty is a modern burden. The State of Colorado’s Department of Human Services and Energy Outreach Colorado are trying to solve the problem, but your State, your county, and your neighbors still  need more help. Explore the data to see how energy assistance is provided in your county and statewide.</p>
      <Link href='/counties'>
          <button className={home.explore}>Explore the Data</button>
      </Link> 
      <p>If you are living with the burden of not being able to afford your energy bills, we can help.</p>
      <Link href='/'>
        <button className={home.help}>Get Help</button>
      </Link>
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