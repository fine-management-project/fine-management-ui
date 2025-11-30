"use server";
import { cookies } from "next/headers";
import { Session, TOKEN_SLUG, USER_ID_SLUG } from "./Session";

export const createServerSession = async (): Promise<Session> => {
  const token = (await cookies()).get(TOKEN_SLUG);
  const userId = (await cookies()).get(USER_ID_SLUG);

  return new Session(token?.value, userId?.value);
};
