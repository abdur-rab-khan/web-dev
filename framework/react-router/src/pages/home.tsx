import { useLoaderData } from "react-router-dom";

const Home = () => {
  const data = useLoaderData();

  console.log("Data received in Home component:", data);

  return (
    <div className="size-full bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-2xl">
        This is Home Page. Check the console for loader and middleware logs.
      </h1>
    </div>
  );
};

export default Home;
