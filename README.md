This project is call 3elegant which is the e commerse web application focusing on selling furniture product. The tech stacks are including

- NextJs Using this we able to create full stack application and this project will dive deep into how we design NextJs architecture , api handler , server action , etc
- MongoDB , non relational database which offer flexible design
- tailwindcss for styling the web application
- etc .....

ใช้ตัว NextAuth สำหรับ Authorization

- Nextauth เป็น library ที่ช่วยในการทำ process ของ การ Authotization ทั้ง credential base login และ Oauth
- โปรเจคนี้ผม ใช้ทั้ง credential base login (email password) และ Google Oauth (เป็น provider ใน Nextauth)

Process ของ การสร้าง

- สร้าง api handler api/auth/[...nextauth]/route.ts
- ตัวอย่าง url ที่ เราจะใส่ใน setting ของ Oauth api/auth/callback/google

api/auth/[...nextauth]/route.ts

- ใน route.ts เราจะ สร้าง authOptions object ขึ่นมาเพื่อ config ค่าต่างๆ ตัว object นี้จะเป็นค่า Input ของ NextAuth
- config หรือ keys หลักๆก็จะมี providers , callbacks , secret
- providers กำหนดว่าใช้ provider อะไรบ้าง (credential , google , etc)
- callbacks กำหนด async function ที่จะ รันหลัง authorize เสร็จ (signIn , jwt , session ) signIn ไม่จำเป็นถ้าเราใช้ Provider แค่ตัวเดียว แต่กรณีนี้ เราใช้เช็คว่า user เลือก การ login แบบไหน

- callbacks function ในที่สุดจะ เซ็ท session ที่เก็บ ค่า token (เราสามารถเพิ่ม key เพื่อเก็บ ใน session ได้)
