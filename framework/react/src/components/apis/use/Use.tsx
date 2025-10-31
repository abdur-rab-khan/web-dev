import React, { Suspense, use, useState } from 'react'
import Message from './Message';
import { ErrorBoundary } from 'react-error-boundary';
import ThemeContext from '../../../contexts/Contexts';

const fetchMessages = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return Math.random() > 0.5 ? resolve("Hello React ⚛️") : reject("Failed to fetch data");
        }, 1000);
    })
}

const Use = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [messagePromise, setMessagePromise] = useState<() => Promise<string>>();

    const theme = use(ThemeContext);

    const handleDownloadMessage = () => {
        setMessagePromise(fetchMessages);
    }

    console.log(theme.theme) // light

    return (
        messagePromise ? (
            <ErrorBoundary fallback={<div>❌ {errorMsg}</div>} onError={(e) => setErrorMsg(e)}>
                <Suspense fallback="⌛ Loading messages....">
                    <Message messagePromise={messagePromise} />
                </Suspense>
            </ErrorBoundary>
        ) : (
            <div>
                <button onClick={handleDownloadMessage}>Fetch Messages</button >
            </div >
        )
    )
}

export default Use
