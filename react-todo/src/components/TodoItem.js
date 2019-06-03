import React from 'react';
import PropTypes from 'prop-types';
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
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

function TodoItem(props) {
  const classes = useStyles();

  return <ListItem
    dense
    button
    className={props.data.complete ? classes.complete : ''}
    onClick={props.itemOnClick}
  >
    <ListItemIcon>
      <Checkbox
        edge="start"
        checked={props.data.complete}
        tabIndex={-1}
      />
    </ListItemIcon>
    <ListItemText primary={props.data.content} className={classes.text} />
    <ListItemSecondaryAction>
      <IconButton
        edge="end"
        aria-label="Delete"
        onClick={props.buttonOnClick}
      >
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>;
}

TodoItem.propTypes = {
  data: PropTypes.object.isRequired,
  itemOnClick: PropTypes.func.isRequired,
  buttonOnClick: PropTypes.func.isRequired
};

TodoItem.defaultProps = {
  data: {
    content: 'Todo Item',
    complete: false
  }
};

export default TodoItem;
