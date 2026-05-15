import { Link, Outlet, useFetcher, useNavigation } from "react-router-dom";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const NavLink = ({ name, path }: { name: string; path: string }) => {
  const fetcher = useFetcher({
    key: path,
  });
  const navigation = useNavigation();

  const isLoading =
    navigation.location?.pathname === path && navigation.state === "loading";

  const onMouseEnter = () => {
    if (fetcher.state === "idle" && fetcher.data === undefined) {
      fetcher.load(path);
    }
  };

  return (
    <li key={path}>
      <Link to={path} prefetch="render" onMouseEnter={onMouseEnter}>
        {isLoading ? (
          <span className="text-gray-500">Loading...</span>
        ) : (
          <span>{name}</span>
        )}
      </Link>
    </li>
  );
};

function App() {
  return (
    <main className="relative">
      <nav className="fixed inset-0 h-full w-72 p-4">
        <ul>
          {navItems.map((item) => (
            <NavLink key={item.name} name={item.name} path={item.path} />
          ))}
        </ul>
      </nav>
      <Outlet />
    </main>
  );
}

export default App;
