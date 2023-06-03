import { db, sql, users } from "@acme/db";

export default async function FormWithUseActionExample() {
  console.log(
    db
      .insert(users)
      .values([
        {
          id: 1,
          fullName: "John Doe",
          phone: "123-456-7890",
        },
      ])
      .onConflictDoUpdate({
        target: users.id,
        set: {
          fullName: sql`EXCLUDED.fullName`,
          phone: sql`EXCLUDED.phone`,
        },
      })
      .execute(),
  );

  return (
    <div>
      <p>Check the console for the logger output.</p>
      <form>
        <input type="text" name="text" />
        <button type="submit">Run server action raw debugging</button>
      </form>
    </div>
  );
}
