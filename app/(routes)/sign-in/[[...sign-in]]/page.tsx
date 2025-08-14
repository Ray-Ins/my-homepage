"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <SignIn
        signUpUrl="/sign-up"
        routing="hash"
        appearance={{
          elements: {
            footer: { display: "none" }, // hides the entire footer (sign-up prompt)
          },
        }}
      />
    </div>
  );
}
