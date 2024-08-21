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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactFormProps {
  control: Control<any>;
}

const AddressForm = ({ control }: ContactFormProps) => {
  return (
    <div className="flex flex-col gap-5 border rounded-md px-10 py-5 border-dark-1">
      <p className="text-dark-2 medium-xl">Shipping Address</p>
      <FormField
        control={control}
        name="address.street"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>
              <span className="text-grey-1 medium-xs">STREE ADDRESS</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Street Address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="address.country"
        render={({ field }) => (
          <FormItem className="text-grey-1">
            <FormLabel>
              <span className="text-grey-2 medium-xs">COUNTRY</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="COUNTRY" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Thailand">Thailand</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="address.city"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>
              <span className="text-grey-1 medium-xs">TOWN / CITY</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="TOWN / CITY" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-row gap-10">
        <FormField
          control={control}
          name="address.state"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <span className="text-grey-1 medium-xs">STATE</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address.zipCode"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <span className="text-grey-1 medium-xs">ZIP CODE</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Zip Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressForm;
