import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import TodoItem from './TodoItem';
import Badge from '@material-ui/core/Badge';
import grey from '@material-ui/core/colors/grey';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import uuid from 'uuid';

const styles = theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: grey[100],
    userSelect: 'none'
  },
  container: {
    padding: '20px 16px'
  },
  paper: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  todoList: {
    flex: 1,
    maxWidth: '100%'
  },
  subHeader: {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  badge: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > .MuiBadge-badge': {
      position: 'unset',
      transform: 'unset',
      backgroundColor: grey[500]
    }
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  }
});

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      speedDial: {
        open: false
      }
    };
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <Paper className={classes.paper}>
          <List className={classes.todoList}>
            <form onSubmit={this.addTodo}>
              <ListItem>
                <InputBase
                  name="todo"
                  className={classes.input}
                  placeholder="Add Todo"
                  autoFocus
                  autoComplete="off"
                />
                <IconButton
                  className={classes.iconButton}
                  aria-label="Add Todo"
                  type="submit"
                >
                  <AddIcon />
                </IconButton>
              </ListItem>
            </form>
            <Divider />
            <ListSubheader className={classes.subHeader}>
              <Badge
                badgeContent={this.getTodoList().length}
                color="primary"
                className={classes.badge}
              >
                Todos
                </Badge>
            </ListSubheader>
            {this.getItems(this.getTodoList())}
            <ListSubheader className={classes.subHeader}>
              <Badge
                badgeContent={this.getCompletedList().length}
                color="primary"
                className={classes.badge}
              >
                Completed
                </Badge>
            </ListSubheader>
            {this.getItems(this.getCompletedList())}
          </List>
        </Paper>
      </Container>
      <SpeedDial
        ariaLabel="More actions"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onBlur={e => { this.switchSpeedDial(false) }}
        onFocus={e => { this.switchSpeedDial(true) }}
        open={this.state.speedDial.open}
      >
        <SpeedDialAction
          key="Clear completed"
          icon={<ClearAllIcon />}
          tooltipTitle="Clear completed"
          tooltipOpen
          onClick={this.clearCompleted}
        />
        <SpeedDialAction
          key="Remove all"
          icon={<DeleteForeverIcon />}
          tooltipTitle="Remove all"
          tooltipOpen
          onClick={this.removeAll}
        />
      </SpeedDial>
    </div >;
  }

  componentWillMount() {
    this.loadStorage();
  }

  getItems = list => (list.length
    ?
    list.map(v => <TodoItem
      key={v.id}
      data={v}
      itemOnClick={e => { this.changeItemState(v.id) }}
      buttonOnClick={e => { this.removeItem(v.id) }}
    />)
    :
    <ListItem disabled>
      <ListItemText primary="No content." />
    </ListItem>)

  loadStorage() {
    const list = JSON.parse(localStorage.getItem('todoList'));

    if (!list) return;

    this.setState(() => ({
      list
    }));
  }

  saveStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.state.list));
  }

  addTodo = e => {
    e.preventDefault();
    const content = e.target.todo.value;

    if (!content) return;


    this.setState(prevState => {
      const { list } = prevState;

      list.push({
        id: uuid(),
        content,
        complete: false
      });

      return { list };
    }, this.saveStorage);

    e.target.reset();
  }

  getTodoList = () => this.state.list.filter(v => !v.complete)

  getCompletedList = () => this.state.list.filter(v => !!v.complete)

  changeItemState = id => {
    this.setState(prevState => ({
      list: prevState.list.map(v => v.id === id ? {
        id: v.id, content: v.content, complete: !v.complete
      } : { ...v })
    }), this.saveStorage);
  }

  removeItem = id => {
    this.setState(prevState => ({
      list: prevState.list.filter(v => v.id !== id)
    }), this.saveStorage);
  }

  switchSpeedDial = open => {
    this.setState(prevState => {
      const { speedDial } = prevState;
      speedDial.open = open === undefined ? !speedDial.open : open;
      return { speedDial };
    });
  }

  removeAll = () => {
    this.setState(() => ({
      list: []
    }), this.saveStorage);

    this.switchSpeedDial();
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      list: prevState.list.filter(v => !v.complete)
    }), this.saveStorage);

    this.switchSpeedDial();
  }
}

TodoList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoList);
