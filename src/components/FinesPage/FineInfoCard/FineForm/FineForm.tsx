"use client";

import { Fine, FineStatus, FineType } from "@/lib/models/fine";
import { useFineForm } from "../hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { getDropdownOptionsFormObject } from "@/lib/utils/options";
import { Currency } from "@/lib/models/currency";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Dispatch, SetStateAction } from "react";

type Props = {
  fine: Fine | null;
  userId: string;
  setSelectedFine: Dispatch<SetStateAction<Fine | null>>;
};

const FineForm = ({
  fine,
  userId,
  setSelectedFine,
}: Props): React.JSX.Element => {
  const { form, isEditStatusDisabled, handleSubmit, isLoading, error } =
    useFineForm({ fine, userId, setSelectedFine });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {fine && (
          <div>
            <div className="mb-1">
              <span className="italic">Fine Id:</span>{" "}
              <span className="font-bold">{fine.id}</span>
            </div>
            <div className="mb-1">
              <span className="italic">Issuer Id:</span>{" "}
              <span className="font-bold">{fine.issuerId}</span>
            </div>
            <div className="mb-1">
              <span className="italic">User Id:</span>{" "}
              <span className="font-bold">{fine.userId}</span>
            </div>
            <div className="mb-1">
              <span className="italic">Created At:</span>{" "}
              <span className="font-bold">{fine.createdAt}</span>
            </div>
            <div className="mb-1">
              <span className="italic">Updated At:</span>{" "}
              <span className="font-bold">{fine.updatedAt}</span>
            </div>
            {fine.fineDocUrl && (
              <div className="mt-2 mb-2 text-lg underline text-blue-600">
                <a href={fine.fineDocUrl} className="italic">
                  Document to Sign Link
                </a>
              </div>
            )}
          </div>
        )}

        <FormField
          control={form?.control}
          name="reason"
          render={({ field }) => (
            <FormItem className="mb-4 w-full mt-4 justify-self-center max-h-36">
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form?.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="mb-4 w-full mt-4 justify-self-center max-h-36">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(event) => {
                    field.onChange(Number(event.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form?.control}
          name="currency"
          render={({ field, fieldState }) => (
            <FormItem className="mb-4 max-h-36">
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <NativeSelect
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  disabled={field.disabled}
                >
                  <NativeSelectOption value={-1}>
                    Select a currency
                  </NativeSelectOption>
                  {getDropdownOptionsFormObject(Currency).map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form?.control}
          name="type"
          render={({ field, fieldState }) => (
            <FormItem className="mb-4 max-h-36">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <NativeSelect
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  disabled={field.disabled}
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form?.control}
          name="status"
          disabled={isEditStatusDisabled}
          render={({ field, fieldState }) => (
            <FormItem className="mb-4 max-h-36">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <NativeSelect
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  disabled={field.disabled}
                >
                  <NativeSelectOption value={""}>
                    Select a fine status
                  </NativeSelectOption>
                  {getDropdownOptionsFormObject(FineStatus).map((option) => (
                    <NativeSelectOption
                      key={option.value}
                      value={option.value}
                      disabled={
                        !(
                          option.value === FineStatus.NEW ||
                          option.value === FineStatus.CLOSED
                        )
                      }
                    >
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <FormMessage>{error}</FormMessage>}

        <div className="mt-2">
          <Button disabled={form.formState.disabled} size="lg" type="submit">
            Save
            {isLoading && <Spinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FineForm;
