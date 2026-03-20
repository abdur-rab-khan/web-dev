import React from "react";

export function generateStaticParams() {
  return [
    { userId: "1" },
    { userId: "2" },
    { userId: "3" },
    { userId: "4" },
    { userId: "5" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const userDetailsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const userDetails = await userDetailsResponse.json();

  if (!userDetails || userDetails.id !== Number(userId)) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: userDetails.name,
    description: `Profile page for ${userDetails.name} (@${userDetails.username})`,
  };
}

async function UserPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const userDetailsResponse = async (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );
        resolve(response);
      }, 1000);
    });
  };
  const userDetails = await userDetailsResponse().then((res) => res.json());

  if (!userDetails || userDetails.id !== Number(userId)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            User Not Found
          </h1>
          <p className="text-gray-600">
            The user with ID {userId} does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-linear-to-br p-8">
      <div className="max-w-2xl mx-auto rounded-lg shadow-lg p-8 bg-gray-800">
        <h1 className="text-4xl font-bold text-white mb-2">
          {userDetails.name}
        </h1>
        <p className="text-indigo-400 text-lg mb-6">@{userDetails.username}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">
              Contact Info
            </h2>
            <p className="text-gray-400 mb-2">
              <span className="font-medium">Email:</span> {userDetails.email}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-medium">Phone:</span> {userDetails.phone}
            </p>
            <p className="text-gray-400">
              <span className="font-medium">Website:</span>{" "}
              <a
                href={`https://${userDetails.website}`}
                className="text-indigo-400 hover:underline"
              >
                {userDetails.website}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">
              Address
            </h2>
            <p className="text-gray-400">
              {userDetails.address.street}, {userDetails.address.suite}
            </p>
            <p className="text-gray-400">
              {userDetails.address.city}, {userDetails.address.zipcode}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              📍 {userDetails.address.geo.lat}, {userDetails.address.geo.lng}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Company</h2>
          <p className="text-gray-100 font-medium text-lg">
            {userDetails.company.name}
          </p>
          <p className="text-gray-400 mt-2">
            <span className="font-medium">Catchphrase:</span>{" "}
            {userDetails.company.catchPhrase}
          </p>
          <p className="text-gray-400">
            <span className="font-medium">Business:</span>{" "}
            {userDetails.company.bs}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
