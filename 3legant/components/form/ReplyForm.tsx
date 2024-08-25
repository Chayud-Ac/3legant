"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { replyReview } from "@/lib/actions/review.action";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface ReplyFormProps {
  reviewId: string;
  reply: boolean;
  setReplyObject: (value: any) => void;
}

const ReplyForm = ({ reviewId, reply, setReplyObject }: ReplyFormProps) => {
  const { data: session, status } = useSession();

  const [comment, setComment] = useState("");

  const pathname = usePathname();

  const handleReplySubmit = async () => {
    if (!session?.user?.id) {
      console.log("Please login");
    } else {
      try {
        const newReply = await replyReview({
          reviewId,
          userId: session?.user?.id,
          comment,
          path: pathname.toString(),
        });

        setComment("");

        console.log(newReply);
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
        <AvatarImage src="https://github.com/shadcn.png" />
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
