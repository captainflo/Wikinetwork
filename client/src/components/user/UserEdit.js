import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import validate from "./Validation";
import renderField from "./renderField";
import * as actions from "../actions";
import ModalForm from "./ModalForm";
import normalizePhone from "./normalizePhone";

class UserEdit extends React.Component {
  state = {
    image: ""
  };
  onDelete = () => {
    const id = this.props.auth._id;
    this.props.deleteUser(id, () => {
      this.props.history.push(`/`);
    });
  };

  deletePhoto = () => {
    this.setState({ image: "" });
  };

  uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: "dwtc6zep7", upload_preset: "xglbitak", tags: ["xmas"] },
      (error, result) => {
        if (result) {
          this.setState({ image: result[0].url });
        }
      }
    );
  };

  render() {
    const { error, handleSubmit, submitting } = this.props;

    const onSubmit = formProps => {
      const id = this.props.auth._id;

      const form = {
        firstName: formProps.firstName,
        lastName: formProps.lastName,
        description: formProps.description,
        phone: formProps.phone,
        avatar: this.state.image || this.props.auth.avatar
      };

      this.props.editUser(id, form, () => {
        this.props.history.push(`/user/${id}`);
      });
    };

    return (
      <div className="container">
        <div className="card">
          <h4 className="center">Edit user</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col m6 s12">
                <div className="input-field">
                  <Field
                    name="firstName"
                    type="text"
                    component={renderField}
                    placeholder="First name"
                    label="First name"
                    icon="account_circle"
                  />
                </div>
              </div>
              <div className="col m6 s12">
                <div className="input-field">
                  <Field
                    name="lastName"
                    type="text"
                    component={renderField}
                    placeholder="Last name"
                    label="Last name"
                    icon="account_circle"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m6 s12">
                <div className="input-field">
                  <Field
                    name="description"
                    type="text"
                    component={renderField}
                    label="Description"
                    icon="description"
                  />
                  <span className="asterick right">10 characters Min</span>
                </div>
              </div>
              <div className="col m6 s12">
                <div className="input-field">
                  <Field
                    name="phone"
                    type="tel"
                    component={renderField}
                    normalize={normalizePhone}
                    label="786-212-2947"
                    icon="phone"
                  />
                </div>
              </div>
            </div>
            {error && <strong>{error}</strong>}
            <div className="upload">
              <div>Add Photo</div>
              <p
                onClick={this.uploadWidget.bind(this)}
                className="upload-button"
              >
                <i className="fas fa-camera"></i>
              </p>

              {this.state.image ? (
                <div>
                  <div className="delete-picture" onClick={this.deletePhoto}>
                    <i className="far fa-times-circle"></i>
                  </div>
                  <img
                    className="photo-show"
                    src={this.state.image}
                    alt="avatar"
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="center">
              <button
                type="submit"
                disabled={submitting}
                className="waves-effect waves-light btn btn-signin"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <ModalForm onDelete={this.onDelete} />
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    auth: state.auth.authenticated
  };
}

export default compose(
  connect(mapStateToPros, actions),
  reduxForm({ form: "userEdit", validate })
)(UserEdit);
