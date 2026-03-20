"use client";
import React, { useActionState } from "react";

interface IInitialState {
  isError: boolean;
  message: string;
}

interface ICreateCardFormProps {
  handleSubmit: (
    state: IInitialState,
    formData: FormData,
  ) => Promise<IInitialState>;
}

const initialState: IInitialState = {
  isError: false,
  message: "",
};

function CreateCardForm({ handleSubmit }: ICreateCardFormProps) {
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState,
  );

  return (
    <form action={formAction} className="mt-4 text-white">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="mt-1 block w-full px-2 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-800"
          required
        />
        <label htmlFor="description" className="block text-sm font-medium mt-4">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          className="mt-1 block w-full px-2 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-800"
          required
        />
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isPending ? "Creating..." : "Create Card"}
        </button>

        <p
          className={`mt-2 text-sm ${initialState.isError ? "text-red-600" : "text-green-500"}`}
          aria-live="polite"
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}

export default CreateCardForm;
