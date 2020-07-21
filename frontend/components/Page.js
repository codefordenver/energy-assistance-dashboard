import Header from "./Header";
import Meta from "./Meta";

function Page (props) {
    return (
      <>
        <Meta />
        <Header />
        <div>{props.children}</div>
      </>
    );
  }

export default Page;
