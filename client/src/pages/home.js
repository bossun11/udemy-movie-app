import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Home = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get('api/getPopularMovies')
                setMovies(response.data.results)
            } catch (error) {
                console.error(error)
            }
        }
        fetchPopularMovies()
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Home
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            {movies.map(movie => (
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    key={movie.id}
                    alt={movie.title}
                />
            ))}
        </AppLayout>
    )
}

export default Home
