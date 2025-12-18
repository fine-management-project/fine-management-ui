"use client";

import { User } from "@/lib/models/user";
import { Card, CardTitle } from "../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserProfileFormType, useUserProfileForm } from "./hooks";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useCountries } from "@/hooks/useCountries";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { BadgeAlertIcon, BadgeCheckIcon } from "lucide-react";

type Props = {
  user: User;
};

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name should be at least 2 characters!",
  }),
  lastName: z.string().min(2, {
    message: "Last name should be at least 2 characters!",
  }),
  countryId: z.int().positive({
    message: "Please, select a country!",
  }),
  age: z.int().min(18, {
    message: "Age should be 18 or more!",
  }),
  street: z.string().min(2, {
    message: "Street should have at least 2 characters long.",
  }),
  house: z.int().min(1, {
    message: "House should be 1 or more!",
  }),
  city: z.string().min(2, {
    message: "City should have at least 2 characters long.",
  }),
  apartment: z.int().min(1, {
    message: "Apartment should be 1 or more!",
  }),
});

const UserProfileFrom = ({ user }: Props): React.JSX.Element => {
  const {
    isEditingCurrentUser,
    editedUser,
    handleSave,
    isLoading,
    isRequestVerificationLoading,
    requestEmailVerification,
  } = useUserProfileForm({
    user,
  });
  const { countryOptions, isLoading: isCountryOptionsLoading } = useCountries();

  const form = useForm<UserProfileFormType>({
    disabled: isCountryOptionsLoading || !isEditingCurrentUser,
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: editedUser.address.street,
      city: editedUser.address.city,
      countryId: editedUser.address.country.id,
      house: editedUser.address.house,
      apartment: editedUser.address.apartment,
      lastName: editedUser.lastName,
      firstName: editedUser.firstName,
      age: editedUser.age,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <Card className="gap-2">
          <CardTitle className="mb-0">Info</CardTitle>
          <div className="flex gap-2 mb-3">
            {user.isEmailVerified ? (
              <Badge variant="outline" type="success">
                <BadgeCheckIcon />
                Email is Verified!
              </Badge>
            ) : (
              <Badge variant="outline" type="error">
                <BadgeAlertIcon />
                Email is
                <b className="italic">NOT</b> Verified!
              </Badge>
            )}
            {user.blocked ? (
              <Badge variant="outline" type="error">
                <BadgeCheckIcon />
                Account is blocked!
              </Badge>
            ) : (
              <Badge variant="outline" type="success">
                <BadgeAlertIcon />
                Account is active!
              </Badge>
            )}
          </div>
          <div>
            <Button
              className="p-0"
              variant={"link"}
              onClick={requestEmailVerification}
              type="button"
            >
              Request Email Verification
              {isRequestVerificationLoading && <Spinner />}
            </Button>
          </div>
          <div>
            Your email is <span className="font-bold italic">{user.email}</span>
          </div>
          <FormField
            control={form?.control}
            name="age"
            render={({ field }) => (
              <FormItem className="mb-2 max-h-36">
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form?.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mb-2 max-h-36">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form?.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-2 max-h-36">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form?.control}
            name="countryId"
            render={({ field, fieldState }) => (
              <FormItem className="mb-2 max-h-36">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <NativeSelect
                    onChange={(event) => {
                      field.onChange(Number(event.target.value));
                    }}
                    aria-invalid={fieldState.invalid}
                    value={field.value}
                    disabled={field.disabled}
                  >
                    <NativeSelectOption value={-1}>
                      Select a country
                    </NativeSelectOption>
                    {countryOptions.map((country) => (
                      <NativeSelectOption
                        key={country.value}
                        value={country.value}
                      >
                        {country.label}
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
            name="city"
            render={({ field }) => (
              <FormItem className="mb-2 max-h-36">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form?.control}
            name="street"
            render={({ field }) => (
              <FormItem className="mb-2 max-h-36">
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form?.control}
            name="house"
            render={({ field }) => (
              <FormItem className="mb-2 max-h-36">
                <FormLabel>House</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form?.control}
            name="apartment"
            render={({ field }) => (
              <FormItem className="mb-2 max-h-36">
                <FormLabel>Apartment</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-1/4 mb-2 cursor-pointer self-end h-10"
            type="submit"
            disabled={
              isCountryOptionsLoading || !isEditingCurrentUser || isLoading
            }
          >
            {isLoading && <Spinner />}
            Save
          </Button>
        </Card>
      </form>
    </Form>
  );
};

export default UserProfileFrom;
