import Layout from "./Layout";
import Scroll from "./Scroll";
import Overview from "./Overview";
import Transition from "./Transition";

function Animation() {
  return (
    <section className="w-screen min-h-screen px-4 py-8">
      <Overview />
      <Layout />
      <Scroll />
      <Transition />
    </section>
  );
}

export default Animation;
