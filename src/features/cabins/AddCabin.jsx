import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin({ children }) {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button style={{ display: "block", marginLeft: "auto" }}>
          Add new cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">{children}</Modal.Window>
    </Modal>
  );
}

export default AddCabin;
