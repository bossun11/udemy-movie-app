import { Box, Container, Grid, Typography } from '@mui/material'
import axios from 'axios'

const Detail = ({ detail }) => {
    console.log(detail)
    return (
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
                            {detail.title}
                        </Typography>
                        <Typography paragraph>{detail.overview}</Typography>
                        <Typography variant="h6">
                            公開日：{detail.release_date}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

// SSR
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )
        const fetchedData = response.data
        return { props: { detail: fetchedData } }
    } catch (error) {
        return { notFound: true }
    }
}

export default Detail
