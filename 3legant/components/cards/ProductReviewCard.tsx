import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingsStars from "../shared/RatingsStars";
import { Textarea } from "../ui/textarea";

const ProductReviewCard = () => {
  return (
    <div className="flex justify-start items-start w-full pt-10">
      <div className="flex flex-row gap-3 md:gap-8 bg-grey-4 p-4 rounded-lg">
        <Avatar className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 justify-start w-full">
          <p className="medium-xl text-dark-1">Chayud Mahithiphark</p>
          <RatingsStars rating={5} />
          <p className="regular-sm text-grey-1">
            I bought it 3 weeks ago and now come back just to say “Awesome
            Product”. I really enjoy it. At vero eos et accusamus et iusto odio
            dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupt et quas molestias excepturi sint non provident.
          </p>
          <div className="flex flex-row gap-2">
            <span className="regular-xs text-dark-4">Like</span>
            <span className="regular-xs text-dark-4">reply</span>
          </div>
          <div className="flex flex-col gap-4 justify-center w-full">
            <div className="flex flex-row mt-2 gap-4 items-center ">
              <Avatar className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <p className="medium-lg text-dark-1">Chayud Mahithiphark</p>
                <p className="regular-sm text-grey-1">
                  Agree , I also think consistancy , petient , dedication ,
                  curiosity , and hardwork will eventually lead you to success !
                </p>
              </div>
            </div>
            {/* the reply document will add more if the load more reply is click */}
            {/* <div className="flex flex-row mt-2 gap-4 items-center ">
              <Avatar className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <p className="medium-lg text-dark-1">Chayud Mahithiphark</p>
                <p className="regular-sm text-grey-1">
                  Agree , I also think consistancy , petient , dedication ,
                  curiosity , and hardwork will eventually lead you to success !
                </p>
              </div>
            </div> */}
            <span className="medium-xs text-dark-4 text-center">
              load more reply
            </span>
            <div className="flex flex-row mt-2 gap-4 items-center ">
              <Avatar className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col w-full">
                <Textarea
                  placeholder="Write your reply"
                  className="border-none bg-grey-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
