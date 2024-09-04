import React from "react";
import HomeHeader from "@/components/header/HomeHeader";
import CategoryCard from "@/components/cards/CategoryCard";
import FeatureList from "@/components/list/FeatureList";
import NewsSection from "@/components/shared/NewsSection";
import JoinUsNews from "@/components/shared/JoinUsNews";
import DiscountProductsList from "@/components/list/DiscountProductsList";
import NewArrivalProductsList from "@/components/list/NewArrivalProductsList";

const Page = async () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <HomeHeader />
      <div className="mt-8 container-1 flex flex-col justify-center items-center gap-4 md:gap-24 md:flex-row md:justify-between ">
        <h1 className="h4-medium text-dark-1 lg:h3-medium xl:h1-medium ">
          Simply Unique
          <br />
          Simply Better
        </h1>
        <p className="regular-sm text-grey-1 md:regular-base max-w-[424px]">
          <span className="text-dark-1">3legant</span> is a gift & decorations
          store based in HCMC, Vietnam. Est since 2019.
        </p>
      </div>
      {/* Banner section display category of living room */}

      <div className="container-1 mt-8 gap-4 flex flex-col justify-center md:flex-row md:gap-6">
        <div>
          <CategoryCard
            title="Living Room"
            imgUrl="/assets/images/living_room.svg"
            width={548}
            height={664}
            alt="livingRoom"
            // !!TODO apply query later in href
            href={`/products`}
            otherClasses="left-8 top-8 md:left-12 md:top-12 "
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <CategoryCard
            title="BedRoom"
            imgUrl="/assets/images/bedroom.svg"
            width={548}
            height={319}
            alt="bedRoom"
            // !!TODO apply query later in href
            href={`/products`}
            otherClasses="left-8 top-8 md:left-12 md:top-12 "
          />
          <CategoryCard
            title="Kitchen"
            imgUrl="/assets/images/kitchen.svg"
            width={548}
            height={319}
            alt="kitchen"
            // !!TODO apply query later in href
            href={`/products`}
            otherClasses="left-8 top-8 md:left-12 md:top-12 "
          />
        </div>
      </div>

      <DiscountProductsList percentage={40} title="Discount Deal 40%" />
      {/* Feature */}
      <FeatureList />

      <DiscountProductsList percentage={20} title="Discount Deal 20%" />

      <NewsSection />

      {/* <ProductHorizontal title="Discount Deal 40%" /> */}

      <NewArrivalProductsList />

      <JoinUsNews />
    </section>
  );
};

export default Page;
