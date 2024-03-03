import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Container,
    Fab,
    Grid,
    Modal,
    Rating,
    TextareaAutosize,
    Tooltip,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import StarIcon from '@mui/icons-material/Star'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'

const Detail = ({ detail, media_type, media_id }) => {
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [reviews, setReviews] = useState([])
    const [averageRating, setAverageRating] = useState(null)
    const { user } = useAuth({ middleware: 'auth' })
    const [editMode, setEditMode] = useState(null)
    const [editedRating, setEditedRating] = useState(null)
    const [editedContent, setEditedContent] = useState('')

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleReviewChange = e => {
        setReview(e.target.value)
    }

    const handleRatingChange = (e, newValue) => {
        setRating(newValue)
    }

    const isButtonDisabled = (rating, content) => {
        const isDisabled = !rating || !content.trim()
        return isDisabled
    }

    const isReviewButtonDisabled = isButtonDisabled(rating, review)

    const isEditButtonDisabled = isButtonDisabled(editedRating, editedContent)

    const handleReviewAdd = async () => {
        handleClose()
        try {
            const response = await laravelAxios.post(`api/reviews`, {
                rating,
                content: review,
                media_type,
                media_id,
            })
            const newReview = response.data
            setReviews([...reviews, newReview])
            setReview('')
            setRating(0)

            const updatedReviews = [...reviews, newReview]
            updateAverageRating(updatedReviews)
        } catch (error) {
            console.log(error)
        }
    }

    const updateAverageRating = updateReviews => {
        if (updateReviews.length > 0) {
            const totalRating = updateReviews.reduce(
                (acc, review) => acc + review.rating,
                0,
            )
            const average = (totalRating / updateReviews.length).toFixed(1)
            setAverageRating(average)
        } else {
            setAverageRating(null)
        }
    }

    const handleReviewDelete = async id => {
        if (confirm('レビューを削除しますか？')) {
            try {
                const response = await laravelAxios.delete(`api/reviews/${id}`)
                const filteredReviews = reviews.filter(
                    review => review.id !== id,
                )
                setReviews(filteredReviews)
                updateAverageRating(filteredReviews)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleReviewEdit = review => {
        setEditMode(review.id)
        setEditedRating(review.rating)
        setEditedContent(review.content)
    }

    const handleConfirmEdit = async reviewId => {
        try {
            const response = await laravelAxios.put(`api/review/${reviewId}`, {
                rating: editedRating,
                content: editedContent,
            })
            const updatedReview = response.data
            const updatedReviews = reviews.map(review => {
                if (review.id === reviewId) {
                    return {
                        ...review,
                        content: updatedReview.content,
                        rating: updatedReview.rating,
                    }
                }
                return review
            })
            setReviews(updatedReviews)
            setEditMode(null)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await laravelAxios.get(
                    `api/reviews/${media_type}/${media_id}`,
                )
                const fetchReviews = response.data
                setReviews(fetchReviews)
                updateAverageRating(fetchReviews)
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

                            <Box
                                gap={2}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 2,
                                }}>
                                <Rating
                                    readOnly
                                    precision={0.5}
                                    value={parseFloat(averageRating)}
                                    emptyIcon={
                                        <StarIcon style={{ color: 'white' }} />
                                    }
                                />

                                <Typography
                                    sx={{
                                        ml: 1,
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                    }}>
                                    {averageRating}
                                </Typography>
                            </Box>

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
                    {reviews.map(review => (
                        <Grid item key={review.id} xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        component={'div'}
                                        gutterBottom>
                                        {review.user.name}
                                    </Typography>
                                    {editMode === review.id ? (
                                        // 編集ボタンを押されたレビューの見た目
                                        <>
                                            <Rating
                                                value={editedRating}
                                                onChange={(e, newValue) =>
                                                    setEditedRating(newValue)
                                                }
                                            />
                                            <TextareaAutosize
                                                minRows={3}
                                                style={{ width: '100%' }}
                                                value={editedContent}
                                                onChange={e =>
                                                    setEditedContent(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Rating
                                                value={review.rating}
                                                readOnly
                                            />

                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                paragraph>
                                                {review.content}
                                            </Typography>
                                        </>
                                    )}

                                    {user?.id === review.user_id && (
                                        <Grid
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                            }}>
                                            {editMode === review.id ? (
                                                <Button
                                                    onClick={() =>
                                                        handleConfirmEdit(
                                                            review.id,
                                                        )
                                                    }
                                                    disabled={
                                                        isEditButtonDisabled
                                                    }>
                                                    編集確定
                                                </Button>
                                            ) : (
                                                <ButtonGroup>
                                                    <Button
                                                        onClick={() =>
                                                            handleReviewEdit(
                                                                review,
                                                            )
                                                        }>
                                                        編集
                                                    </Button>
                                                    <Button
                                                        color="error"
                                                        onClick={() =>
                                                            handleReviewDelete(
                                                                review.id,
                                                            )
                                                        }>
                                                        削除
                                                    </Button>
                                                </ButtonGroup>
                                            )}
                                        </Grid>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* レビュー追加ボタン */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                    zIndex: 5,
                }}>
                <Tooltip title="レビュー追加">
                    <Fab
                        style={{ background: '#1976d2', color: 'white' }}
                        onClick={handleOpen}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Box>

            {/* モーダルウィンドウ */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                    <Typography variant="h6" component="h2">
                        レビューを書く
                    </Typography>
                    <Rating
                        required
                        onChange={handleRatingChange}
                        value={rating}
                    />
                    <TextareaAutosize
                        required
                        minRows={5}
                        placeholder="レビュー内容"
                        style={{
                            width: '100%',
                            marginTop: '10px',
                        }}
                        value={review}
                        onChange={handleReviewChange}
                    />
                    <Button
                        variant="outlined"
                        disabled={isReviewButtonDisabled}
                        onClick={handleReviewAdd}>
                        送信
                    </Button>
                </Box>
            </Modal>
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
