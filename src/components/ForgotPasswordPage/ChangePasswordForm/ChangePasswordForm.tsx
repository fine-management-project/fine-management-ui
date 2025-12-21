"use client";
import PasswordInput from "@/components/common/PasswordInput";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { ChangePasswordFormData, useChangePasswordForm } from "./hooks";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircleIcon } from "lucide-react";

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password should be at least 8 characters!",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password should be the same as password!",
  });

const ChangePasswordForm = (): React.JSX.Element => {
  const { isLoading, isSuccess, handleSubmit, error } = useChangePasswordForm();

  const form = useForm<ChangePasswordFormData>({
    disabled: isLoading,
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <Card className="sm:w-full md:w-1/2 lg:w-1/3 h-max p-8">
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(handleSubmit)}>
          <CardTitle className="text-2xl text-center">
            Forgot Password
          </CardTitle>

          {isSuccess ? (
            <>
              <p className="text-2xl text-green-700">
                Your password was successfully updated. Please, proceed to
                sign-in.
              </p>
              <Button variant="link" className="text-lg px-0 mt-1">
                <a href="/auth/sign-in">Sign In</a>
              </Button>
            </>
          ) : (
            <>
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

              <Button
                className="w-full mb-4 cursor-pointer"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
                Submit
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
            </>
          )}
        </form>
      </Form>
    </Card>
  );
};

export default ChangePasswordForm;
