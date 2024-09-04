import FeatureList from "@/components/list/FeatureList";
import GoogleMap from "@/components/shared/GoogleMap";
import TextLinkButton from "@/components/shared/TextLinkButton";
import Image from "next/image";

const Page = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col container-1 max-w-[1440px]">
        <div className="flex flex-col gap-3 justify-start items-start w-full max-w-[850px]">
          <p className="h6-medium text-dark-1   sm:h4-medium">
            We believe in sustainable decor. We are passionate about life at
            home.
          </p>
          <p className="text-dark-3 regular-xs">
            Our features timeless furniture, with natural fabrics, curved lines,
            plenty of mirrors and classic design, which can be incorporated into
            any decor project. The pieces enchant for their sobriety, to last
            for generations, faithful to the shapes of each period, with a touch
            of the present
          </p>
        </div>

        <div className="flex flex-col justify-center w-full max-w-[1560px] mx-auto md:flex-row pt-10">
          <div className="flex w-full max-w-[880px] h-auto">
            <img
              src="/assets/images/banner.svg"
              alt="News Banner"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex items-center bg-grey-5 w-full max-w-[880px] py-6   md:p-12 md:h-auto">
            <div className="flex flex-col p-8 gap-4">
              <h2 className="h7-medium md:h5-medium">About Us</h2>
              <p className="regular-sm md:regular-base">
                3legant is a gift & decorations store based in HCMC, Vietnam.
                Est since 2019. <br />
                Our customer service is always prepared to support you 24/7
              </p>
              <TextLinkButton
                title="Shop Now"
                href="/products"
                otherClasses="w-[92px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 pt-10">
          <h1 className="medium-base sm:h4-medium">Contact Us</h1>
          <div className="flex flex-col gap-3 items-center sm:flex-row w-full">
            <div className="flex flex-col items-center justify-center gap-3   bg-grey-4 w-full h-[206px] ">
              <Image
                src="/assets/icons/store1.svg"
                alt="store"
                width={32}
                height={32}
                className="max-w-[32] max-h-[32]"
              />
              <span className="text-grey-1 medium-sm">ADDRESS</span>
              <p className="text-dark-1 medium-sm text-center">
                234 Hai Trieu, Ho Chi Minh City, Viet Nam
              </p>
            </div>
            <div className="flex flex-col gap-3 items-center justify-center   bg-grey-4 w-full h-[206px] ">
              <Image
                src="/assets/icons/call.svg"
                alt="store"
                width={32}
                height={32}
                className="max-w-[32] max-h-[32]"
              />
              <span className="text-grey-1 medium-sm">ADDRESS</span>
              <p className="text-dark-1 medium-sm text-center">
                234 Hai Trieu, Ho Chi Minh City, Viet Nam
              </p>
            </div>
            <div className="flex flex-col gap-3 items-center justify-center  bg-grey-4 w-full h-[206px] ">
              <Image
                src="/assets/icons/mail.svg"
                alt="store"
                width={32}
                height={32}
                className="max-w-[32] max-h-[32]"
              />
              <span className="text-grey-1 medium-sm">ADDRESS</span>
              <p className="text-dark-1 medium-sm text-center">
                234 Hai Trieu, Ho Chi Minh City, Viet Nam
              </p>
            </div>
          </div>

          <GoogleMap />
        </div>
      </div>
    </section>
  );
};

export default Page;
