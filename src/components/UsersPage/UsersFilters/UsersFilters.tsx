"use client";
import { Input } from "@/components/ui/input";
import { useUsersPageConext } from "../context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UsersFilters = (): React.JSX.Element => {
  const { filters, setFilters } = useUsersPageConext();

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="filters">
        <AccordionTrigger className="font-bold text-xl mb-2 w-full text-left cursor-pointer hover:underline">
          Filters
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <Input
            value={filters.searchTerm}
            placeholder="Search Term"
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                searchTerm: event.target.value,
              }))
            }
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UsersFilters;
