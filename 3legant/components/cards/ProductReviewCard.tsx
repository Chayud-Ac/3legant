"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingsStars from "../shared/RatingsStars";
import ReplyForm from "../form/ReplyForm";
import { useEffect, useState } from "react";
import { ReplyState } from "../list/ProductReviewList";
import { getReviewReplies } from "@/lib/actions/review.action";
import { usePathname } from "next/navigation";
import { timeAgo } from "@/lib/utils";
import { Spinner } from "../shared/Spinner";
import Image from "next/image";

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
  likes: number;
  replies: Reply[];
  createdAt: string;
  hasMoreReply: boolean;
  setReplyObject: React.Dispatch<React.SetStateAction<ReplyState>>;
  userSession?: any;
  query: string | null;
}

const ProductReviewCard = ({
  _id,
  reviewUser,
  rating,
  comment,
  likes,
  replies,
  createdAt,
  hasMoreReply,
  setReplyObject,
  userSession,
  query,
}: ProductReviewCardProps) => {
  const [reply, setReply] = useState(false);
  const pathname = usePathname();
  const [currentBatch, setCurrentBatch] = useState(1);
  const [hasMoreFromSingleFetch, setHasMoreFromSingleFetch] = useState(true);
  const [repliesLoading, setRepliesLoading] = useState(false);

  const handleLoadMoreReply = async () => {
    setRepliesLoading(true);
    try {
      const result = await getReviewReplies({
        reviewId: _id,
        path: pathname.toString(),
        currentBatch,
        batchSize: 5,
      });

      if (result.success) {
        setReplyObject((prevState) => ({
          ...prevState,
          [_id]: [...(prevState[_id] || []), ...result.replies],
        })); // clone key ของ replyObject อันเก่า และ อัปเดต value ของ  reviewId (_id) key  โดย add  replies ใหม่ เข้าไป

        setHasMoreFromSingleFetch(result.hasMore); // set hasmore ของ reply เป็น ค่า ที่ return มาจาก result
        setCurrentBatch((prevState) => prevState + 1);
        setRepliesLoading(false);
      } else {
        setRepliesLoading(false);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setCurrentBatch(1); // batch ของ reply เหมือน page No
    setHasMoreFromSingleFetch(true);
  }, [query]);

  return (
    <div className="flex justify-start items-start w-full ">
      <div className="flex flex-row gap-3 w-full md:gap-5 bg-grey-4 p-4 rounded-lg">
        <Avatar className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
          <AvatarImage src={reviewUser.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 justify-start w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="medium-xl text-dark-1">{reviewUser.displayName}</p>
            <div className="flex flex-row gap-3 items-center">
              <span className="text-dark-1 medium-xs">
                {timeAgo(createdAt)}
              </span>
              {likes > 0 && <span>{likes}</span>}
            </div>
          </div>

          <RatingsStars rating={rating} />
          <p className="regular-sm text-grey-1">{comment}</p>
          <div className="flex flex-row gap-2">
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={16}
              height={16}
              className="w-[16px] h-[16px]"
            />
            <span
              className="regular-xs text-dark-4 cursor-pointer"
              onClick={() => setReply((prev) => !prev)}
            >
              reply
            </span>
          </div>
          {replies?.length > 0 ? (
            <div className="flex flex-col gap-4 justify-center w-full">
              {replies.map((reply, index) => (
                <div
                  className="flex flex-row mt-2 gap-4 items-center"
                  key={index}
                >
                  <Avatar className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                    <AvatarImage src={reply.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col w-full">
                    <div className="flex flex-row items-center justify-between w-full ">
                      <p className="medium-lg text-dark-1">
                        {reply.user.displayName}
                      </p>
                      <span className="text-dark-2 medium-xs">
                        {timeAgo(reply.createdAt)}
                      </span>
                    </div>
                    <p className="regular-sm text-grey-1">{reply.comment}</p>
                  </div>
                </div>
              ))}

              {hasMoreReply && hasMoreFromSingleFetch && (
                <div
                  className="flex items-center justify-center"
                  onClick={handleLoadMoreReply}
                >
                  <span className="medium-xs text-dark-4 text-center cursor-pointer px-2 py-1 hover:bg-grey-5 rounded-md duration-200">
                    load more replies
                  </span>
                </div>
              )}
              {repliesLoading && (
                <div className="flex items-center justify-center">
                  <Spinner size="small" className="text-dark-1" />
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          {reply && (
            <ReplyForm
              reviewId={_id}
              reply={reply}
              setReplyObject={setReplyObject}
              userSession={userSession}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
