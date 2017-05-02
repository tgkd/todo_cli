import React, {Component} from 'react';
import {CompletedTask, IncompleteTask} from './../TaskItem';
import NewTask from '../NewTask';
import {sortTasks} from 'libs/dateCreator';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  async createTask(task) {
    const { createTask } = this.props;
    try {
      await createTask(task);
    } catch (e) {
      this.setState({ error: 'Ошибка, повторите попытку' });
    }
  }

  async updateTask(task) {
    const { updateTask } = this.props;
    try {
      await updateTask(task);
    } catch (e) {
      this.setState({ error: 'Ошибка, повторите попытку' });
    }
  }

  async deleteTask(id) {
    const { deleteTask } = this.props;
    try {
      await deleteTask(id);
    } catch (e) {
      this.setState({ error: 'Ошибка, повторите попытку' });
    }
  }

  componentDidMount() {
    const { getTasks } = this.props;
    getTasks()
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        });
      });
  }

  getTasksTemplates(incompleteTasks, completedTasks) {
    const templates = {};
    templates.incomplete = incompleteTasks.map(item => {
      return (
        <div className='col-xs-10 col-sm-10 col-md-10' key={item._id}>
          <IncompleteTask task={item}
                          updateTask={::this.updateTask}/>
        </div>
      );
    });
    templates.completed = completedTasks.map(item => {
      return (
        <div className='col-xs-10 col-sm-10 col-md-10' key={item._id}>
          <CompletedTask task={item}
                         updateTask={::this.updateTask}
                         deleteTask={::this.deleteTask}/>
        </div>
      );
    });
    return templates;
  }

  render() {
    const { incompleteTasks, completedTasks } = this.props;
    const incSortedList = sortTasks(incompleteTasks, 'hours');
    const compSortedList = sortTasks(completedTasks, 'hours');
    const { incomplete, completed } = this.getTasksTemplates(incSortedList, compSortedList);

    return (
      <div className='tasks-container col-xs-10 col-sm-10 col-md-10 col-lg-10'>
        <div className='row center-xs center-sm center-md'>
          <div className='col-xs-12 col-sm-12 col-md-12'>
            <h1 className='tasks-container__header'>Дела</h1>
          </div>
          <div className='col-xs-10 col-sm-10 col-md-10'>
            <NewTask createHandler={::this.createTask}/>
          </div>
        </div>
        <br/>
        <hr/>
        <div className='row center-xs center-sm center-md tasks-container__incomplete-list'>
          {incomplete.length === 0 ? 'Нет незавершенных задач' : incomplete}
        </div>
        <hr/>
        <div className='row center-xs center-sm center-md tasks-container__completed-list'>
          {completed.length === 0 ? 'Нет завершенных задач' : completed}
        </div>
      </div>

    );
  }
}