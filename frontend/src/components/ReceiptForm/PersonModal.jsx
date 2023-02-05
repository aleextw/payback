import {
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormErrorMessage,
  } from '@chakra-ui/react'


export default function PersonModal({isOpen, onClose, error, title, handleDelete, handleSubmit, personName, setPersonName, initialRef}) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
                <ModalOverlay />
                <ModalContent ml={2} mr={2}>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isInvalid={error}>
                            <Input placeholder="Name" value={personName} onChange={(e) => setPersonName(e.target.value)} onSubmit={handleSubmit} ref={initialRef}/>
                            <FormErrorMessage>Field cannot be empty.</FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        {
                            handleDelete && <Button colorScheme="red" mr={3} onClick={handleDelete}>
                                Delete
                            </Button>
                        }
                    
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}