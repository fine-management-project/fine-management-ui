"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
import { useAdminUserProfileSection } from "./hooks";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { User } from "@/lib/models/user";

type Props = {
  user: User;
};

const formSchema = z.object({
  roles: z.array(z.string()).min(1, {
    message: "At least one role should be selected!",
  }),
  blocked: z.boolean(),
});

const AdminUserProfileSection = ({ user }: Props): React.JSX.Element | null => {
  const {
    isCurrentUserAdmin,
    rolesOptions,
    isFetchingRoles,
    userRoleIds,
    userBlocked,
    isEditingCurrentUser,
    handleSave,
    isSaving,
  } = useAdminUserProfileSection({ user });

  const form = useForm({
    disabled: isFetchingRoles,
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: userRoleIds,
      blocked: userBlocked,
    },
  });

  return isCurrentUserAdmin ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <Card>
          <CardTitle>Admin Section</CardTitle>
          <FormField
            control={form?.control}
            name="roles"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Roles</FormLabel>
                <FormControl>
                  <MultiSelect
                    {...field}
                    options={rolesOptions}
                    disabled={isFetchingRoles}
                    value={field.value}
                    defaultValue={userRoleIds}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isEditingCurrentUser && (
            <FormField
              control={form?.control}
              name="blocked"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Blocked</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      defaultChecked={userBlocked}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            className="w-1/4 mb-4 cursor-pointer self-end h-10"
            type="submit"
            disabled={isFetchingRoles || isSaving}
          >
            {(isFetchingRoles || isSaving) && <Spinner />}
            Save
          </Button>
        </Card>
      </form>
    </Form>
  ) : null;
};

export default AdminUserProfileSection;
