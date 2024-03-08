import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material'
import React from 'react'

const Comment = ({ comment, onDelete }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component={'div'} gutterBottom>
                    {comment.user.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gutterBottom
                    paragraph>
                    {comment.content}
                </Typography>
                <Grid container justifyContent="flex-end">
                    <ButtonGroup>
                        <Button>編集</Button>
                        <Button
                            color="error"
                            onClick={() => onDelete(comment.id)}>
                            削除
                        </Button>
                    </ButtonGroup>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Comment
