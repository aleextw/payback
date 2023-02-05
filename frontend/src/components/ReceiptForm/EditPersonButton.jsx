import { useState, useRef } from "react";
import { EditIcon } from '@chakra-ui/icons';
import {
    Tooltip,
    useDisclosure,
    Box,
  } from '@chakra-ui/react'

import { removePerson, updatePerson } from "../../api/commonFunctions";
import PersonModal from "./PersonModal";



export default function EditPersonButton({person, data, setData}) {
    const [personName, setPersonName] = useState(person);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [error, setError] = useState(false);

    const initialRef = useRef(null);

    function handleDelete() {
        removePerson(data.people.indexOf(person), data, setData);
        onClose();
    }

    function handleSubmit() {
        if (personName === "") {
            setError(true);
            return;
        }
        
        updatePerson(person, personName, data, setData);
        onClose();
        
    }

    return (
        <>
            <Tooltip hasArrow label='Edit Name'>
                <Box display="flex" as="button" type="button">
                    <EditIcon onClick={onOpen} ml={5} mr={5}/>
                </Box>
            </Tooltip>
            
            <PersonModal isOpen={isOpen} onClose={onClose} error={error} title="Edit Name" handleDelete={handleDelete} handleSubmit={handleSubmit} personName={personName} setPersonName={setPersonName} initialRef={initialRef}/>
        </>
    )

}