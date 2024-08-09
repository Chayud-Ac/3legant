import React from "react";
import FeatureCard from "../cards/FeatureCard";
import { featureCardLists } from "@/constant";

const FeatureList = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px]  p-4 container-1">
      {featureCardLists.map((item, index) => (
        <FeatureCard
          key={index}
          iconUrl={item.iconUrl}
          title={item.title}
          describtion={item.describtion}
        />
      ))}
    </div>
  );
};

export default FeatureList;
