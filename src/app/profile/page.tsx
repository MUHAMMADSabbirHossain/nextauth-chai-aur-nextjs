"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  async function getUserDetails() {
    const response = await axios.post("/api/users/me");
    console.log(response.data.data);

    setData(response.data.data._id);
  }

  async function logout() {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen space-y-2">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push(`/profile/${data}`)}
      >
        User Details
      </button>
    </div>
  );
}

export default ProfilePage;
