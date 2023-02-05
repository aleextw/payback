import Footer from "../components/Footer";
import LandingPageHeader from "../components/LandingPageHeader";
import { Stack, Box, Spacer } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Base() {
    return (
        <Stack minH="100vh">
            <LandingPageHeader />
            <Box w="100%">
                <Outlet />
            </Box>
            <Spacer />
            <Footer />
        </Stack>
    );
}