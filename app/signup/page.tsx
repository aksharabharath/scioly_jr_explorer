import { SignupForm } from "@/app/signup/signup-form";
import { getCurrentUser } from "@/lib/auth/session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create account · Jr. Explorer",
};

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/camp");
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-md flex-1 px-4 py-10 sm:px-6">
        <section className="journal-panel rounded-3xl p-6 sm:p-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Create your account
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Ask a grown-up to use their email. You can log back in any time.
          </p>
          <SignupForm />
        </section>
      </div>
    </main>
  );
}
