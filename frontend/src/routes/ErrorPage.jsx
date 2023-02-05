import { VStack, Heading, Text, Spacer } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <VStack h="100%">
      <Spacer />
      <Heading>Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>
        <i>{error.statusText || error.message}</i>
      </Text>
      <Spacer />
    </VStack>
  );
}