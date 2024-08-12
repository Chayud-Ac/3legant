import ProductHeader from "@/components/header/ProductHeader";
import DisplayTemplate from "@/components/list/DisplayTemplate";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <ProductHeader />

      <DisplayTemplate />
    </section>
  );
};

export default Page;
