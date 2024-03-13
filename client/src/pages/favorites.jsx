import AppLayout from '@/components/Layouts/AppLayout'
import MediaCard from '@/components/MediaCard'
import laravelAxios from '@/lib/laravelAxios'
import { Container, Grid } from '@mui/material'
import Head from 'next/head'
import useSWR from 'swr'

const favorites = () => {
    const fetcher = url => laravelAxios.get(url).then(res => res.data)
    const { data: favoriteItems, error } = useSWR('/api/favorites', fetcher)
    console.log(favoriteItems)
    if (error) return <div>エラーが発生しました</div>

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    お気に入り
                </h2>
            }>
            <Head>
                <title>Laravel - Favorite</title>
            </Head>

            <Container>
                <Grid container spacing={3} py={3}>
                    {favoriteItems?.map(item => (
                        <MediaCard
                            key={item.id}
                            item={item}
                            isContent={false}
                        />
                    ))}
                </Grid>
            </Container>
        </AppLayout>
    )
}

export default favorites
