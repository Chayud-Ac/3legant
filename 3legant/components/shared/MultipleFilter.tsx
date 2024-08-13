import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MultipleFilterProps {
  title: string;
  filter: {
    name: string;
    value: string;
  }[];
  optionMap: {
    [key: string]: {
      [subKey: string]: any;
    };
  };
  otherClasses?: string;
  containerClasses?: string;
}

const MultipleFilter = ({
  title,
  filter,
  optionMap,
  otherClasses,
  containerClasses,
}: MultipleFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Function to find the corresponding option key in optionMap based on URL parameters
  const findOptionKey = () => {
    for (const key in optionMap) {
      const option = optionMap[key];
      let matches = true;

      // Check if all the keys in the current option match the URL parameters
      for (const subKey in option) {
        const urlValue = searchParams.get(subKey);
        if (
          urlValue === null ||
          urlValue.toString() !== option[subKey].toString()
        ) {
          matches = false;
          break;
        }
      }

      if (matches) {
        return key;
      }
    }
    return null; // Return null if no match is found
  };

  const currentOption = findOptionKey();

  const handleUpdateParams = (value: string) => {
    const optionObject = optionMap[value];
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      queryObject: optionObject,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`flex relative ${containerClasses}`}>
      <p className="text-grey-2 medium-xs">{title}</p>
      <Select
        onValueChange={(value) => handleUpdateParams(value)}
        value={currentOption || undefined}
      >
        <SelectTrigger className={`${otherClasses}`}>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent className={`absolute`}>
          {filter.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="text-grey-1 regular-base hover:text-dark1 hover:medium-sm "
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MultipleFilter;
