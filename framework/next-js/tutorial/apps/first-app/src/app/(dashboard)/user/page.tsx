import User from "../_components/User";

export const dynamic = "force-dynamic"; // It will always render on the server and never be cached

// export const revalidate = 10; // Revalidate every 10 seconds

async function UserPage() {
  return <User />;
}

export default UserPage;
