"use client";

import React from "react";
import { useSession } from "next-auth/react";
import email from "next-auth/providers/email";
import HomeHeader from "@/components/header/HomeHeader";

const Page = () => {
  // const { data: session, status } = useSession();
  // console.log(status);
  // console.log(session?.expires);
  // console.log(session?.user);
  return (
    <section>
      <HomeHeader />
    </section>
  );
};

export default Page;
