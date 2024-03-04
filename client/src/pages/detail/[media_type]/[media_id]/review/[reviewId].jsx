import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ReviewDetail = () => {
    const router = useRouter()
    const { reviewId } = router.query

    useEffect(() => {
        const fetchReviewDetail = async () => {
            if (!reviewId) return
            try {
                const response = await laravelAxios.get(
                    `api/reviews/${reviewId}`,
                )
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
        </AppLayout>
    )
}

export default ReviewDetail
