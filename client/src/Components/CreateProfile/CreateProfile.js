import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import FormData from 'form-data';
import 'cropperjs/dist/cropper.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextFieldGroup from '../Common/TextFieldGroup';
import TextAreaFieldGroup from '../Common/TextAreaFieldGroup';
import InputGroup from '../Common/InputGroup';
import SelectListGroup from '../Common/SelectListGroup';
import { createProfile, uploadProfileImage } from '../../actions/profileAction';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      // Dropzone files
      files: [],
      fileName: '',
      // Cropper States
      cropResult: null,
      image: {},
      errors: '',
      success: '',
      myfile: '',
      input: ''
    };
  }

  // componentDidMount = () => {
  //   toast('hello jaani');
  // };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.error });
    }
    if (nextProps.success) {
      this.setState({ success: nextProps.success.success });
    }
  }
  // Toast Notifications
  toastNotify = () => {
    // toast('Default Notification !');
    if (this.state.success) {
      toast.success(this.state.success, {
        position: toast.POSITION.TOP_CENTER
      });
    }

    toast.error(this.state.errors, {
      position: toast.POSITION.TOP_LEFT
    });
  };

  // images upload to formData and testing
  onFormData = e => {
    e.preventDefault();
    // trying to send data through formData to backend
    let formData = new FormData();
    formData.append('file', this.state.files[0]);
    console.log(formData);
    this.props.createProfile(formData, this.props.history);
  };

  // upload Image .. when click on check in dropzone preview
  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop();
      this.setState({ success: 'Success!, Image has been uploaded' });
    } catch (err) {
      this.setState({ errors: err });
    }
  };
  // when clicked on cancel
  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // trying to send data through formData to backend Only Image will go
    // it working with uploadProfileImage and some headers defined in action.
    // let formData = new FormData();
    // formData.append('file', this.state.files[0], this.state.files[0].filename);
    // const options = { content: formData };
    // this.props.uploadProfileImage(formData, this.props.history);

    // normal Way of sending data to redux / axios- i just named it form Data
    const formData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      // cropResult: this.state.cropResult,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    console.log(formData);
    this.props.createProfile(formData, this.props.history);
  };

  onFocus = () => {
    this.setState({ errors: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Dropzone
  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
    // below working fine with direct axios to server.
    // const formData = new FormData();
    // formData.append('file', files[0], files[0].filename);
    // axios
    //   .post('/api/profile', formData, {
    //     headers: {
    //       accept: 'application/json',
    //       'Accept-Language': 'en-US,en;q=0.8',
    //       'Content-Type': `application/x-www-form-urlencoded`
    //     }
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
  // Cropper
  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      console.log(imageUrl);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, 'image/jpg');

    // this.refs.cropper.getCroppedCanvas().toDataURL(data => {
    //   let imageUrl = URL.createObjectURL(data);
    //   this.setState({
    //     cropResult: imageUrl,
    //     image: data
    //   });
    // }, 'image/jpg');
    // other option is toDataURL which i have to check but will use blob for now.
    // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  };

  render() {
    const { errors, success, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                  onFocus={this.onFocus}
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Tell us a little about yourself"
                />

                {/* testing simple file upload to compare with Dropzone */}
                <input
                  type="file"
                  value={this.state.input}
                  onChange={this.onChange}
                />
                <div className="row container">
                  <div className="mb-3 col-md-4">
                    <Dropzone
                      onDrop={this.onDrop}
                      // multiple={false}
                      // style={{ maxHeight: '100px', maxWidth: '100px' }}
                    >
                      <div className="text-center mt-4">
                        <i className="fas fa-upload fa-4x text-center mb-3" />
                        <p className="lead text-center mb-5">Drop Image here</p>
                      </div>
                    </Dropzone>
                  </div>
                  <div className=" col-md-4">
                    {this.state.files[0] && (
                      <Cropper
                        style={{
                          maxHeight: '200px',
                          maxWidth: '200px',
                          marginTop: 0
                        }}
                        ref="cropper"
                        src={this.state.files[0].preview}
                        //Rectangle image settings
                        // aspectRatio={16 / 9}
                        // square image settings
                        aspectRatio={1}
                        viewMode={0}
                        dragMode="move"
                        guides={true}
                        // scalable will let user freely crop
                        scalable={false}
                        cropBoxMovable={true}
                        cropBoxResizable={true}
                        crop={this.cropImage}
                      />
                    )}
                  </div>
                  {this.state.files[0] && (
                    <div className="m-auto col-md-4">
                      <img
                        // className="col col-md-12"
                        style={{ maxHeight: '200px', maxWidth: '200px' }}
                        src={this.state.cropResult}
                      />
                      <div className="btn group col col-md-12">
                        <button
                          className="success"
                          type="button"
                          onClick={this.uploadImage}
                        >
                          <i className="fas fa-check " />
                        </button>
                        <button className="success" type="button">
                          <i className="far fa-times-circle" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>

              <ToastContainer />
              {errors && (
                <div className="text-center  text-danger text-muted text-sm mt-2">
                  {/* <strong>{errors}</strong> */}
                  <i className="fas fa-exclamation-triangle text-danger" />
                  {errors}
                </div>
              )}
            </div>
            {/* if Errors below function will run to show notificaitons on screen .. react-toastify */}
            {errors && this.toastNotify()}
            {/* Success Message ToastContainer  */}
          </div>
        </div>
      </div>
    );
  }
}

// CreateProfile.propTypes = {
//   profile: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  success: state.success
});

export default connect(
  mapStateToProps,
  { createProfile, uploadProfileImage }
)(withRouter(CreateProfile));
