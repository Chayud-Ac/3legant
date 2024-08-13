"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const findOptionKey = () => {
    for (const key in priceOptionRange) {
      const option = priceOptionRange[key];

      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");

      // Compare the minPrice and maxPrice from the URL with those in the option
      if (
        minPrice === option.minPrice.toString() &&
        maxPrice === option.maxPrice.toString()
      ) {
        return key; // Return the key if both minPrice and maxPrice match
      }
    }
    return null; // Return null if no match is found
  };

  const currentOption = findOptionKey();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: currentOption || "option1",
    },
  });

  // Use useEffect to reset the form values when currentOption changes
  useEffect(() => {
    form.reset({
      items: currentOption || "option1",
    });
  }, [currentOption, form]);

  const handleCheckboxChange = (value: string) => {
    console.log("Checkbox changed:", value);

    const optionObject = priceOptionRange[value];
    console.log(optionObject);
    if (value) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        queryObject: optionObject,
      });
      return router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["maxPrice", "minPrice"],
      });
      return router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <p className="medium-base text-dark-1">{title}</p>

      <Form {...form}>
        <form className="space-y-8">
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
                                handleCheckboxChange(newValue);
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
