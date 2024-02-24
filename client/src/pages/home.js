import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'

const Dashboard = () => {
    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get('api/getPopularMovies')
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
