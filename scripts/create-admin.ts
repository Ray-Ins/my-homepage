/**
 * Create a password-based admin, or promote an existing user to admin.
 *
 *   npm run admin:create -- admin@example.com "Jane Doe" "a-strong-password"
 *   npm run admin:create -- existing@example.com   (promote only)
 */
import "dotenv/config";
import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { authUser } from "../db/schema";
import { auth } from "../lib/auth";

async function main() {
  const [email, name, password] = process.argv.slice(2);
  if (!email) {
    console.error("Usage: npm run admin:create -- <email> [name] [password]");
    process.exit(1);
  }

  const [existing] = await db
    .select()
    .from(authUser)
    .where(eq(sql`lower(${authUser.email})`, email.toLowerCase()))
    .limit(1);

  if (existing) {
    await db
      .update(authUser)
      .set({ role: "admin", updatedAt: new Date() })
      .where(eq(authUser.id, existing.id));
    console.log(`Promoted ${existing.email} to admin.`);
    if (!existing.emailVerified) {
      console.log("Note: email is not verified yet; admin access requires a verified email.");
    }
    return;
  }

  if (!name || !password || password.length < 10) {
    console.error("New admin needs a name and a password of at least 10 characters.");
    process.exit(1);
  }

  const { user } = await auth.api.createUser({
    body: { email, password, name, role: "admin" },
  });
  await db
    .update(authUser)
    .set({ emailVerified: true, updatedAt: new Date() })
    .where(eq(authUser.id, user.id));
  console.log(`Created admin ${user.email}.`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
