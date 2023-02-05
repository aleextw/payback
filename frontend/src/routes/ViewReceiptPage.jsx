import { 
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Input,
  Tr,
  Th,
  Center,
  useBreakpoint,
  Text,
  Heading,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { getReceiptData } from "../api/api";
import { useLoaderData } from "react-router-dom"
import DynamicSelector from "../components/ReceiptView/DynamicSelector";
import TaxSection from "../components/ReceiptView/TaxSection";
import { CopyIcon } from "@chakra-ui/icons";

export async function loader({ params }) {
    const receipt = await getReceiptData(params.receiptId);
    
    if (!receipt) {
        throw new Response("", {
            status: 404,
            statusText: `Receipt with ID "${params.receiptId}" Not Found`
        });
    }
    
    return { receipt };
}

export async function action({ request, params }) {
}



export default function CreateReceiptPage() {
  const { receipt } = useLoaderData();
  const breakpoint = useBreakpoint({ ssr: false });
  const toast = useToast();

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard!",
      status: "success",
      duration: 3000, isClosable: true,
      position: "top",
    });
  }

  return (
    <Box pl={{base: 2, md: 20}} pr={{base: 2, md: 20}} w="100%" >
      <Center w="100%">
        <Heading>{receipt.documentName}</Heading>
      </Center>
      
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
                  receipt.people.map((person, index) => (
                    <Th p={{base: 1, md: 2}} key={index}>
                      <Center>
                        <Text>
                          {person}
                        </Text>                          
                      </Center>
                      
                      
                    </Th>
                  ))
              } 
            </Tr>
          </Thead>
          <Tbody>
            <DynamicSelector data={receipt} />
            <TaxSection data={receipt}/>
          </Tbody>
        </Table>
      </TableContainer>

      <Center mt={10}>
        <VStack w="100%" spacing={5}>
          <Text align="center">Share this link with your friends for them to view!</Text>
          <InputGroup w={{base: "100%", md: "50%"}}>
            <Input value={window.location.href} isDisabled/>
            <InputRightElement>
              <IconButton icon={<CopyIcon />} onClick={copyLinkToClipboard}/>
            </InputRightElement>
          </InputGroup>
        </VStack>
      </Center>
    </Box>

    
  );
}