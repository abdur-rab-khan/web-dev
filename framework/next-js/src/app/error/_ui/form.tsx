"use client";
import React, { useActionState } from "react";

interface FormProps {
  onSubmit: (
    state: { message: string },
    formData: FormData,
  ) => Promise<{ message: string }>;
}

function Form({ onSubmit }: FormProps) {
  const [state, formAction, pending] = useActionState(onSubmit, {
    message: "",
  });

  return (
    <form className="flex flex-col gap-2 mt-1" action={formAction}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {state.message && <p className="text-green-500">{state.message}</p>}
      <button
        type="submit"
        className="px-4 py-0.5 bg-blue-500 cursor-pointer text-white rounded active:bg-blue-600"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default Form;
