import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const search = () => {
    const router = useRouter()
    const { query: searchQuery } = router.query

    const fetchMedia = async () => {
        try {
            const response = await axios.get(
                `api/searchMedia?searchQuery=${searchQuery}`,
            )
            console.log(response.data)
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
