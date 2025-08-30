"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function VerifyEmail() {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  async function verifyUserEmail() {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });

      if (response.status === 200) {
        setVerified(true);
        setError(false);
      }
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const { token } = router?.query;
    // const urlTokenTow = query.token;
    // setToken(urlTokenTow! || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token found"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <p>
            Now you can <Link href="/login">Login</Link> to your account
          </p>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl">Error</h2>
          <p>Something went wrong</p>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
