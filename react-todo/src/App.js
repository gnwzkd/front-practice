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
import Badge from '@material-ui/core/Badge';
import grey from '@material-ui/core/colors/grey';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TodoList from './components/TodoList';
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
    flex: 1
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      speedDial: {
        open: false
      }
    };
  }

  componentWillMount() {
    this.loadStorage();
  }

  loadStorage() {
    const list = JSON.parse(localStorage.getItem('todoList'));

    if (!list) return;

    this.setState({
      list
    });
  }

  saveStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.state.list));
  }

  addTodo(e) {
    e.preventDefault();
    const content = e.target.todo.value;

    if (!content) return;

    const { list } = this.state;

    list.push({
      id: uuid(),
      content,
      complete: false
    });

    this.setState({
      list
    }, this.saveStorage);

    e.target.reset();
  }

  todoList = () => this.state.list.filter(v => !v.complete)

  completedList = () => this.state.list.filter(v => v.complete)

  changeTodoState(id) {
    this.setState({
      list: this.state.list.map(v => v.id === id ? {
        id: v.id, content: v.content, complete: !v.complete
      } : { ...v })
    }, this.saveStorage);
  }

  removeTodo(id) {
    this.setState({
      list: this.state.list.filter(v => v.id !== id)
    }, this.saveStorage);

  }

  switchSpeedDial(open, e) {
    const { speedDial } = this.state;
    speedDial.open = open === undefined ? !speedDial.open : open;

    this.setState({
      speedDial
    });
  }

  removeAll() {
    this.setState({
      list: []
    }, this.saveStorage);
    
    this.switchSpeedDial();
  }

  clearCompleted() {
    this.setState({
      list: this.state.list.filter(v => !v.complete)
    }, this.saveStorage);

    this.switchSpeedDial();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Container maxWidth="sm" className={classes.container}>
          <Paper className={classes.paper}>
            <List className={classes.todoList}>
              <form onSubmit={this.addTodo.bind(this)}>
                <ListItem>
                  <InputBase name="todo" className={classes.input} placeholder="Add Todo" autoFocus autoComplete="off" />
                  <IconButton className={classes.iconButton} aria-label="Add Todo" type="submit" >
                    <AddIcon />
                  </IconButton>
                </ListItem>
              </form>
              <Divider />
              <ListSubheader className={classes.subHeader}>
                <Badge badgeContent={this.todoList().length} color="primary" className={classes.badge}>
                  Todos
                </Badge>
              </ListSubheader>
              <TodoList data={this.todoList()} itemOnClick={this.changeTodoState.bind(this)} buttonOnClick={this.removeTodo.bind(this)} />
              <ListSubheader className={classes.subHeader}>
                <Badge badgeContent={this.completedList().length} color="primary" className={classes.badge}>
                  Completed
                </Badge>
              </ListSubheader>
              <TodoList data={this.completedList()} itemOnClick={this.changeTodoState.bind(this)} buttonOnClick={this.removeTodo.bind(this)} />
            </List>
          </Paper>
        </Container>
        <SpeedDial
          ariaLabel="More actions"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onBlur={this.switchSpeedDial.bind(this, false)}
          onFocus={this.switchSpeedDial.bind(this, true)}
          onClick={this.switchSpeedDial.bind(this, undefined)}
          open={this.state.speedDial.open}
        >
          <SpeedDialAction
            key="Clear completed"
            icon={<ClearAllIcon />}
            tooltipTitle="Clear completed"
            tooltipOpen
            onClick={this.clearCompleted.bind(this)}
          />
          <SpeedDialAction
            key="Remove all"
            icon={<DeleteForeverIcon />}
            tooltipTitle="Remove all"
            tooltipOpen
            onClick={this.removeAll.bind(this)}
          />
        </SpeedDial>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
