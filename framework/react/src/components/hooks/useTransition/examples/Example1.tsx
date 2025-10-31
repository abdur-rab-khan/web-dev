import React from 'react'

const submitForm = (data: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });
}

// Using form element to handle input and submit
const Example1 = () => {
    const [isPending, startTransition] = React.useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const formData = new FormData(e.target as HTMLFormElement);
            const data = formData.get('inputField') as string;
            await submitForm(data)
        });
    };

    return (
        <div>
            <h1
                className='text-2xl font-bold mb-4'
            >
                useTransition basic example
            </h1>
            <form
                className='flex flex-col gap-4'
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder='Type something...'
                    className='border border-gray-300 p-2 rounded'
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition'
                >
                    {
                        isPending ? 'Submitting...' : 'Submit'
                    }
                </button>
            </form>
        </div>
    )
}

export default Example1
