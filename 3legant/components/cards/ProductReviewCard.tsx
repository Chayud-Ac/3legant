"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingsStars from "../shared/RatingsStars";
import ReplyForm from "../form/ReplyForm";
import { useState } from "react";

interface Reply {
  user: {
    _id: string;
    displayName?: string;
    image?: string;
  };
  comment: string;
  createdAt: string;
  _id: string;
}

interface ProductReviewCardProps {
  _id: string;
  reviewUser: {
    _id: string;
    displayName: string;
    image: string;
  };
  rating: number;
  comment: string;
  likes?: number;
  replies: Reply[];
  createdAt: string;
  setReplyObject: (value: any) => void;
}

const ProductReviewCard = ({
  _id,
  reviewUser,
  rating,
  comment,
  likes,
  replies,
  createdAt,
  setReplyObject,
}: ProductReviewCardProps) => {
  const [reply, setReply] = useState(false);

  return (
    <div className="flex justify-start items-start w-full ">
      <div className="flex flex-row gap-3 w-full md:gap-5 bg-grey-4 p-4 rounded-lg">
        <Avatar className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
          <AvatarImage src={reviewUser.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 justify-start w-full">
          <p className="medium-xl text-dark-1">{reviewUser.displayName}</p>
          <RatingsStars rating={rating} />
          <p className="regular-sm text-grey-1">{comment}</p>
          <div className="flex flex-row gap-2">
            <span className="regular-xs text-dark-4 cursor-pointer">Like</span>
            <span
              className="regular-xs text-dark-4 cursor-pointer"
              onClick={() => setReply((prev) => !prev)}
            >
              reply
            </span>
          </div>
          {replies?.length > 0 ? (
            <div className="flex flex-col gap-4 justify-center w-full">
              {replies.map((reply) => (
                <div
                  className="flex flex-row mt-2 gap-4 items-center"
                  key={reply._id}
                >
                  <Avatar className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                    <AvatarImage src={reply.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="medium-lg text-dark-1">
                      {reply.user.displayName}
                    </p>
                    <p className="regular-sm text-grey-1">{reply.comment}</p>
                  </div>
                </div>
              ))}
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
              <div className="flex items-center justify-center">
                <span className="medium-xs text-dark-4 text-center cursor-pointer px-2 py-1 hover:bg-grey-5 rounded-md duration-200">
                  load more reply
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {reply && (
            <ReplyForm
              reviewId={_id}
              reply={reply}
              setReplyObject={setReplyObject}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
