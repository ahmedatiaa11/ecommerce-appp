type Category = {
  slug: string;
  name: string;
};

type catProps = {
  categories: Category[] | undefined;
  selectedCategory: string;
  onCategoryChange: (category: string | null) => void;
};
import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: catProps) {
  return (
    
    <div className= " ">
      <Select
        value={selectedCategory}
        onValueChange={onCategoryChange}
      >
        <SelectTrigger
        >
          <SelectValue className="items-center  " />
        </SelectTrigger>

        <SelectContent className=" rounded-lg shadow-lg bg-white">
          <SelectItem value="all">all </SelectItem>
          {categories?.map((item) => (
            <SelectItem key={item.slug} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
