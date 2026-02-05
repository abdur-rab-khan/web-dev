import Layout from "./overview/Layout";
import Scroll from "./overview/Scroll";
import Overview from "./overview/Overview";
import Transition from "./overview/Transition";

function Animation() {
  return (
    <section className="w-screen min-h-screen px-4 py-8">
      {/* <Overview /> */}
      {/* <Layout /> */}
      {/* <Scroll /> */}
      <Transition />
    </section>
  );
}

export default Animation;
