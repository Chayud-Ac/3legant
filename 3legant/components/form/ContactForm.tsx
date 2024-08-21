import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";

interface ContactFormProps {
  control: Control<any>;
}

const ContactForm = ({ control }: ContactFormProps) => {
  return (
    <div className="flex flex-col gap-5 border rounded-md px-10 py-5 border-dark-1">
      <p className="text-dark-2 medium-xl">Contact Information</p>
      <div className="flex flex-row gap-10">
        <FormField
          control={control}
          name="contact.firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <span className="text-grey-1 medium-xs">FIRST NAME</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="contact.lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <span className="text-grey-1 medium-xs">LAST NAME</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="contact.phoneNumber"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>
              <span className="text-grey-1 medium-xs">PHONE NUMBER</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Phone Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="contact.emailAddress"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>
              <span className="text-grey-1 medium-xs">EMAIL ADDRESS</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Your Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactForm;
