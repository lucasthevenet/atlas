"use client";

export default function FormWithUseActionExample() {
  return (
    <div>
      <p>Check the console for the logger output.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" name="text" />
        <button type="submit">Run server action raw debugging</button>
      </form>
    </div>
  );
}
