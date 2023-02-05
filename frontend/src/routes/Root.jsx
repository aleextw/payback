import {
  VStack,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Container
} from '@chakra-ui/react'


import LandingCard from "../components/LandingCard";
import InstructionCard from "../components/InstructionCard";
import { AttachmentIcon, CheckIcon, CopyIcon } from "@chakra-ui/icons";


export default function Root() {
  return(
    <Box pl={{base: 5, md: 20}} pr={{base: 5, md: 20}} w="100%" h="100%">
      <VStack mt={{base: 5, md: 20}} mb={{base: 5, md: 20}}>
        <Heading size={{base: "lg", md: "3xl"}} mb={{base: 2, md: 5}} textAlign="center">
          Split bills at the snap of a finger.
          Or an image.
        </Heading>
        <Text fontSize={{base: "md", md: "xl"}} mb={{base: 2, md: 5}} textAlign="center">
          Payback is no longer a b***h.
        </Text>
      </VStack>
      
      <Center mb={20}>
        <LandingCard />
      </Center> 

      <Container w="100%" maxW="container.lg" mb={20}>
        <Heading size="lg" mb={5} textAlign="center">
          How It Works:
        </Heading>
        <Stack direction={{base: "column", md: "row"}} w="100%" h="100%">
          <InstructionCard 
            icon={<AttachmentIcon boxSize={10} mt={10} mb={5}/>} 
            title="Take a picture of your receipt" 
            text="Take a picture of your receipt and slect the billable items, or just create a new bill from scratch."
          />
          <InstructionCard
            icon={<CheckIcon boxSize={10} mt={10} mb={5}/>}
            title="Split the bill"
            text="Select the items you want to split and who you want to split them with."
          />
          <InstructionCard 
            icon={<CopyIcon boxSize={10} mt={10} mb={5}/>}
            title="Share the bill"
            text="Share the bill with your friends and family."
          />
        </Stack>
      </Container>
    
    </Box>
  )
}