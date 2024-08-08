import Image from "next/image";
import { userSignup } from "@/lib/actions/user.action";

const layout = ({ children }: { children: React.ReactNode }) => {
  userSignup();
  return (
    <section>
      <div className="flex flex-col justify-center gap-[40px] max-md:items-center md:gap-[56px] md:flex-row ">
        <div className="flex items-center">
          <Image
            src="/assets/images/auth_image.svg"
            alt="auth"
            priority={true}
            width={800}
            height={1080}
            className="w-auto h-auto max-md:object-contain min-w-[400px]"
          />
        </div>
        <div className="md:mt-[220px] px-[32px] flex-1 max-w-[465px] min-w-[375px] ">
          {children}
        </div>
      </div>
    </section>
  );
};

export default layout;

// tailwind for styling image
// object-cover
//
