import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"


export const SideBarItem = ({ note }) => {
    const { title, body, id, date, imageUrls = [] } = note;
    const dispatch = useDispatch();

    const newTitle = useMemo( () => {
        return note.title.length > 17
            ? note.title.substring(0,17) + '...'
            : note.title
    }, [note.title])

    const onClickActiveNote = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) );
       
    }

  return (
    <ListItem disablePadding>
        <ListItemButton
            onClick={ onClickActiveNote }
        >
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle }/>
                <ListItemText secondary={ note.body }/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
