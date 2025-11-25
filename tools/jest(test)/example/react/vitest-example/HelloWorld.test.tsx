import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import HelloWorld from './HelloWorld'

test('renders name', async () => {
    const { getByText, getByRole } = await render(<HelloWorld name='alice' />);

    await expect.element(getByText('Hello alice x1!')).toBeInTheDocument();
    await getByRole('button', { name: "Increment" }).click();


    await expect.element(getByText('Hello alice x2!')).toBeInTheDocument();

    await getByRole('button', { name: "Decrement" }).click();
    await getByRole('button', { name: "Decrement" }).click();

    await expect.element(getByText('Hello alice x0!')).toBeInTheDocument();
})
