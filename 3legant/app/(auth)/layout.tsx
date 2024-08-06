import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="flex flex-col justify-center gap-[40px] max-md:items-center md:gap-[88px] md:flex-row ">
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
        <div className="md:mt-[220px] max-sm:pl-[32px] max-sm:pr-[32px]">
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
