import { UserService } from "@/lib/api/UserService/UserService";
import { User } from "@/lib/models/user";
import { SessionContext } from "@/lib/session/SessionContext";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useContext, useState } from "react";

type Props = {
  user: User;
};

export type UserProfileFormType = {
  firstName: string;
  lastName: string;
  countryId: number;
  age: number;
  street: string;
  house: number;
  city: string;
  apartment: number;
};

export type UseUserProfileForm = {
  isEditingCurrentUser: boolean;
  editedUser: User;
  handleSave: (payload: UserProfileFormType) => void;
  isLoading: boolean;
};

export const useUserProfileForm = ({ user }: Props): UseUserProfileForm => {
  const [editedUser, setEditedUser] = useState(user);
  const { user: currentUser, setUser: setCurrentUser } =
    useContext(UserContext);
  const { session } = useContext(SessionContext);
  const isEditingCurrentUser = currentUser?.id === user.id;

  const mutationUpdateCommonFields = useMutation<
    void,
    AxiosError<ApiError>,
    UserProfileFormType
  >({
    mutationFn: async (payload: UserProfileFormType): Promise<void> => {
      const client = new UserService(session);

      const { data } = await client.updateUserCommonFields(editedUser.id, {
        firstName: payload.firstName,
        lastName: payload.lastName,
        age: payload.age,
        address: {
          street: payload.street,
          house: payload.house,
          city: payload.city,
          apartment: payload.apartment,
          countryId: payload.countryId,
        },
      });

      setEditedUser(data);

      if (isEditingCurrentUser) {
        setCurrentUser(data);
      }
    },
  });

  const handleSave = async (payload: UserProfileFormType) => {
    try {
      await mutationUpdateCommonFields.mutate(payload);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isEditingCurrentUser,
    editedUser,
    handleSave,
    isLoading: mutationUpdateCommonFields.isPending,
  };
};
