import { use } from 'react'

interface Album {
    id: number;
    title: string;
}

const fetchData = (): Promise<Album[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                [
                    {
                        id: 1,
                        title: "Love in the Time of Cholera",
                    },
                    {
                        id: 2,
                        title: "One Hundred Years of Solitude",
                    },
                    {
                        id: 3,
                        title: "Chronicle of a Death Foretold",
                    },
                    {
                        id: 4,
                        title: "The General in His Labyrinth",
                    },
                    {
                        id: 5,
                        title: "Of Love and Other Demons",
                    },
                    {
                        id: 6,
                        title: "The Autumn of the Patriarch",
                    },
                    {
                        id: 7,
                        title: "No One Writes to the Colonel",
                    },
                    {
                        id: 8,
                        title: "The Story of a Shipwrecked Sailor",
                    },
                    {
                        id: 9,
                        title: "Memories of My Melancholy Whores"
                    },
                ])
        }, 1000);
    });
}

// Create the promise once, outside the component
const albumsPromise = fetchData();

const AlbumPage = () => {
    const albums = use(albumsPromise);

    return (
        <ul>
            {albums.map((album: Album) => (
                <li key={album.id} className='list-disc'>
                    {album.title}
                </li>
            ))}
        </ul>
    )
}

export default AlbumPage
