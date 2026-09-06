import { LoginForm } from "@/app/login/login-form";
import { getCurrentUser } from "@/lib/auth/session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log in · Jr. Explorer",
};

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; notice?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  const { error, notice } = await searchParams;
  const confirmNotice = notice === "confirm" || error === "confirm";

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-md flex-1 px-4 py-10 sm:px-6">
        <section className="journal-panel rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Jr. Explorer
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Log in to keep exploring Science Olympiad.
          </p>
          <LoginForm confirmNotice={confirmNotice} />
        </section>
      </div>
    </main>
  );
}
