import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";

const ReplyForm = () => {
  return (
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
  );
};

export default ReplyForm;
