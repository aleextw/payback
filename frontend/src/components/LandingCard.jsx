import {
    Box,
    Card,
    Image,
  } from '@chakra-ui/react'

export default function LandingCard() {
  
    return (
      <Card maxW='6xl' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src='/landing_page_showcase.png' alt='Landing Page Card Image' />
      </Card>
    )
  }