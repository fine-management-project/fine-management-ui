"use client";

import { Button } from "@/components/ui/button";
import { UserContext } from "@/lib/state/UserContext/UserContext";
import { useContext } from "react";
import { useVerifyEmail } from "./hooks";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const EmailVerificationForm = (): React.JSX.Element => {
  const { user } = useContext(UserContext);
  const { verificationToken, onVerify, isLoading, error } = useVerifyEmail();

  return (
    <div className="mb-4">
      <h1 className="text-4xl font-bold text-purple-800">
        Hi, {user?.firstName ?? "User"}!
        {user?.isEmailVerified && (
          <p className="text-2xl text-green-700">Your email is verified!</p>
        )}
      </h1>
      {!user?.isEmailVerified ? (
        user?.id && verificationToken ? (
          <>
            <h2 className="text-2xl font-bold">
              To verify the email, click the button below.
            </h2>

            <Button
              className="my-8 w-1/5 h-14 text-2xl"
              onClick={onVerify}
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              Verify
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
          </>
        ) : (
          <h3 className="text-2xl">
            We cannot verify your email at the moment.
          </h3>
        )
      ) : null}
    </div>
  );
};

export default EmailVerificationForm;
