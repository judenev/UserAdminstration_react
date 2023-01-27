import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSetProfilePictureMutation} from '../../redux/Features/api/apiSlice';


const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];
  
  const schema = yup.object().shape({
    profilePic: yup
      .mixed()
      .typeError("Please select a valid image")
      .test("fileType", "Selected file is not an image", (value) =>
        Object.entries(value).every((img) =>
          SUPPORTED_FORMATS.includes(img[1].type)
        )
      ),
  });

export default function ChangePhotoModal({id}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSubmitError('')
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const [changePicture] = useSetProfilePictureMutation()
  const [submitError,setSubmitError]= useState('')

  const submitHandler = async (data) => {
    try {
      const { profilePic } = data;
      const formData = new FormData();
      formData.append("profilePic", profilePic[0]);
      const res = await changePicture({ formData, id }).unwrap();
      if(res.status==="success"){
        handleClose()
      }
    } catch (err) {
       setSubmitError(err.data.message)
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{width:"10rem",
    marginLeft: "30px"}}>
        CHANGE PHOTO
      </Button>

      <Modal show={show} onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Form.Group className="mb-3" >
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                id='filepic'
                {...register("profilePic")}
              />
              <p style={{color:"red"}}>{errors.profilePic?.message}</p>
            </Form.Group>
            <p style={{color:"red"}}>{submitError}</p>
            <Modal.Footer>
            
            <Button variant="primary" type='submit'>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
          </Form>

        </Modal.Body>
       
      </Modal>
    </>
  );
}
