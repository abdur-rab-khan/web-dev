import React, { use } from 'react'

const Message = ({ messagePromise }: { messagePromise: () => Promise<string> }) => {
    const message: string = use(messagePromise);

    return (
        <div>
            📩 Our message is: {message}
        </div>
    )
}

export default Message
