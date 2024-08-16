import ProductHeader from "@/components/header/ProductHeader";
import DisplayTemplate from "@/components/list/DisplayTemplate";
import JoinUsNews from "@/components/shared/JoinUsNews";
import React from "react";

const Page = () => {
  // !!TODO fetch ไป api product และดึง ข้อมูล product มา ตาม query ที่กำหนดไว้ ใน url
  // !!TODO fetch ทุกครั้ง เมื่อ มีการ update ตัว query ถ้า ใช้ useEffect ก็จะเป็น client component แล้วเสีย ประโยชน์ ของ serverside rendering ทำไงดี ขอคิกก่อง
  return (
    <section className="flex flex-col justify-center items-center">
      <ProductHeader />

      <DisplayTemplate />

      <JoinUsNews />
    </section>
  );
};

export default Page;
