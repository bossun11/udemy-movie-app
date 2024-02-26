import { List, ListItemButton, ListItemText, Typography } from '@mui/material'

const Sidebar = ({ setCategory }) => {
    return (
        <>
            <Typography bgcolor={'blue'} color={'white'} p={1}>
                カテゴリ
            </Typography>

            <List component={'nav'}>
                <ListItemButton onClick={() => setCategory('all')}>
                    <ListItemText primary="全て" />
                </ListItemButton>
                <ListItemButton onClick={() => setCategory('movie')}>
                    <ListItemText primary="映画" />
                </ListItemButton>
                <ListItemButton onClick={() => setCategory('tv')}>
                    <ListItemText primary="TV" />
                </ListItemButton>
            </List>
        </>
    )
}

export default Sidebar
