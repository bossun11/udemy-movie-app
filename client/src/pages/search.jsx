import AppLayout from '@/components/Layouts/AppLayout'
import Layout from '@/components/Layouts/Layout'
import MediaCard from '@/components/MediaCard'
import Sidebar from '@/components/Sidebar'
import { Grid } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const search = () => {
    const [results, setResults] = useState([])
    const [category, setCategory] = useState('all')
    const router = useRouter()
    const { query: searchQuery } = router.query

    const fetchMedia = async () => {
        try {
            const response = await axios.get(
                `api/searchMedia?searchQuery=${searchQuery}`,
            )
            const searchResults = response.data.results
            const validResults = searchResults.filter(
                item => item.media_type === 'movie' || item.media_type === 'tv',
            )
            setResults(validResults)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!searchQuery) return
        fetchMedia()
    }, [searchQuery])

    const filteredResults = results.filter(result => {
        if (category === 'all') return result
        return result.media_type === category
    })

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Search
                </h2>
            }>
            <Head>
                <title>Laravel - Search</title>
            </Head>
            <Layout sidebar={<Sidebar setCategory={setCategory} />}>
                <Grid container spacing={3}>
                    {filteredResults.map(item => (
                        <MediaCard key={item.id} item={item} />
                    ))}
                </Grid>
            </Layout>
        </AppLayout>
    )
}

export default search
