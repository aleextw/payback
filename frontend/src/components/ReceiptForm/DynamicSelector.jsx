import { CloseIcon } from '@chakra-ui/icons';
import {
    Tr,
    Td,
    Input,
    Button,
    Tooltip,
    Checkbox,
    Center,
    useBreakpoint,
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
} from '@chakra-ui/react'

import { removeItem, updateItemName, updateItemPrice } from '../../api/commonFunctions';

function setDesktopCheckbox(data, setData, itemIndex, personIndex, e) {
    setData({
        ...data,
        items: data.items.map((item, itemSearchIndex) => {
            if (itemSearchIndex === itemIndex) {
                return [item[0], item[1], item[2].map((person, personSearchIndex) => {
                    if (personSearchIndex === personIndex) {
                        return e.target.checked;
                    }
                    return person;
                })];
            }
            return item;
        }
    )})
}

function setMobileCheckbox(data, setData, e, itemIndex) {
    const newItems = [...data.items];

    newItems[itemIndex][2] = newItems[itemIndex][2].map(_ => false);
    // Set only the selected elements to true
    e.forEach(cell => {
        const [itemIndex, personIndex] = cell.split('-');

        newItems[itemIndex][2][personIndex] = true;
    })

    setData({...data, items: newItems});    
} 

export default function DynamicSelector({data, setData}) {
    const breakpoint = useBreakpoint({ ssr: false});
    
    return (
        data.items.map((item, itemIndex) => (
            <Tr key={itemIndex}>
                <Td p={{base: 2, md: 5}}>
                    <Input id={`${itemIndex}-name`} value={item[0]} placeholder="Name" size="sm" onChange={(e) => {updateItemName(itemIndex, e.target.value, data, setData)}} />
                </Td>
                <Td p={{base: 2, md: 5}}>
                    <Input id={`${itemIndex}-price`} value={item[1]} placeholder="Price" size="sm" onChange={(e) => {updateItemPrice(itemIndex, e.target.value, data, setData)}} />
                </Td>
                {/* Take the slice from the third element of data.items to the end */}
                {
                    breakpoint === "base" ? 
                        <Td p={{base: 2, md: 5}}>
                            <Center>
                                <Menu closeOnSelect={false}>
                                    <MenuButton as={Button}>
                                        Select
                                    </MenuButton>
                                    <MenuList>
                                        <MenuOptionGroup 
                                            title='Select People' 
                                            type='checkbox' 
                                            onChange={(e) => setMobileCheckbox(data, setData, e, itemIndex)} 
                                            defaultValue={
                                                item[2].map(
                                                    (person, personIndex) => person ? `${itemIndex}-${personIndex}` : ""
                                                ).filter(person => person !== "")
                                            }
                                        >
                                            {
                                                item[2].map((_, personIndex) => (
                                                        <MenuItemOption 
                                                            key={`${itemIndex}-${personIndex}`} 
                                                            id={`${itemIndex}-${personIndex}`} 
                                                            value={`${itemIndex}-${personIndex}`} 
                                                            name={`${itemIndex}-${personIndex}`} 
                                                        >
                                                            {data.people[personIndex]}
                                                        </MenuItemOption>
                                                    )
                                                )
                                            }
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>
                            </Center>

                        </Td>
                    :
                        item[2].map((person, personIndex) => {
                            return (
                                <Td key={personIndex}>
                                    <Center>
                                        <Checkbox id={`${itemIndex}-${personIndex}`} isChecked={person} onChange={(e) => {setDesktopCheckbox(data, setData, itemIndex, personIndex, e)}}/>
                                    </Center>
                                </Td>
                            )
                        }
                        
                        )                       
                }
                <Td p={{base: 2, md: 5}}>
                    <Center>
                        <Tooltip hasArrow label='Delete Item'>
                            <CloseIcon onClick={(e) => removeItem(itemIndex, data, setData)}/>
                        </Tooltip>
                    </Center>
                </Td>
                        
            </Tr>
        ))
    );
}