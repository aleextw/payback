import {
    Box,
    Flex,
    Button,
    Stack,
    useColorMode,
    Link,
  } from '@chakra-ui/react';
  import { MoonIcon, SunIcon } from '@chakra-ui/icons';
  import CreationButton from './CreationButton';

  import { Link as RRLink } from 'react-router-dom';
  
  export default function LandingPageHeader() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <>
        <Box px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'} pl={{base: 5, md: 20}} pr={{base: 5, md: 20}}>
            <Box>
              <Link as={RRLink} to="/">
                Payback.
              </Link>
            </Box>
  
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
  
                <CreationButton />
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </>
    );
  }
  