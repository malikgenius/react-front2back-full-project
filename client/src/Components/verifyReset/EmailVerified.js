import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { verificationEmail } from '../../actions/authAction';
import { Alert } from 'reactstrap';

class EmailVerified extends Component {
  //   componentDidMount = () => {
  //     // console.log(this.props.history);
  //     this.props.verificationEmail(this.props.history);
  //   };
  //   componentWillReceiveProps = nextProps => {
  //     if (nextProps.success) {
  //       this.setState({ success: nextProps.success.success });
  //     }
  //     if (nextProps.errors) {
  //       this.setState({ errors: nextProps.errors.error });
  //     }
  //   };

  render() {
    return (
      <div className="py-5">
        {' '}
        {this.props.errors.error ? (
          <Alert color="warning">{this.props.errors.error}</Alert>
        ) : (
          <Alert color="success">{this.props.success.success}</Alert>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors: state.errors,
    success: state.success
  };
};

export default connect(
  mapStateToProps,
  { verificationEmail }
)(withRouter(EmailVerified));
