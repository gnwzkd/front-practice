import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    complete: {
        opacity: .5,
        textDecoration: 'line-through !important'
    }
}));

export default function TodoList(props) {
    const classes = useStyles();

    return props.data.length
        ?
        props.data.map(v => (
            <ListItem key={v.id} dense button className={v.complete ? classes.complete : ''} onClick={e => props.itemOnClick(v.id)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={v.complete}
                        tabIndex={-1}
                    />
                </ListItemIcon>
                <ListItemText primary={v.content} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete" onClick={e => props.buttonOnClick(v.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))
        :
        <ListItem disabled={true}>
            <ListItemText primary="No content." />
        </ListItem>;
}
