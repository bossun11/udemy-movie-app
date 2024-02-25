import { Box, TextField } from '@mui/material'
import Button from './Button'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { useRouter } from 'next/router'

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const router = useRouter()

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const searchQuery = e => {
        e.preventDefault()
        if (!query.trim()) return
        router.push(`search?query=${encodeURIComponent(query)}`)
    }

    return (
        <Box
            onSubmit={searchQuery}
            component={'form'}
            sx={{
                width: '80%',
                margin: '3% auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <TextField
                fullWidth
                variant="filled"
                placeholder="検索する"
                sx={{ mr: 2 }}
                onChange={handleChange}
            />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </Box>
    )
}

export default SearchBar
