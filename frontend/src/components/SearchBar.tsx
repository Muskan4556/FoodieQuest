import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z
    .string({
      required_error: "Restaurant name is required",
    })
    .min(1),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery: string;
};

const SearchBar = ({ onSubmit, onReset, placeholder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { searchQuery: searchQuery },
  });

  // Watch for the value of 'searchQuery' input
  const searchQueryValue = form.watch("searchQuery");

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`form-container flex items-center flex-1 md:gap-3 justify-between flex-row border-2 rounded-lg md:p-3 px-2 py-1    ${
          form.formState.errors.searchQuery && "border-red-500"
        } `}
      >
        <Search
          strokeWidth={2.5}
          className="md:ml-1 text-orange-600 h-4  md:h-[1.85rem] md:w-[1.85rem] "
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none md:text-xl text-md focus-visible:ring-0 focus placeholder:text-md md:placeholder:text-xl placeholder:text-[16px]  placeholder:font-medium placeholder:tracking-tight "
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {searchQueryValue && (
          <Button
            onClick={handleReset}
            type="button"
            variant="ghost"
            className="rounded-lg text-orange-600 hover:underline hover:text-orange-500 md:text-base hidden md:block text-xs "
          >
            Clear
          </Button>
        )}
        <Button
            type="submit"
            variant="default"
            className="pt-[0.35rem] rounded-lg bg-orange-600  hover:bg-orange-500 md:text-base  md:block text-xs "
          >
            Search
          </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
