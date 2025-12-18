import EmailVerificationForm from "@/components/EmailVerificationPage/EmailVerificationForm";
import { Button } from "@/components/ui/button";
import { createServerSession } from "@/lib/session/server";

const EmailVerificationPage = async (): Promise<React.JSX.Element> => {
  const session = await createServerSession();

  return (
    <div className="h-96 text-center content-center">
      <EmailVerificationForm />
      <h2 className="text-2xl font-bold">
        If you do not want to verify the email, please, proceed back to other
        pages.
      </h2>
      <div className="flex justify-center gap-8 mt-8">
        <Button variant="link" className="text-4xl p-0 text-purple-800">
          <a href="/dashboard">Dashboard</a>
        </Button>

        {session.hasUserId() && (
          <Button variant="link" className="text-4xl p-0 text-purple-800">
            <a href={`/users/${session.getUserId()}`}>Profile</a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
