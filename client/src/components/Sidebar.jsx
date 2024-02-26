import { List, ListItemButton, ListItemText, Typography } from '@mui/material'

const Sidebar = () => {
    return (
        <>
            <Typography bgcolor={'blue'} color={'white'} p={1}>
                カテゴリ
            </Typography>

            <List component={'nav'}>
                <ListItemButton>
                    <ListItemText primary="全て" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="映画" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="TV" />
                </ListItemButton>
            </List>
        </>
    )
}

export default Sidebar
