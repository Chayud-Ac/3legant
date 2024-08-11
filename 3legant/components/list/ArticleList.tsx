import ArticleCard from "../cards/ArticleCard";
import TextLinkButton from "../shared/TextLinkButton";

const ArticleList = () => {
  return (
    <div className="flex flex-col gap-10 container-1 w-full max-w-[1440px] pt-10 pb-10">
      <div>
        <h4 className="h4-medium">Articles</h4>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:flex-row md:gap-3 md:justify-start">
        <ArticleCard
          title="7 ways to decor your home"
          imgUrl="/assets/images/artcard1.svg"
          id={1}
        />
        <ArticleCard
          title="Kitchen organization"
          imgUrl="/assets/images/artcard1.svg"
          id={2}
        />
      </div>
    </div>
  );
};

export default ArticleList;
