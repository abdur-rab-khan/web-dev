import React from "react";
import Image from "next/image";

const profilePromise = (): Promise<{
  name: string;
  profileImage: string;
}> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          name: "John Doe",
          // Required to add "image.imagePattern" in next.config.js for this image to work
          profileImage:
            "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        }),
      1500,
    ),
  );

async function Profile() {
  const profile = await profilePromise();

  return (
    <div className="space-y-4 w-full bg-slate-900 p-6 border border-slate-800 shadow-xl shadow-slate-800/20 hover:shadow-slate-800/50 transition rounded-md">
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <Image
        src={profile.profileImage}
        alt={`${profile.name}'s profile`}
        width={500}
        height={500}
        className="w-[64px] h-[64px] rounded-full object-cover"
      />
    </div>
  );
}

export default Profile;
