import { Grid } from '@mui/material'
import Comment from './Comment'
import laravelAxios from '@/lib/laravelAxios'
import { useState } from 'react'

const CommentList = ({ comments, setComments }) => {
    const [editMode, setEditMode] = useState(null)
    const [editedContent, setEditedContent] = useState('')

    const handleEdit = comment => {
        setEditMode(comment.id)
        setEditedContent(comment.content)
    }

    const handleDelete = async commentId => {
        try {
            const response = await laravelAxios.delete(
                `api/comments/${commentId}`,
            )
            const filteredComments = comments.filter(
                comment => comment.id !== commentId,
            )
            setComments(filteredComments)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditConfirm = async commentId => {
        try {
            const response = await laravelAxios.put(
                `api/comments/${commentId}`,
                {
                    content: editedContent,
                },
            )
            setEditMode(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
            {comments.map(comment => (
                <Grid item xs={12} key={comment.id}>
                    <Comment
                        comment={comment}
                        handleEdit={handleEdit}
                        onDelete={handleDelete}
                        editMode={editMode}
                        editedContent={editedContent}
                        setEditedContent={setEditedContent}
                        handleEditConfirm={handleEditConfirm}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CommentList
