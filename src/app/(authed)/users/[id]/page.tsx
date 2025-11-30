import AdminUserProfileSection from "@/components/UserProfilePage/AdminUserProfileSection";
import UserProfileFrom from "@/components/UserProfilePage/UserProfileForm/UserProfileForm";
import { getPageData } from "./data";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ROUTES, RoutesId } from "@/routes";

type Props = {
  params: Promise<{ id: string }>;
};

const UserProfilePage = async ({ params }: Props) => {
  const { id } = await params;

  const { data: user, error } = await getPageData(id);

  if (error || !user) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to load the user!</AlertTitle>
        <AlertDescription>{error?.response?.data.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full">
      <div className="flex content-center gap-2">
        <h1 className="font-bold text-2xl mb-4">User Profile</h1>
        <ArrowRight className="align-baseline h-8" />
        <Link
          href={ROUTES[RoutesId.fines].url.replace(":id", id)}
          className="text-2xl text-purple-800 hover:underline"
        >
          Go to fines
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <UserProfileFrom user={user} />
        </div>
        <div className="w-1/2">
          <AdminUserProfileSection user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
