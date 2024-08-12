"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { priceOptionRange } from "@/constant/filter";

interface FilterDesktopProps {
  title: string;
  filter: {
    name: string;
    value: string;
  }[];
}

const FormSchema = z.object({
  items: z.string(),
});

const FilterPriceDesktop = ({ title, filter }: FilterDesktopProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: "option1", // Initial selected value
    },
  });

  // Function to log the value of the checkbox
  const handleCheckboxChange = (value: string) => {
    console.log("Checkbox changed:", value);
    // !!TODO use the value option1 , option2 , option3, to extract the value of those key in the priceOptionsRange then will receive the minValue and maxValue then we use that to form url query
  };

  return (
    <div className="flex flex-col w-full">
      <p className="medium-base text-dark-1">{title}</p>

      <Form {...form}>
        <form className="space-y-8 ">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormDescription className="hidden"></FormDescription>
                </div>
                {filter.map((item) => (
                  <FormField
                    key={item.value}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row items-center justify-between space-x-3 space-y-0"
                        >
                          <FormLabel className="font-normal">
                            {item.name}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              className={`${field.value === item.value && "bg-dark-1 text-light-1"}`}
                              checked={field.value === item.value}
                              onCheckedChange={(checked) => {
                                const newValue = checked ? item.value : "";
                                field.onChange(newValue);
                                handleCheckboxChange(newValue); // Log the value when it changes
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default FilterPriceDesktop;
