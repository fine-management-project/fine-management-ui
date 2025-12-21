"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { AlertCircleIcon } from "lucide-react";
import { useContext } from "react";
import { useChangeUserEmail } from "./hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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

const formSchema = z.object({
  newEmail: z.email({
    message: "Please, provide a valid email!",
  }),
});

const ChangeEmailForm = (): React.JSX.Element => {
  const { user } = useContext(UserContext);
  const { changeEmailToken, onSubmit, isLoading, error } = useChangeUserEmail();

  const form = useForm<{ newEmail: string }>({
    disabled: isLoading,
    resolver: zodResolver(formSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  return (
    <div className="mb-4">
      <h1 className="text-4xl font-bold text-purple-800">
        Hi, {user?.firstName ?? "User"}!
      </h1>
      {user?.id && changeEmailToken ? (
        <>
          <h2 className="text-2xl font-bold">
            To change the email, enter a new email and click submit button.
            After change is applied, you will need to sign in again.
          </h2>
          <Form {...form}>
            <form
              className="w-full justify-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form?.control}
                name="newEmail"
                render={({ field }) => (
                  <FormItem className="mb-4 w-96 mt-4 justify-self-center max-h-36">
                    <FormLabel>New Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="my-2 w-1/5 h-10 text-lg"
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
            </form>
          </Form>
        </>
      ) : (
        <h3 className="text-2xl">We cannot change your email at the moment.</h3>
      )}
    </div>
  );
};

export default ChangeEmailForm;
