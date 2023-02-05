import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Input,
    Button,
    Tooltip,
    Container,
    Center,
    useBreakpoint,
    Text,
    Box,
  } from '@chakra-ui/react'

import { useState } from 'react';
import AddPersonButton from '../components/ReceiptForm//AddPersonButton';
import DynamicSelector from '../components/ReceiptForm//DynamicSelector';
import EditPersonButton from '../components/ReceiptForm//EditPersonButton';

import { removePerson, addItem } from '../api/commonFunctions';
import TaxSection from '../components/ReceiptForm/TaxSection';

import { Form, useLocation, useNavigate } from 'react-router-dom';
import { postReceiptData } from '../api/api';

export default function CreateReceiptPage() {
  const location = useLocation();
  const [data, setData] = useState(location.state ? location.state : {documentName: "", people: [], items: [["", "", []]], serviceCharge: 10, gst: 9, isServiceCharge: true, isGst: true});
  const breakpoint = useBreakpoint({ ssr: false});
  const navigate = useNavigate();

  async function handleSubmit() {
    const response = await postReceiptData(data);
    navigate(`/view/${response}`);
  }

  return (
    <Box pl={{base: 2, md: 20}} pr={{base: 2, md: 20}} w="100%" >
      <Form>
        <Container maxW="sm" ml={0} centerContent={{base: true, md: false}}>
          <Input placeholder="Document Name" value={data.documentName} onChange={(e) => setData({...data, documentName: e.target.value})} display="flex"/>
        </Container>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th p={{base: 2, md: 5}}>
                  <Center>
                    Item
                  </Center>
                </Th>
                <Th p={{base: 2, md: 5}}>
                  <Center>
                    Cost
                  </Center>
                </Th>
                {
                  breakpoint === "base" ?
                    <Th p={{base: 2, md: 5}}>
                      <Center align="center">
                        Who Paid
                      </Center>
                    </Th>
                  :
                    data.people.map((person, index) => (
                      <Th p={{base: 1, md: 2}} key={index}>
                        <Center>
                          <Text>
                            {person}
                          </Text>
                          <EditPersonButton person={person} data={data} setData={setData} />

                          <Tooltip hasArrow label="Delete Name" aria-label="Delete Person">
                            <Box display="flex" color="red.500" as="button" type="button" onClick={() => removePerson(index, data, setData)} >
                              <CloseIcon/>
                            </Box>
                          </Tooltip>
                          
                        </Center>
                        
                        
                      </Th>
                    ))
                } 
                
                <Th pl={0} pr={0}>
                  <Center>
                    <AddPersonButton data={data} setData={setData} />
                  </Center>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <DynamicSelector data={data} setData={setData} />
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan={100}>
                  <Center align="center">
                    <Tooltip hasArrow label='Add Item'>
                      {/* <IconButton icon={<AddIcon />} as="button" onClick={() => addItem(data, setData)}/> */}
                      <Button rightIcon={<AddIcon />}onClick={() => addItem(data, setData)}>Add Item</Button>
                    </Tooltip>

                  </Center>
                </Th>
              </Tr>
              <TaxSection data={data} setData={setData}/>
              <Tr>
                <Th colSpan={100}>
                  <Center align="center">
                    <Button type='submit' onClick={handleSubmit}>Submit</Button> 
                  </Center>
                </Th>
              </Tr>
            </Tfoot>
            
          </Table>
        </TableContainer>
      </Form>
    </Box>
  );
}