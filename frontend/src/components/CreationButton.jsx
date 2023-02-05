import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Input, 
  useMultiStyleConfig,
  VStack,
  HStack,
  Text,
  Spinner,
} from '@chakra-ui/react'

import { useRef, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css'
import { postImageData } from "../api/api";

export default function CreationButton({size, iconSpacing, text}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const styles = useMultiStyleConfig("Button", { variant: "outline" });
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [rotate, setRotate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      }
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function resetState() {
    setImgSrc('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    setRotate(0);
  }

  async function submitImageData() {
    setIsLoading(true);
    console.log("Submitting")
    console.log({...completedCrop, rotate: rotate});
    const response = await postImageData({...completedCrop, imgSrc: imgSrc, rotate: rotate});
    console.log(response.data);
    navigate("/create", { state: response.data });
    resetState();
    setIsLoading(false);
    onClose();
  }

  if (location.pathname === "/create") {
    return (<></>);
  }
  return (
    <>
      <Button onClick={onOpen} rightIcon={<AddIcon/>} size={size} iconSpacing={iconSpacing}>
          {text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Document</ModalHeader>
          <ModalCloseButton />
          {
          isLoading ? 
            <ModalBody>
              <Center w="100%" h="100%" mb={5}>
                <Spinner />
              </Center>
            </ModalBody>
          :
            <ModalBody>
              <Text mb={5}>
                Do you want to create a new document from an image, or from scratch?
              </Text>

              <Center w="100%">
                <Form action="/create">
                  <VStack spacing={5} mb={5}>
                    <Input
                      type="file"
                      sx={{
                        "::file-selector-button": {
                          border: "none",
                          outline: "none",
                          mr: 2,
                          ...styles,
                        },
                      }}
                      accept="image/*"
                      placeholder="Select Image"
                      onChange={onSelectFile}
                    />
                    {!imgSrc && <Button type="submit" onClick={onClose}>From Scratch Please!</Button>}

                    {
                      imgSrc && 
                      <HStack>
                        <Button type="button" onClick={()=>setRotate(rotate + 90)}>Rotate</Button>
                        <Button type="button" onClick={()=>submitImageData()}>Submit</Button>
                      </HStack>
                    }

                    {!!imgSrc && (
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(_, percentCrop) => setCompletedCrop(percentCrop)}
                      >
                        <img
                          ref={imgRef}
                          alt="Crop Preview"
                          src={imgSrc}
                          style={{ borderRadius: "5px", transform: `rotate(${rotate}deg)` }}
                        />
                      </ReactCrop>
                    )}
                  </VStack>
                </Form>
              </Center>
            </ModalBody>
          }
        </ModalContent>
      </Modal>
    </>
  )
}

CreationButton.defaultProps = {
  size: 'md',
  iconSpacing: 5,
  text: 'Create',
}