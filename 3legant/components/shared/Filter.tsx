import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterProps {
  title: string;
  filter: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({
  title,
  filter,
  otherClasses,
  containerClasses,
}: FilterProps) => {
  return (
    <div className={`flex relative ${containerClasses}`}>
      <p className="text-grey-2 medium-xs">{title}</p>
      <Select>
        <SelectTrigger className={`${otherClasses}`}>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent className={`absolute`}>
          {filter.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="text-grey-1 regular-base hover:text-dark1 hover:medium-sm"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
