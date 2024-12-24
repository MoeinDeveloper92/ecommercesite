'use client';

import { Category } from '@/sanity.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface CategorySelectorProps {
  categories: Category[];
}

export function CategorySelectorComponent({
  categories,
}: CategorySelectorProps) {
  //we should set up threet ypes of state
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center spac-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded"
        >
          {value
            ? categories.find((category) => category._id === value)?.title
            : 'Filter By Category'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search Category"
            className="h-9"
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLocaleLowerCase()
                    .includes(e.currentTarget?.value.toLowerCase())
                );
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id);
                  router.push(`/categories/${selectedCategory.slug.current}`);
                  setOpen(false);
                }
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No Category found!</CommandEmpty>
            <CommandGroup>
              {categories.map((c) => (
                <CommandItem
                  key={c._id}
                  value={c.title}
                  onSelect={() => {
                    setValue(value === c._id ? '' : c._id);
                    router.push(`/categories/${c.slug?.current}`);
                    setOpen(false);
                  }}
                >
                  {c.title}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === c._id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
