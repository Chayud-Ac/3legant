import React, { useEffect } from "react";
import {
  Form,
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Link from "next/link";
import { AddressFormSchema } from "@/lib/validation";
import { z } from "zod";
import { updateUserAddress } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";

interface AddressFormProps {
  control?: Control<any>;
  userId: string;
}

async function getAddress(userId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${userId}?q=address`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Cannot fetch the user");
    }
  } catch (error) {
    throw error;
  }
}

const AddressForm = ({ control, userId }: AddressFormProps) => {
  console.log(userId);
  const pathname = usePathname();
  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      street: "",
      country: "",
      city: "",
      state: "",
      zipCode: 0,
    },
  });

  const { reset } = form;

  useEffect(() => {
    console.log("userAddress");
    async function fetchAddress() {
      try {
        const userData = await getAddress(userId);
        console.log(userData);
        if (userData) {
          console.log(userData);
          reset({
            street: userData.data.street || "",
            country: userData.data.country || "",
            city: userData.data.city || "",
            state: userData.data.state || "",
            zipCode: userData.data.zipCode || "",
          });
        }
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchAddress();
    console.log("userAddress");
  }, [userId, reset]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AddressFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await updateUserAddress({
      userId: userId,
      updateData: values,
      path: pathname,
    });
  }

  if (!control) {
    return (
      <div className="flex flex-col gap-3 w-full md:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex flex-col gap-5 px-10 py-5 ">
              <p className="text-dark-2 medium-xl">Your Address</p>
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <span className="text-grey-1 medium-xs">
                        STREE ADDRESS
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Street Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="text-grey-1">
                    <FormLabel>
                      <span className="text-grey-2 medium-xs">COUNTRY</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                control={form.control}
                name="city"
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
                  control={form.control}
                  name="state"
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
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        <span className="text-grey-1 medium-xs">ZIP CODE</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Zip Code"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="btn-primary max-w-[200px]">Save Change</Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

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
