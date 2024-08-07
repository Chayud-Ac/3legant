"use client";

import React from "react";
import { useSession } from "next-auth/react";
import email from "next-auth/providers/email";

const Page = () => {
  const { data: session, status } = useSession();
  console.log(status);
  console.log(session?.expires);
  console.log(session?.user);
  return <div>Signed in as {session?.user?.email}</div>;
};

export default Page;
