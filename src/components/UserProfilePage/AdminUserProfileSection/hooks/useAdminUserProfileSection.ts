import { AdminRolesService } from "@/lib/api/admin/AdminRolesService/AdminRolesService";
import { AdminUserService } from "@/lib/api/admin/AdminUserService/AdminUserService";
import {
  UpdateUserBlockedStatusPayload,
  UpdateUserRolesPayload,
} from "@/lib/api/admin/AdminUserService/types";
import { ApiError } from "@/lib/api/types";
import { DropdownOption } from "@/lib/models/common/option";
import { RoleOptions } from "@/lib/models/role";
import { User } from "@/lib/models/user";
import { SessionContext } from "@/lib/session/SessionContext";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseSyntheticEvent, useContext, useState } from "react";

type Props = { user: User };

type HandleSaveVariables = {
  roles: string[];
  blocked: boolean;
};

export type UseAdminUserProfileSection = {
  isCurrentUserAdmin: boolean;
  rolesOptions: DropdownOption<string>[];
  isFetchingRoles: boolean;
  userRoleIds: string[];
  userBlocked: boolean;
  isEditingCurrentUser: boolean;
  editedUser: User;
  handleSave: (payload: HandleSaveVariables) => Promise<void>;
  isSaving: boolean;
};

const GET_ROLES_QUERY_KEY = "getRoles";

export const useAdminUserProfileSection = ({
  user,
}: Props): UseAdminUserProfileSection => {
  const [editedUser, setEditedUser] = useState(user);
  const { user: currentUser, setUser: setCurrentUser } =
    useContext(UserContext);
  const isCurrentUserAdmin =
    !!currentUser &&
    !!currentUser?.roles.find((role) => role.name === RoleOptions.admin);
  const isEditingCurrentUser = currentUser?.id === user.id;
  const { session } = useContext(SessionContext);

  const { data, isLoading: isFetchingRoles } = useQuery({
    queryKey: [GET_ROLES_QUERY_KEY],
    queryFn: async () => {
      const client = new AdminRolesService(session);

      return await client.getAllRoles();
    },
  });

  const rolesOptions: DropdownOption<string>[] =
    data?.data?.map(({ id, name }) => ({
      label: name,
      value: id,
    })) ?? [];

  const userRoleIds: string[] = editedUser?.roles.map(({ id }) => id) ?? [];

  const mutationUpdateRoles = useMutation<
    void,
    AxiosError<ApiError>,
    UpdateUserRolesPayload
  >({
    mutationFn: async (payload: UpdateUserRolesPayload): Promise<void> => {
      const client = new AdminUserService(session);

      const { data } = await client.updateUserRoles(user.id, payload);

      setEditedUser(data);

      if (isEditingCurrentUser) {
        setCurrentUser(data);
      }
    },
  });

  const mutationUpdateUserBlockedStatus = useMutation<
    void,
    AxiosError<ApiError>,
    UpdateUserBlockedStatusPayload
  >({
    mutationFn: async (
      payload: UpdateUserBlockedStatusPayload
    ): Promise<void> => {
      const client = new AdminUserService(session);

      const { data } = await client.updateUserBlockedStatus(user.id, payload);

      setEditedUser(data);

      if (isEditingCurrentUser) {
        setCurrentUser(data);
      }
    },
  });

  const handleSave = async (
    payload: HandleSaveVariables,
    event?: BaseSyntheticEvent
  ) => {
    event?.preventDefault();

    try {
      await mutationUpdateRoles.mutate({ roleIds: payload.roles });
      await mutationUpdateUserBlockedStatus.mutate({
        blocked: payload.blocked,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isCurrentUserAdmin,
    rolesOptions,
    isFetchingRoles,
    userRoleIds,
    userBlocked: !!editedUser?.blocked,
    isEditingCurrentUser,
    editedUser,
    handleSave,
    isSaving:
      mutationUpdateRoles.isPending ||
      mutationUpdateUserBlockedStatus.isPending,
  };
};
