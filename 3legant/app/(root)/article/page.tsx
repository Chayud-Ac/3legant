import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center pb-3">
      <div className="flex flex-col container-1 max-w-[1440px] min-h-screen">
        <div className="flex flex-col gap-3 w-full">
          <span className="text-dark-1 medium-base">Article</span>
          <h1 className="h6-medium sm:h4-medium">
            How to make a busy bathroom <br />a place to relax
          </h1>
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
              className="w-auto h-auto"
            />
            <span className="text-dark-1 regular-sm">September 04, 2024</span>
          </div>
        </div>
        <Image
          src="/assets/images/art1.svg"
          alt="art1"
          width={1440}
          height={679}
          className="w-full h-auto pt-5"
        />
        <div className="flex flex-col gap-1 items-start pt-5">
          <p className="text-dark-2 regular-base">
            Your bathroom serves a string of busy functions on a daily basis.
            See how you can make all of them work, and still have room for
            comfort and relaxation.
          </p>
          <p className="text-dark-1 h6-medium">
            A cleaning hub with built-in ventilation
          </p>
          <p className="text-dark-2 regular-base">
            Use a rod and a shower curtain to create a complement to your
            cleaning cupboard. Unsightly equipment is stored out of sight yet
            accessibly close while the air flow helps dry any dampness.
          </p>
        </div>
        {/* Desktop view Art1 and Art 2--------------------------------------------------------------------------------------------- */}
        <div className="flex flex-col gap-2 pt-3 w-full max-xl:hidden">
          <div className="flex flex-row gap-2 w-full">
            <Image
              src="/assets/images/art2.svg"
              alt="art2"
              width={548}
              height={729}
              className="w-full h-auto"
            />
            <Image
              src="/assets/images/art3.svg"
              alt="art3"
              width={548}
              height={729}
              className="w-full h-auto"
            />
          </div>
          <div className="flex flex-col pt-2 gap-1 max-xl:hidden">
            <p className="text-dark-1 h6-medium">
              Storage with a calming effect
            </p>
            <p className="text-dark-2 regular-base">
              Having a lot to store doesn&#8217;t mean it all has to go in a
              cupboard. Many bathroom items are better kept out in the open
              either to be close at hand or are nice to look at. Add a plant or
              two to set a calm mood for the entire room and they&#8217;ll
              thrive in the humid air.
            </p>
            <p className="text-dark-1 h6-medium">
              Kit your clutter for easy access
            </p>
            <p className="text-dark-2 regular-base">
              Even if you have a cabinet ready to swallow the clutter,
              it&#8217;s worth resisting a little. Let containers hold kits for
              different activities home spa, make-up, personal hygiene to bring
              out or put back at a moment&#8217;s notice.
            </p>
          </div>
        </div>

        {/* Art 1 Art 2 Mobile ----------------------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-col pt-2 xl:hidden">
          <Image
            src="/assets/images/art2.svg"
            alt="art2"
            width={548}
            height={729}
            className="w-full h-auto max-h-[500px] object-cover"
          />
          <p className="text-dark-1 h6-medium pt-2">
            Storage with a calming effect
          </p>
          <p className="text-dark-2 regular-base">
            Having a lot to store doesn&#8217;t mean it all has to go in a
            cupboard. Many bathroom items are better kept out in the open either
            to be close at hand or are nice to look at. Add a plant or two to
            set a calm mood for the entire room and they&#8217;ll thrive in the
            humid air.
          </p>
        </div>
        <div className="flex flex-col pt-2 xl:hidden">
          <Image
            src="/assets/images/art3.svg"
            alt="art2"
            width={548}
            height={729}
            className="w-full h-auto max-h-[500px] object-cover"
          />
          <p className="text-dark-1 h6-medium pt-2">
            Kit your clutter for easy access
          </p>
          <p className="text-dark-2 regular-base">
            Even if you have a cabinet ready to swallow the clutter, it&#8217;s
            worth resisting a little. Let containers hold kits for different
            activities home spa, make-up, personal hygiene to bring out or put
            back at a moment&#8217;s notice.
          </p>
        </div>

        {/* Footer section for the Article */}
        <div className="flex flex-col gap-4 pt-2 xl:flex-row">
          <Image
            src="/assets/images/art4.svg"
            alt="art4"
            width={729}
            height={548}
            className="w-full h-auto max-xl:max-h-[457px] object-cover"
          />
          <div className="flex flex-col pt-2 gap-1">
            <p className="text-dark-1 h6-medium">An ecosystem of towels</p>
            <p className="text-dark-2 regular-base">
              Having a lot to store doesn&#8217;t mean it all has to go in a
              cupboard. Many bathroom items are better kept out in the open
              either to be close at hand or are nice to look at. Add a plant or
              two to set a calm mood for the entire room and they&#8217;ll
              thrive in the humid air.
            </p>
            <p className="text-dark-1 h6-medium">Make your mop disappear</p>
            <p className="text-dark-2 regular-base">
              Having your cleaning tools organized makes them easier to both use
              and return to. When they&#8217;re not needed, close the curtain
              and feel the peace of mind it brings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
