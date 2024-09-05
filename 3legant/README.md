# โครงสร้าง Directory ของโปรเจค

Directory หลักๆ ใน โปรเจคนี้ (ผมใช้เป็น app กรพำแะนพั นะครับ ) จริงจะใช้ page หรือ src เหมือน react ก็ได้ครับ ปรับ config นิดหน่อย ตาม doc นี้เลยครับ [[Link](https://nextjs.org/docs/app/building-your-application/configuring/src-directory)]

## `/app`
Directory นี้เก็บโค้ดหลักของแอปพลิเคชัน ทั้งการจัดการ layout page route api route 
- file base route
- folder ที่มี วงเล็ป () จะไม่ถูกโชว์ใน url
- folder ที่มี วงเล็ป [] เป็น dynamic route 
- static folder folder ที่เป็นชื่อปกติจะถูกโชว์ใน url
- ในทุกๆ page folder จะมี layout คลุม แล้วใน ซึ่ง page ต่างๆ ก็คือ children ที่ถูกคลุมด้วย layout

## `/components`
เก็บ components ต่างๆ ที่ใช้ซ้ำได้ทั่วทั้งโปรเจค ตัว /components/ui เป็น component ของ shadcn 

## `/constant`
เก็บค่าคงที่ที่ใช้ในโปรเจค 

## `/context`
ใช้สำหรับการจัดการ state ระดับแอปพลิเคชันด้วย React Context API

## `/databases`
เก็บการตั้งค่าและสคริปต์เกี่ยวกับฐานข้อมูล

## `/lib`
เก็บ library และ helper functions ที่ใช้ในโปรเจค เก็บพวก server action , util function , auth.ts config 

## `/public`
เก็บไฟล์ที่สามารถเข้าถึงได้จาก public พวก images, icons ไฟล์สไตล์ และ favicon

## `/store`
เก็บไฟล์สำหรับการจัดการ state ของ Redux store ผมใช้ redux toolkits ในการเก็บ cart state , wishlist state , user. 

## `/style`
เก็บไฟล์ CSS หรือการตั้งค่าสไตล์โกลบอลที่ใช้ในโปรเจค

## `/types`
เก็บไฟล์ประกาศ type หรือ interface สำหรับ TypeScript เพื่อเพิ่มความปลอดภัยของโค้ดและช่วยให้การพัฒนาง่ายขึ้น
