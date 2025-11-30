import { Button } from "@/components/ui/button";

const UnauthenticatedPage = (): React.JSX.Element => {
  return (
    <div className="h-[calc(100vh_-_50vh)] content-center">
      <h1 className="text-6xl">Oops!</h1>
      <h2 className="text-5xl">It seems like your session is expired!</h2>
      <div className="flex gap-8 mt-8">
        <Button variant="link" className="text-4xl p-0 text-purple-800">
          <a href="/auth/sign-in">Sign In</a>
        </Button>

        <Button variant="link" className="text-4xl p-0 text-purple-800">
          <a href="/auth/sign-up">Sign Up</a>
        </Button>

        <Button variant="link" className="text-4xl p-0 text-purple-800">
          <a href="/home">Home</a>
        </Button>
      </div>
    </div>
  );
};

export default UnauthenticatedPage;
