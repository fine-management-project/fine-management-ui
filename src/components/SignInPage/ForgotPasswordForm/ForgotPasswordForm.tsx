"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useForgotPasswordForm } from "./hooks";
import { Alert, AlertTitle } from "@/components/ui/alert";
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
import { AlertCircleIcon } from "lucide-react";

type Props = {
  setIsForgotPassword: (value: boolean) => void;
};

const formSchema = z.object({
  email: z.email({
    message: "Please, provide a valid email!",
  }),
});

const ForgotPasswordForm = ({
  setIsForgotPassword,
}: Props): React.JSX.Element => {
  const { isLoading, handleSubmit, error, isSuccess } = useForgotPasswordForm();

  const form = useForm<{ email: string }>({
    disabled: isLoading,
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form className="" onSubmit={form.handleSubmit(handleSubmit)}>
        <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>

        <CardContent>
          {isSuccess ? (
            <p className="text-2xl text-green-700">
              Link to change the password was sent to your email
            </p>
          ) : (
            <>
              <FormField
                control={form?.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full mt-4 justify-self-center max-h-36">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
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

          <Button
            variant="link"
            type="button"
            className="mt-1 px-0"
            onClick={() => setIsForgotPassword(false)}
          >
            Back to sign in
          </Button>
        </CardContent>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
