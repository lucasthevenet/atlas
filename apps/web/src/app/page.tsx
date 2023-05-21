"use client";

import { useAction } from "trpc-api";

import { action } from "~/trpc/server";

export default function FormWithUseActionExample() {
  const mutation = useAction(action.example.greeting.mutate);
  return (
    <div>
      <p>Check the console for the logger output.</p>
      <form
        action={action.example.greeting.mutate}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          mutation.mutate(formData);
        }}
      >
        <input type="text" name="text" />
        <button type="submit">Run server action raw debugging</button>

        <pre
          style={{
            overflowX: "scroll",
          }}
        >
          {JSON.stringify(mutation, null, 4)}
        </pre>
      </form>
    </div>
  );
}
