import AppLayout from '@/components/Layouts/AppLayout'
import larvaeAxios from '@/lib/laravelAxios'
import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Rating,
    Typography,
} from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'

const Detail = ({ detail, media_type, media_id }) => {
    const review = [
        {
            id: 1,
            content: 'とても面白かったです',
            rating: 5,
            user: {
                name: '山田花子',
            },
        },
        {
            id: 2,
            content: '最悪！',
            rating: 1,
            user: {
                name: '田中太郎',
            },
        },
        {
            id: 3,
            content: 'まあまあかな',
            rating: 3,
            user: {
                name: '佐藤次郎',
            },
        },
    ]

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await laravelAxios.get(
                    `api/reviews/${media_type}/${media_id}`,
                )
            } catch (error) {
                console.error(error)
            }
        }
        fetchReviews()
    }, [media_type, media_id])
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail
                </h2>
            }>
            <Head>
                <title>Laravel - Detail</title>
            </Head>

            {/* 映画情報部分 */}
            <Box
                sx={{
                    height: { xs: 'auto', md: '70vh' },
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                <Box
                    sx={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})`,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                />
                <Container sx={{ zIndex: 1 }}>
                    <Grid container alignItems={'center'} color={'white'}>
                        <Grid
                            item
                            md={4}
                            sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img
                                width={'70%'}
                                src={`https://image.tmdb.org/t/p/original/${detail.poster_path}`}
                                alt=""
                            />
                        </Grid>

                        <Grid item md={8}>
                            <Typography variant="h4" paragraph>
                                {detail.title || detail.name}
                            </Typography>
                            <Typography paragraph>{detail.overview}</Typography>
                            <Typography variant="h6">
                                {media_type === 'movie'
                                    ? `公開日：${detail.release_date}`
                                    : `初回放送日：${detail.first_air_date}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* レビュー内容表示 */}
            <Container sx={{ py: 4 }}>
                <Typography
                    container={'h1'}
                    variant="h4"
                    align="center"
                    gutterBottom>
                    レビュー一覧
                </Typography>

                <Grid container spacing={3}>
                    {review.map(review => (
                        <Grid item key={review.id} xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        component={'div'}
                                        gutterBottom>
                                        {review.user.name}
                                    </Typography>

                                    <Rating value={review.rating} readOnly />

                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        paragraph>
                                        {review.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </AppLayout>
    )
}

// SSR
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params

    try {
        const jpResponse = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )

        let combinedData = { ...jpResponse.data }

        if (!jpResponse.data.overview) {
            const enResponse = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            )
            combinedData.overview = enResponse.data.overview
        }
        return { props: { detail: combinedData, media_type, media_id } }
    } catch (error) {
        return { notFound: true }
    }
}

export default Detail
