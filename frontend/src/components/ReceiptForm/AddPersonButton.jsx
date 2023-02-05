import { useState, useRef } from "react";
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import {
    Button,
    Tooltip,
    IconButton,
    useDisclosure,
    useBreakpoint,
    Center,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
  } from '@chakra-ui/react'
import { addPerson, removePerson, updatePerson } from "../../api/commonFunctions";
import PersonModal from "./PersonModal";

export default function AddPersonButton({data, setData}) {
    const [name, setName] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [editing, setEditing] = useState("");

    const breakpoint = useBreakpoint();
    const initialRef = useRef(null);

    function handleDelete() {
        removePerson(editing, data, setData);
        onClose();
    }

    function handleSubmit() {
        if (name === "") {
            setError(true);
            return;
        }
        if (editing !== "") {
            updatePerson(editing, name, data, setData);
        } else {
            addPerson(name, data, setData);
        }
        setName("");
        setError(false);
        onClose();
        
    }
    if (breakpoint === "base") {
        return (
            <>
                <Center>
                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button} m={0}>
                            <EditIcon mb={1}/>
                        </MenuButton>
                        <MenuList>
                            {
                                data.people.map((person, personIndex) =>(
                                    <MenuItem 
                                        key={personIndex} 
                                        id={personIndex} 
                                        value={personIndex} 
                                        name={personIndex} 
                                        icon={<EditIcon/>}
                                        onClick={() => {setTitle("Edit Name"); setName(person); setEditing(personIndex); onOpen();}}
                                    >
                                        {person}
                                    </MenuItem>
                                ))
                            }
                            <MenuItem icon={<AddIcon />} onClick={() => {setTitle("Add Name"); setName(""); setEditing(""); onOpen();}}>
                                Add Name
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Center>
                <PersonModal isOpen={isOpen} onClose={onClose} error={error} title={title} handleDelete={editing === "" ? null : handleDelete} handleSubmit={handleSubmit} personName={name} setPersonName={setName} initialRef={initialRef}/>
        
            </>

            
        )
    }
    return (
        <>
            <Tooltip hasArrow label='Add Name'>
                <IconButton icon={<AddIcon />} onClick={onOpen}/>
            </Tooltip>
            
            <PersonModal isOpen={isOpen} onClose={onClose} error={error} title={title} handleDelete={null} handleSubmit={handleSubmit} personName={name} setPersonName={setName} initialRef={initialRef}/>
        </>
    )

}