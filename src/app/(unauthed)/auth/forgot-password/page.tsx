import ChangePasswordForm from "@/components/ForgotPasswordPage/ChangePasswordForm";
import { Suspense } from "react";

const ForgotPasswordPage = (): React.JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordForm />
    </Suspense>
  );
};

export default ForgotPasswordPage;
