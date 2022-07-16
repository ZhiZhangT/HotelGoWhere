import { Box, Center, Flex, Text, Select, Stack, Button, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import Autocomplete from "./Autocomplete";
import { getDestinations } from "../api/services/destinations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
    IconButton,
    CloseButton,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    useDisclosure,
  } from '@chakra-ui/react';
  import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
  } from 'react-icons/fi';
  
  const LinkItems = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending', icon: FiTrendingUp },
    { name: 'Explore', icon: FiCompass },
    { name: 'Favourites', icon: FiStar },
    { name: 'Settings', icon: FiSettings },
  ];
  
  export default function SideSearchBar({ children }) {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Box>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}>
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
      </Box>
    );
  }
  
  const SidebarContent = ({ onClose, ...rest }) => {
    const navigate = useNavigate();
    
    // TODO: Load data from local storage and load reasonable defaults if not present

    const searchRoute = () => {
        // TODO: Add error checking for invalid UIDs
        // TODO: Store data to local storage        
        // navigate(`/hotels?${selectedDestination}?checkInDate=${selectedDates[0]}&checkOutDate=${selectedDates[1]}&guests=${numAdults + numChildren}&currency=${currency}`);
        navigate(`/hotels?uid=${selectedDestination}&checkInDate=${formatDate(selectedDates[0])}&checkOutDate=${formatDate(selectedDates[1])}&guests=${numAdults + numChildren}&currency=SGD`);
    }

    const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [numRooms, setNumRooms] = useState(1);
    const [numAdults, setNumAdults] = useState(2);
    const [numChildren, setNumChildren] = useState(0);
    // const [currency, setCurrency] = useState("SGD");
    
    useEffect(() => {
        getDestinations(setDestinations);
    }, []);
    // TODO: Fix background colour / decide on what colour to use
    return (
        <Center h="100%">
            <Box h="100%" p="5" overflow="hidden"  bgColor="rgb(127, 127, 127)">
                <Stack>
                    <Text ml={2} color="white">Destination or Hotel</Text>
                    <Autocomplete suggestions={destinations} placeholder="Destination or Hotel" onSelect={setSelectedDestination}/>
                </Stack>

                <Stack>
                    <Text ml={2}>Dates of Stay</Text>
                    <RangeDatepicker
                        selectedDates={selectedDates}
                        onDateChange={setSelectedDates}
                    />
                </Stack>

                <Flex gap="5">
                    <Stack>
                        <Text>Rooms</Text>
                        <Select value={numRooms} onChange={setNumRooms}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </Select>
                    </Stack>
                    
                    <Stack>
                        <Text>Adults</Text>
                        <Select value={numAdults} onChange={setNumAdults}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </Select>
                    </Stack>
                    
                    <Stack>
                        <Text>Children</Text>
                        <Select value={numChildren} onChange={setNumChildren}>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </Select>
                    </Stack>
                </Flex>
                <Stack>
                    <Button onClick={ searchRoute }width="100%" colorScheme="red">Submit</Button>
                </Stack>
                
            </Box>
        </Center>
    );
  };
  
  const NavItem = ({ icon, children, ...rest }) => {
    return (
      <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };

function addLeadingZeros(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
}

function formatDate(date) {
    return date.getFullYear() + "-" + addLeadingZeros(date.getMonth() + 1) + "-" + addLeadingZeros(date.getDate())
}
