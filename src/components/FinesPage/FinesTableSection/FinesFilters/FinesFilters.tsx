"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { GetFinesFilters } from "@/lib/api/FineService/types";
import { FineStatus, FineType } from "@/lib/models/fine";
import { getDropdownOptionsFormObject } from "@/lib/utils/options";

type Props = {
  filters: GetFinesFilters;
  setFineFilters: (filters: GetFinesFilters) => void;
};

const FinesFilters = ({
  filters,
  setFineFilters,
}: Props): React.JSX.Element => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="fines-filters">
        <AccordionTrigger className="font-bold text-xl mb-2 w-full text-left cursor-pointer hover:underline">
          Filters
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <Input
            value={filters.issuerId ?? ""}
            placeholder="Issuer Id"
            onChange={(event) =>
              setFineFilters({
                ...filters,
                issuerId: event.target.value,
              })
            }
          />
          <div className="flex gap-2">
            <NativeSelect
              onChange={(event) => {
                setFineFilters({
                  ...filters,
                  type: event.target.value as FineType,
                });
              }}
              value={filters.type}
            >
              <NativeSelectOption value={""}>
                Select a fine type
              </NativeSelectOption>
              {getDropdownOptionsFormObject(FineType).map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <NativeSelect
              onChange={(event) => {
                setFineFilters({
                  ...filters,
                  status: event.target.value as FineStatus,
                });
              }}
              value={filters.status}
            >
              <NativeSelectOption value={""}>
                Select a fine status
              </NativeSelectOption>
              {getDropdownOptionsFormObject(FineStatus).map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FinesFilters;
