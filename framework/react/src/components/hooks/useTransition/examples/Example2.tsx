import React, { startTransition, useCallback } from 'react';
import { debounce } from 'lodash';

interface Song {
    id: number;
    artist: string;
    title: string;
    posterUrl: string;
}

const fetchSongs = (numSongs: number): Promise<Song[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const songData = [
                {
                    "id": 1,
                    "artist": "Queen",
                    "title": "Bohemian Rhapsody",
                    "posterUrl": "https://picsum.photos/seed/bohemian-rhapsody/300/300"
                },
                {
                    "id": 2,
                    "artist": "Michael Jackson",
                    "title": "Billie Jean",
                    "posterUrl": "https://picsum.photos/seed/billie-jean/300/300"
                },
                {
                    "id": 3,
                    "artist": "Nirvana",
                    "title": "Smells Like Teen Spirit",
                    "posterUrl": "https://picsum.photos/seed/smells-like-teen-spirit/300/300"
                },
                {
                    "id": 4,
                    "artist": "The Beatles",
                    "title": "Hey Jude",
                    "posterUrl": "https://picsum.photos/seed/hey-jude/300/300"
                },
                {
                    "id": 5,
                    "artist": "Led Zeppelin",
                    "title": "Stairway to Heaven",
                    "posterUrl": "https://picsum.photos/seed/stairway-to-heaven/300/300"
                },
                {
                    "id": 6,
                    "artist": "Eagles",
                    "title": "Hotel California",
                    "posterUrl": "https://picsum.photos/seed/hotel-california/300/300"
                },
                {
                    "id": 7,
                    "artist": "Daft Punk",
                    "title": "Get Lucky",
                    "posterUrl": "https://picsum.photos/seed/get-lucky/300/300"
                },
                {
                    "id": 8,
                    "artist": "Adele",
                    "title": "Rolling in the Deep",
                    "posterUrl": "https://picsum.photos/seed/rolling-in-the-deep/300/300"
                },
                {
                    "id": 9,
                    "artist": "Ed Sheeran",
                    "title": "Shape of You",
                    "posterUrl": "https://picsum.photos/seed/shape-of-you/300/300"
                },
                {
                    "id": 10,
                    "artist": "Taylor Swift",
                    "title": "Blank Space",
                    "posterUrl": "https://picsum.photos/seed/blank-space/300/300"
                },
                {
                    "id": 11,
                    "artist": "Kendrick Lamar",
                    "title": "HUMBLE.",
                    "posterUrl": "https://picsum.photos/seed/humble/300/300"
                },
                {
                    "id": 12,
                    "artist": "Billie Eilish",
                    "title": "bad guy",
                    "posterUrl": "https://picsum.photos/seed/bad-guy/300/300"
                },
                {
                    "id": 13,
                    "artist": "The Weeknd",
                    "title": "Blinding Lights",
                    "posterUrl": "https://picsum.photos/seed/blinding-lights/300/300"
                },
                {
                    "id": 14,
                    "artist": "Post Malone",
                    "title": "Circles",
                    "posterUrl": "https://picsum.photos/seed/circles/300/300"
                },
                {
                    "id": 15,
                    "artist": "Dua Lipa",
                    "title": "Don't Start Now",
                    "posterUrl": "https://picsum.photos/seed/dont-start-now/300/300"
                },
                {
                    "id": 16,
                    "artist": "Harry Styles",
                    "title": "As It Was",
                    "posterUrl": "https://picsum.photos/seed/as-it-was/300/300"
                },
                {
                    "id": 17,
                    "artist": "Bob Marley & The Wailers",
                    "title": "No Woman, No Cry",
                    "posterUrl": "https://picsum.photos/seed/no-woman-no-cry/300/300"
                },
                {
                    "id": 18,
                    "artist": "Fleetwood Mac",
                    "title": "Dreams",
                    "posterUrl": "https://picsum.photos/seed/dreams/300/300"
                },
                {
                    "id": 19,
                    "artist": "Johnny Cash",
                    "title": "Hurt",
                    "posterUrl": "https://picsum.photos/seed/hurt/300/300"
                },
                {
                    "id": 20,
                    "artist": "Frank Sinatra",
                    "title": "My Way",
                    "posterUrl": "https://picsum.photos/seed/my-way/300/300"
                }
            ];

            const shuffledSongs = songData.sort(() => 0.5 - Math.random());

            resolve(shuffledSongs.slice(0, Math.min(numSongs, songData.length)));
        }, 2000);
    });
}

const Example2 = () => {
    const [songs, setSongs] = React.useState<Song[]>([]);
    const [number, setNumber] = React.useState<number>(0);
    // const [isPending, setIsPending] = React.useState<boolean>(false);

    const [isPending, startTransition] = React.useTransition();

    // const debouncedFetchSongs = useCallback(
    //     debounce(async (numSongs: number) => {
    //         setIsPending(true);
    //         const fetchedSongs = await fetchSongs(numSongs);
    //         setSongs(fetchedSongs);
    //         setIsPending(false);
    //     }, 300), [])

    const pickRandomSongs = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);

        if (isNaN(value) || value < 0) {
            setSongs([]);
            setNumber(0);
            return;
        }

        setNumber(value);

        // Using without startTransition
        // debouncedFetchSongs(value);

        // Using startTransition
        startTransition(async () => {
            const fetchedSongs = await fetchSongs(value);
            setSongs(fetchedSongs);
        });
    }

    return (
        <div className='w-full px-24 max-h-screen py-8 overflow-y-auto'>
            <h1
                className='text-2xl font-bold mb-4'
            >
                useTransition with data fetching example
            </h1>
            <label
                htmlFor="fetch-songs"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            > Pick Number of Songs </label>
            <input
                type="number"
                id="fetch-songs"
                value={number}
                className="mb-4 block w-1/4 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Type number of songs"
                onChange={pickRandomSongs}
            />
            {
                isPending ? (
                    // Loading Skeleton
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {Array.from({ length: number }).map((_, index) => (
                            <div
                                key={index}
                                className='border border-gray-300 rounded-lg p-4 animate-pulse'
                            >
                                <div className='bg-gray-300 h-40 mb-4 rounded'></div>
                                <div className='h-6 bg-gray-300 rounded w-3/4 mb-2'></div>
                                <div className='h-4 bg-gray-300 rounded w-1/2'></div>
                            </div>
                        ))} </div>
                ) : (
                    songs.length > 0 ? (
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {
                                songs.map((song) => (
                                    <div
                                        key={song.id}
                                        className='border border-gray-300 rounded-lg p-4'
                                    >
                                        <img
                                            src={song.posterUrl}
                                            alt={song.title}
                                            className='w-full h-40 object-cover mb-4 rounded'
                                        />
                                        <h2 className='text-lg font-semibold'>{song.title}</h2>
                                        <p className='text-gray-600'>{song.artist}</p>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <p>No songs to display. Please select a number.</p>
                    )
                )
            }
        </div>
    )
}
export default Example2
