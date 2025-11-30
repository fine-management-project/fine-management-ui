"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSignIn } from "./hooks/useSignIn";
import { Spinner } from "@/components/ui/spinner";
import { SignInPayload } from "@/lib/api/AuthService/types";
import { BaseSyntheticEvent } from "react";
import PasswordInput from "@/components/common/PasswordInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.email({
    message: "Please, provide a valid email!",
  }),
  password: z.string().min(1, {
    message: "Password should not be empty!",
  }),
});

const SignInForm = (): React.JSX.Element => {
  const { onSignIn, loading, error } = useSignIn();

  const form = useForm<SignInPayload>({
    disabled: loading,
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (payload: SignInPayload, event?: BaseSyntheticEvent) => {
    event?.preventDefault();

    onSignIn(payload);
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex justify-center"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Card className="sm:w-full md:w-1/2 lg:w-1/3 h-max p-8">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardContent>
            <FormField
              control={form?.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
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
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default SignInForm;
