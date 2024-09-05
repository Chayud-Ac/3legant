# 3legant

- **Description**: Project นี้เกี่ยวกับการทำ full stack e commerse web application โดยใช้เพียงแค่ Nextjs framework ในการ handle ทั้ง frontend และ backend และในส่วนของ DB ก็จะเป็น MongoDB ในการจัดเก็บข้อมูล tailwind css ในการ styling UI. Project นี้ผมหยิบ free figma design มา (ไม่ได้ออกแบบตัว design เอง) แล้วมา convert เป็น responsive full stack application และสามารถทำ features หลักๆ ที่ e-commerse web application มี. 
- **Live Demo**: https://3legant-sepia.vercel.app [[link](https://3legant-sepia.vercel.app)]

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

## Preview
![image](https://github.com/user-attachments/assets/9e57022a-252f-4284-b32a-6b0be05fe993)
![image](https://github.com/user-attachments/assets/e7cb4139-4b0d-4c49-9a19-19fb14cc6bc5)
![image](https://github.com/user-attachments/assets/395d7057-2a6b-405d-b216-a18bd377cab4)
![image](https://github.com/user-attachments/assets/7e3b9e52-dc21-4e05-9cc4-11091a610f09)
![image](https://github.com/user-attachments/assets/a2443899-7785-4a7e-9159-46be9c4d9990)




## Discussion
- complex object ไม่สามารถ pass โดยตรง จาก server component ไปที่ client component ได้ ต้องทำการ parse หรือ deep clone ก่อน
- Next Image ชอบมีปัญหา warning ตัว width กับ heigth
- ไม่ควรใช้ useSession ใน NEXT auth เวลาเราต้องการ ดึงข้อมูล จาก client component บางทีมัน (undefined) เราควรใช้ getSession ใน server component และ pass ข้อมูล session เป็น props หระหว่าง server กับ client component เอา
- Redux store หรือ context เราต้องสร้าง Provider แยกและ กำหนดมันให้เป็น client component ก่อน คลุม ไม่งั้นมันจะทำให้ application ทั้งหมด กลายเป็น client component เราจะ สูญเสีย SSR ไป
- ใช้ nextJs handle แค่ ฝั่ง front หรือ client และ ใช้ framework อื่นๆ ในการทำส่วน back จะจัดการและออกแบบ Restapi ได้ง่ายกว่า
- stipe mock credit card ใช้ เป็น 4242 4242 4242 ส่วนเลขอื่นๆกำหนดเองได้เลยครับ เป็น test mode 

