"use client";

import { useState } from "react";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";
import SignInForm from "../SignInForm";
import { Card } from "@/components/ui/card";

const SignInWrapper = (): React.JSX.Element => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <Card className="sm:w-full md:w-1/2 lg:w-1/3 h-max p-8">
      {isForgotPassword ? (
        <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} />
      ) : (
        <SignInForm setIsForgotPassword={setIsForgotPassword} />
      )}
    </Card>
  );
};

export default SignInWrapper;
