import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileAction';

class Experience extends Component {
  onDeleteClick = id => {
    this.props.deleteExperience(id, this.props.history);
  };
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment>
        </td>
        <td>
          {exp.to === null ? (
            'now'
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <i
            onClick={() => this.onDeleteClick(exp._id)}
            class="far fa-trash-alt text-danger"
            style={{ cursor: 'pointer' }}
          />
          {/* <button
            onClick={() => this.onDeleteClick(exp._id)}
            className="btn btn-danger d-none d-md-block"
          >
            Delete
          </button> */}
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Title</th>
              <th scope="col">From</th>
              <th scope="col">Till</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperience }
)(withRouter(Experience));
