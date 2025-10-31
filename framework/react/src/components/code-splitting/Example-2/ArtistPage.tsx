import React, { Suspense } from 'react'
import AlbumPage from './AlbumPage'

const ArtistPage = () => {
    return (
        <div className='flex flex-col gap-2'>
            <h1>Artist Page</h1>
            <Suspense fallback={<div>Loading albums...</div>}>
                <AlbumPage />
            </Suspense>
        </div>
    )
}

export default ArtistPage
