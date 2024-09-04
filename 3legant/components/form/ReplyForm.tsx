"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { replyReview } from "@/lib/actions/review.action";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReplyState } from "../list/ProductReviewList";
import { useToast } from "../ui/use-toast";

interface ReplyFormProps {
  reviewId: string;
  reply: boolean;
  setReplyObject: React.Dispatch<React.SetStateAction<ReplyState>>;
  userSession: any;
}

const ReplyForm = ({
  reviewId,
  reply,
  setReplyObject,
  userSession,
}: ReplyFormProps) => {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const pathname = usePathname();
  const { toast } = useToast();

  const handleReplySubmit = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Please Login before reply",
      });
      return null;
    } else {
      try {
        const result = await replyReview({
          reviewId,
          userId: userSession?.user?.id,
          comment,
          path: pathname.toString(),
        });

        const newReplyObject = result.parseNewReply;

        setReplyObject((prevState) => ({
          ...prevState,
          [reviewId]: [
            ...(prevState[reviewId] || []),
            {
              user: {
                _id: userSession.user.id,
                displayName: userSession.user.displayName,
                image: userSession.user.image,
              },
              comment: newReplyObject.comment,
              createdAt: newReplyObject.createdAt,
              _id: newReplyObject._id,
            },
          ],
        }));

        setComment("");
      } catch (error) {
        console.error("Failed to submit reply:", error);
        throw new Error("An error occurred while submitting the reply.");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit();
    }
  };

  return (
    <div
      className={`flex flex-row mt-2 gap-4 items-center transition-opacity duration-500 ease-in-out`}
    >
      <Avatar className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
        {userSession?.user?.image && (
          <AvatarImage src={userSession.user.image} />
        )}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col w-full">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your reply"
          className="border-none bg-grey-5"
        />
      </div>
    </div>
  );
};

export default ReplyForm;
