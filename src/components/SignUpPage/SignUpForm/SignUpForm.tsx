"use client";

import PasswordInput from "@/components/common/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { SignUpPayload } from "@/lib/api/AuthService/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useSignUp } from "./hooks/useSignUp";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const formSchema = z
  .object({
    email: z.email({
      message: "Please, provide a valid email!",
    }),
    password: z.string().min(8, {
      message: "Password should be at least 8 characters!",
    }),
    confirmPassword: z.string(),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password should be the same as password!",
  });

export type SignUpFormPayload = SignUpPayload & {
  confirmPassword: string;
};

const SignUpForm = (): React.JSX.Element => {
  const { loading, onSignUp, countryOptions, error } = useSignUp();
  const form = useForm<SignUpFormPayload>({
    disabled: loading,
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      street: "",
      city: "",
      countryId: -1,
      house: 0,
      apartment: 0,
      lastName: "",
      firstName: "",
      age: 18,
    },
  });

  const handleSubmit = (
    payload: SignUpFormPayload,
    event?: BaseSyntheticEvent
  ) => {
    event?.preventDefault();

    onSignUp({
      ...payload,
      countryId: Number(payload.countryId),
    });
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex justify-center"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Card className="sm:w-full md:w-1/2 lg:w-1/2 h-max p-8 ">
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form?.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4 max-h-36">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form?.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="mb-4 max-h-36">
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
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4 max-h-36">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form?.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-4 max-h-36">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form?.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="mb-4 max-h-36">
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
                  <FormItem className="mb-4 max-h-36">
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
                  <FormItem className="mb-4 max-h-36">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <NativeSelect
                        onChange={(event) => {
                          field.onChange(Number(event.target.value));
                        }}
                        aria-invalid={fieldState.invalid}
                        value={field.value}
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
                  <FormItem className="mb-4 max-h-36">
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
                  <FormItem className="mb-4 max-h-36">
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
                  <FormItem className="mb-4 max-h-36">
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
                  <FormItem className="mb-4 max-h-36">
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
            </div>

            <Button
              className="w-full mb-4 cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading && <Spinner />}
              Submit
            </Button>
            {error && <FormMessage>{error}</FormMessage>}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default SignUpForm;
