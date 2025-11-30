"use client";
import { Input } from "@/components/ui/input";
import {
  UsersFilters as UsersFiltersType,
  useUsersPageContext,
} from "../context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMemo, useState } from "react";
import debounce from "lodash.debounce";

const DEBOUNCE_TIME = 300;

const UsersFilters = (): React.JSX.Element => {
  const { filters, setFilters } = useUsersPageContext();
  const [filterValues, setFilterValues] = useState({ ...filters });

  const updateFilters = useMemo(
    () =>
      debounce((newFilters: Partial<UsersFiltersType>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
      }, DEBOUNCE_TIME),
    [setFilters]
  );

  const onChangeFilter = (newFilters: Partial<UsersFiltersType>) => {
    setFilterValues((prev) => ({ ...prev, ...newFilters }));
    updateFilters(newFilters);
  };

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
            value={filterValues.searchTerm}
            placeholder="Search Term"
            onChange={(event) =>
              onChangeFilter({
                searchTerm: event.target.value,
              })
            }
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UsersFilters;
