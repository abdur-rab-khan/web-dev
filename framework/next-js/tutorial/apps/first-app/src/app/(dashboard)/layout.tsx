import Link from "next/link";
import React from "react";

const NAV_LINKS = [
  {
    name: "User",
    href: "/user",
  },
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "User Profile",
    href: "/user-profile",
  },
  {
    name: "Cards",
    href: "/cards",
  },
  {
    name: "Create Card",
    href: "/create-card",
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex size-full">
      <nav className="h-full w-64 bg-gray-800">
        <span>
          <p className="text-3xl text-white p-4">Dashboard</p>
        </span>
        <ul className="flex flex-col space-y-4 p-2 bg-gray-800">
          {NAV_LINKS.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              prefetch={true}
              className="w-full py-3 px-4 rounded-md bg-blue-500"
            >
              <p className="text-white hover:text-gray-300">{name}</p>
            </Link>
          ))}
        </ul>
      </nav>
      <main className="p-3 flex-1 size-full">{children}</main>
    </section>
  );
}

export default DashboardLayout;
