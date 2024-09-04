import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface PaymentSelectionFormProps {
  control?: Control<any>;
}

const PaymentSelectionForm = ({ control }: PaymentSelectionFormProps) => {
  return (
    <div className="flex flex-col border rounded-md px-10 py-5 border-dark-1">
      <FormField
        control={control}
        name="payment"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              <span className="text-dark-1 medium-lg">
                Select Payment Method
              </span>
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex flex-row w-full justify-between items-center border-grey-4 border rounded-lg pl-4 pr-4 pt-3 pb-3 shadow-sm">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="stripe" />
                    </FormControl>
                    <FormLabel>
                      <span className="text-grey-2 regular-sm">
                        VISA (stripe)
                      </span>
                    </FormLabel>
                  </FormItem>
                </div>
                <div className="flex flex-row w-full justify-between items-center border-grey-4 border rounded-lg pl-4 pr-4 pt-3 pb-3 shadow-sm">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="cash" />
                    </FormControl>
                    <FormLabel className="text-dark-1 medium-sm">
                      <span className="text-grey-2 regular-sm">Cash</span>
                    </FormLabel>
                  </FormItem>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PaymentSelectionForm;
