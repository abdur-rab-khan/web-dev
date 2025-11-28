import App from "../App";
import { render, renderHook } from "vitest-browser-react"
import { it, expect } from "vitest"

it('Render App.txt', async () => {
    const { getByText, getByRole, } = await render(<App />);

    await expect.element(getByText("count is 0")).toBeInTheDocument();

    await getByRole('button', { name: 'count is 0' }).click();

    await expect.element(getByText('count is 1')).toBeInTheDocument();
})