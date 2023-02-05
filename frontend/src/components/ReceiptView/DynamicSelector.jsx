import {
    Tr,
    Td,
    Button,
    Checkbox,
    Center,
    useBreakpoint,
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
    Text,
} from '@chakra-ui/react'

export default function DynamicSelector({data}) {
    const breakpoint = useBreakpoint({ ssr: false});
    
    return (
        data.items.map((item, itemIndex) => (
            <Tr key={itemIndex}>
                <Td p={{base: 2, md: 5}}>
                    <Center>{item[0]}</Center>
                </Td>
                <Td p={{base: 2, md: 5}}>
                    <Center>{item[1]}</Center>
                </Td>
                {/* Take the slice from the third element of data.items to the end */}
                {
                    breakpoint === "base" ? 
                        <Td p={{base: 2, md: 5}}>
                            <Center>
                                <Menu closeOnSelect={false}>
                                    <MenuButton as={Button}>
                                        View
                                    </MenuButton>
                                    <MenuList>
                                        <MenuOptionGroup 
                                            type='checkbox' 
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
                                                            isDisabled
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
                                        <Checkbox id={`${itemIndex}-${personIndex}`} isChecked={person} isDisabled/>
                                    </Center>
                                </Td>
                            )
                        }
                        
                        )                       
                }                        
            </Tr>
        ))
    );
}