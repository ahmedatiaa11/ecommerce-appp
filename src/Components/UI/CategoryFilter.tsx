import type { Category } from "../../Types/Product";

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
    
    <div className="min-w-48">
      <Select
        value={selectedCategory}
        onValueChange={onCategoryChange}
      >
        <SelectTrigger
        >
          <SelectValue className="items-center  " />
        </SelectTrigger>

        <SelectContent className=" rounded-lg shadow-lg bg-white">
          <SelectItem value="all">All categories</SelectItem>
          {categories?.map((item) => (
            <SelectItem key={item.slug} value={item.slug}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
