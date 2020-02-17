import React from 'react';
import { Modal } from 'react-materialize';

class ModalForm extends React.Component {
  render() {
    return (
      <Modal
        trigger={
          <button className="waves-effect waves-light btn right red">
            <i className="material-icons right">cloud</i>Delete Your user
          </button>
        }
      >
        <div className="center" style={{ padding: '10px', color: 'black' }}>
          <h5>Are you sure you want to delete your User?</h5>
          <button
            onClick={this.props.onDelete}
            className="waves-effect waves-light red btn"
          >
            <i className="material-icons right">cloud</i>Delete Your user
            definitely
          </button>
        </div>
      </Modal>
    );
  }
}

export default ModalForm;
