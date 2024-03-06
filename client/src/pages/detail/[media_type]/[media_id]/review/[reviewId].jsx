import CommentList from '@/components/CommentList'
import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import { Card, CardContent, Container, Rating, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ReviewDetail = () => {
    const router = useRouter()
    const { reviewId } = router.query
    const [review, setReview] = useState(null)
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchReviewDetail = async () => {
            if (!reviewId) return
            try {
                const response = await laravelAxios.get(
                    `api/review/${reviewId}`,
                )
                setReview(response.data)
                setComments(response.data.comments)
            } catch (error) {
                console.log(error)
            }
        }
        fetchReviewDetail()
    }, [reviewId])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ReviewDetail
                </h2>
            }>
            <Head>
                <title>Laravel - ReviewDetail</title>
            </Head>

            <Container sx={{ py: 2 }}>
                {review ? (
                    <>
                        {/* レビュー内容 */}
                        <Card sx={{ minHeight: '200px' }}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component={'div'}
                                    gutterBottom>
                                    {review.user.name}
                                </Typography>

                                <Rating
                                    name="read-only"
                                    value={review.rating}
                                    readOnly
                                />

                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p">
                                    {review.content}
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* コメント一覧 */}
                        <CommentList comments={comments} />
                    </>
                ) : (
                    <p>loading...</p>
                )}
            </Container>
        </AppLayout>
    )
}

export default ReviewDetail
