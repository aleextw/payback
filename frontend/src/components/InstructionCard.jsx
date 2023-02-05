import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Center,
} from '@chakra-ui/react'

export default function InstructionCard({icon, title, text}) {
    return (
        <Card w="100%">
            <Center>
                {icon}
            </Center>
            <CardHeader pb={5}>
                <Heading size='md' textAlign="center" pb={2}>
                    {title}
                </Heading>
            </CardHeader>

            <CardBody h="10%" pt={0} pl={{base: 5, md: 10}} pr={{base: 5, md: 10}} mb={0}>
                <Text fontSize='sm' textAlign="center">
                    {text}
                </Text>
            </CardBody>
        </Card>
    );
}