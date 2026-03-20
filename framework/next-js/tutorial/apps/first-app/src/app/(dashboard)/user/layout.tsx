import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | User Dashboard",
    default: "User Dashboard",
  },
};

function UserLayout({ children }: { children: ReactNode }) {
  return children;
}

export default UserLayout;
