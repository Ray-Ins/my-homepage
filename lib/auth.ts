import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import {
  authUser,
  authSession,
  authAccount,
  authVerification,
} from "@/db/schema";
import { sendActionEmail } from "@/lib/mailer";

export const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: authUser,
      session: authSession,
      account: authAccount,
      verification: authVerification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 10,
    sendResetPassword: async ({ user, url }) => {
      await sendActionEmail({
        to: user.email,
        subject: "Reset your Inspire Partners password",
        heading: "Reset your password",
        body: "We received a request to reset your password. This link expires in 1 hour.",
        actionLabel: "Reset password",
        actionUrl: url,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendActionEmail({
        to: user.email,
        subject: "Verify your email for Inspire Partners",
        heading: "Verify your email",
        body: "Please confirm your email address to finish creating your account.",
        actionLabel: "Verify email",
        actionUrl: url,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (adminEmails.includes(user.email.toLowerCase())) {
            return { data: { ...user, role: "admin" } };
          }
          return { data: user };
        },
      },
    },
  },
  plugins: [admin(), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
