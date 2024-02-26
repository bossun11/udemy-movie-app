import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const search = () => {
    const [results, setResults] = useState([])
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
    return <div>search</div>
}

export default search
