"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const SearchInput = () => {
  const router = useRouter();
  const formSchema = z.object({
  search: z
    .string().optional()
})

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })
  

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (!data.search?.trim()) return;
    router.push(`/barbershops?search=${encodeURIComponent(data.search)}`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Pesquise pelos serviços desejados" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" size="icon" className="rounded-full" aria-label="Pesquisar">
          <SearchIcon/>
        </Button>
        </div>
        
      </form>
    </Form>
  );
};

export default SearchInput;