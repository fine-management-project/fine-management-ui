import { Button } from "@/components/ui/button";
import { auth0 } from "@/lib/auth0";
import Link from "next/link";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-stone-800 text-stone-50">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-center">
        <div className="text-center">
          <h1 className="text-8xl text-stone-100 font-bold mb-4 italic">
            Fine Management App UI
          </h1>
          <h2 className="text-2xl text-stone-100 mb-32">
            Manage your fines & taxes in one place!
          </h2>
          {!session && (
            <Button variant="link" className="text-4xl text-purple-400">
              <a href="/auth/login">Login</a>
            </Button>
          )}
          {session && (
            <div className="flex justify-center text-purple-400">
              <Link href="/dashboard" className="text-4xl text-purple-400 hover:underline">
                Go to the Dashboard
              </Link>
              <span className="text-4xl ml-4">|</span>
              <Button variant="link" className="text-4xl text-purple-400">
                <a href="/auth/logout">Log out</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div className="text-4xl">
          <span className="font-bold">Project&apos;s GitHub -</span>{" "}
          <a
            href="https://github.com/fine-management-project"
            className="text-purple-400"
          >
            https://github.com/fine-management-project
          </a>
        </div>
      </footer>
    </div>
  );
}
