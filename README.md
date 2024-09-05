# 3legant

- **Description**: Project นี้เกี่ยวกับการทำ full stack e commerse web application โดยใช้เพียงแค่ Nextjs framework ในการ handle ทั้ง frontend และ backend และในส่วนของ DB ก็จะเป็น MongoDB ในการจัดเก็บข้อมูล โดย project นี้ผมหยิบ free figma design มา แล้วมา convert เป็น responsive full stack application และสามารถทำ features หลักๆ ที่ e-commerse web application มี. 
- **Live Demo**: https://3legant-sepia.vercel.app/products?maxPrice=100&minPrice=0&room=bedRoom [[link]](https://3legant-sepia.vercel.app/products?maxPrice=100&minPrice=0&room=bedRoom)

## Features

- Feature 1: user สามารถ sign-in ผ่าน credential base login (email , password) หรือ login in ผ่าน social (Google signin) โดยผมใช้ NEXT AUTH library ในการจัดการ authorization 
- Feature 2: responsive design.หน้า UI สามารถรองรับได้ทั้ง Desktop และ mobile 
- Feature 3: user สามารถ query หา product ที่ต้องการได้โดย text search หรือ query ผ่าน filter เช่น price range , types of room
- Feature 4: user สามารถ comment review , apply rating ในหน้า product ได้ เช่นเดียวกับ reply comment ของ users อื่นๆได้
- Feature 5: user สามารถ ทำการสั่งซื่อและชำระเงินได้สองแบบ ผ่าน stripe (credit card , google pay (test mode)) , หรือ cash
- Feature 6: user สามารถ edit profile , track ตัว orders , หรือ เพิ่ม product เข้าไปใน wishlist
- Feature 7: ข้อมูล สินค้า ใน cart interact แบบ real time ทำให้ cart update ในทุก device ที่ user ใช้

## Technologies Used

- Technology 1: ผมใช้เฟรมเวิร์ค Next.js ซึ่งเป็น framework ที่พัฒณาต่อยอด จาก reactJS แต่มี feature เพิ่มขึ้น และสามารถทำเป็น fullstack application ได้. ผมใช้ structure เป็น app directory นะครับ ใครที่ย้ายมาจาก react ก็ใช้ src directory ได้ และปรับ config นิดหน่อย สามารถอ่าน ตาม document ได้เลยครับ ไม่ยุ่งยาก. ในส่วนของการจัดการ page route ก็จัดการเป็น file base ซึ่งเดี๋ยวผมจะอธิบายใน readme ใน project root directory 
  - **Server-side Rendering (SSR)**: เราสามารถกำหนด ตัว component หรือ ได้ว่าเรา จะให้ตัว ไหนเป็น server component และ client component. ซึ่ง server component จะเป็น component ที่ถูก render ในฝั่งของ server และ client component จะเป็น component ที่ถูก render ในฝั่ง client. แต่ในส่วน ของ server component มันจะไม่สามารถ interact หรือ ใช้ react hook ได้ ก็เป็นข้อจำกัดและต้อง design ตัว page และ component ดีๆ. จริงๆแล้วเราสามารถ prioritize ได้ว่า page หรือ component ไหน ควรเป็น server side rendering , (page ไหนอยากให้ติด SEO , page ไหน อยากให้ มี initial page load ที่เร็ว ไม่โหลดช้า). โปรเจคนี้หลัก ตาม figma design page ก็ มีบาง page ที่สามารถ เป็น SSR ทั้งpageได้ บาง page ก็ ผสมระหว่าง SSR CSR ครับ (ส่วนตัวแล้วยังออกแบบไม่ได้เก่งมากครับ)
  - **API Routes**: การจัดการ API เราจะกำหนด folder ชื่อว่า api ใน app folder directory และเราก็กำหนด ตัว folder อีก ใน api folder เป็น api endpoint ต่างๆที่เราต้องการสร้าง. 
  - **Server action**: ส่วนตัวแล้วผมชอบ feature นี้ของ NextJs . server action เป็น async function ที่ถูก run ในผั่งของ server. เราสามารถ ใช้ server action เป็นเหมือนกับการจัดการข้อมูลโดยตรงกับ DB โดยที่เราไม่ต้องกำหนด api endpoint แล้ว request ไปที่ endpoint นั้นๆ. เราสามารถ สร้าง server action แล้ว call มันใน component ที่เราต้องการใน ตัว server action เราก็สามารถกำหนด server side logic ได้ปกคิ เหมือนที่เรา กำหนดทั่วไปใน api endpoint ต่างๆเลย. เท่าที่อ่านตาม community หรือ blog ต่างๆ เขานิยมใช้ server action ในการ mutate data (พวก post ,put ,delete) แต่ถ้าเป็นการดึงข้อมูลเขานิยม กำหนด api endpoint และ fetch GET request ปกติ โปรเจคนี้ถ้า feature ไหนที่เป็น POST หรือ PUT request ที่ไม่ได้มีการติดต่อกับ external api หรือ third party ผมใช้ server action ในการจัดการหมด 
- MongoDB: mongoDB จัดเก็บ ข้อมูล แบบ non relational ในรูปแบบ JSON.
- Google cloud bucket  , credentail , map api: ใช้ google clound ในการเก็บข้อมูล product image , google credential เชื่อมกับ next auth สำหรับ social login , map api ในการโชว์ map หน้า ui
- Vercel: vercel สำหรับการ Deploy





## Screenshots

- Screenshot 1: Description.
- Screenshot 2: Description.



## Discussion

