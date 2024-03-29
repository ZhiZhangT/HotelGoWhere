import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Spinner,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Alert,
    AlertIcon,
    AlertTitle,
    Popover,
    PopoverTrigger,
    PopoverContent,
    StackDivider,
    PopoverArrow,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
    HStack,
    VStack,
    Center,
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { postLogout } from '../api/services/destinations';


export default function NavBar() {

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const loginRoute = () => {
    if (!(location.pathname === "/login" || location.pathname === "/register")) {
      sessionStorage.setItem("prevURL", location.pathname + location.search);
    }
    navigate("/login");
  }

  const registerRoute = () => {
    if (!(location.pathname === "/login" || location.pathname === "/register")) {
      sessionStorage.setItem("prevURL", location.pathname + location.search);
    }
    navigate("/register");
  }

  const logout = () => {
    const body = {
      username: sessionStorage.getItem("username"),
      token: sessionStorage.getItem("token")
    };
    let response;
    setLoggingOut(true);
    postLogout(JSON.stringify(body)).then((data) => {
      response = data;
      setLoggingOut(false);
      if (response.status === 200) {
        if (response.valid === "") {            
          sessionStorage.removeItem("token");   
          sessionStorage.removeItem("firstName");
          sessionStorage.removeItem("lastName");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("phoneNumber");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("prevURL");
          navigate("/");
        } else {
          setLogoutError(response.valid);
        }
      } else {
        setLogoutError("Logout failed for unknown reasons. Please try again.");
        setInterval(() => setLogoutError(""), 5000);
      }
    });
  }

  if (sessionStorage.getItem("currency") ===  null) {sessionStorage.setItem("currency", "SGD")};
  const [selectedCurrency, setSelectedCurrency] = useState(sessionStorage.getItem("currency") === null ? "SGD" : sessionStorage.getItem("currency"))

  const changeCurrency = (e) => {
    sessionStorage.setItem("currency", e.target.innerText);
    setSelectedCurrency(e.target.innerText);
    console.log(params.toString());
    params.set("currency", e.target.innerText);
    console.log(params.toString());
    setTimeout(() => window.location.reload(), 100);
    navigate(location.pathname + "?" + params.toString());
  }

  const currencies = [
    ["USD", "COP", "INR", "PHP", "QAR", "SAR", "THB", "LKR", "ILS", "NZD", "AUD", "EGP", "GBP", "IDR", "VND", "KRW", "TWD"],
    ["CHF", "DKK", "MYR", "PLN", "RUB", "SGD", "BND", "CNY", "AED", "SEK", "CAD", "EUR", "HKD", "ISK", "JPY", "TRY", "ZAR"]
  ]

  const currencyElement = () => {
    return (<Popover>
      <PopoverTrigger>
        <Button>{selectedCurrency}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <HStack w="100%" divider={<StackDivider borderColor='gray.200' />}>
            {currencies.map((col) => <VStack w="100%">
              {col.map((code) => (<Center w="100%">
                <Text cursor="pointer" onClick={changeCurrency}>{code}</Text>
              </Center>))}
            </VStack>)}
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>);
  }

  const { isOpen, onToggle } = useDisclosure();
  const [ loggingOut, setLoggingOut ] = useState(false);
  const [ logoutError, setLogoutError ] = useState("");
  
  function ManageUser() {
    if (sessionStorage.getItem("token")) {
      const firstName = sessionStorage.getItem("firstName") !== null ? sessionStorage.getItem("firstName") : "Traveller";

      return (
        <Stack direction="row" h="100%" alignItems="center" divider={<StackDivider borderWidth/>}>
          {logoutError !== "" && <Alert status='error'>
          <AlertIcon />
            <AlertTitle>{logoutError}</AlertTitle>
          </Alert>}
          { currencyElement() }
          <Text name="namePlaceholder" textAlign="center" p="2">Hello {firstName}!</Text>
          <Button name="LogoutButton"
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'teal.400'}
            _hover={{
              bg: 'teal.300',
            }}
            onClick={logout}>
            {loggingOut ? <Spinner /> : "Log Out"}
          </Button>
        </Stack>
        
      )
    }

    else {

      return (
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          divider={<StackDivider borderWidth/>}
        >
          { currencyElement() }
          <Button name="button_login"
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            cursor='pointer'
            onClick={loginRoute}>
            Log In
          </Button>
          <Button name="button_register"
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}
            onClick={registerRoute}>
            Register
          </Button>
        </Stack>
      )
    }
  }

  return (
    <Box h="100%">
      <Flex
        
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        h="100%"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link
            name="button_linkToHomePage"
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            href="/">
            C5G8
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        
        <ManageUser/>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => {
          if (!navItem.login || (navItem.login && sessionStorage.getItem("token") !== null)) { 
            return (<Box key={navItem.label}>
              <Popover trigger={'hover'} placement={'bottom-start'}>
                <PopoverTrigger>
                  <Link name={navItem.name}
                    p={2}
                    href={navItem.href ?? '#'}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}>
                    {navItem.label}
                  </Link>
                </PopoverTrigger>
    
                {navItem.children && (
                  <PopoverContent
                    border={0}
                    boxShadow={'xl'}
                    bg={popoverContentBgColor}
                    p={4}
                    rounded={'xl'}
                    minW={'sm'}>
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </PopoverContent>
                )}
              </Popover>
            </Box>);
          } 
          return "";
        })}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Box
      color='white'
      bg='white'
    >
      <Stack
      p={4}>
      {NAV_ITEMS.map((navItem) => {
        if (!navItem.login || (navItem.login && sessionStorage.getItem("token") !== null)) { 
          return (
            <MobileNavItem name={navItem.name} key={navItem.label} {...navItem} />
          );
        } 
        return "";
      })}
    </Stack>
    </Box>
    
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important'}}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {label: "View a Booking", name:'button_viewBooking', href: "/booking/search", login: false},
  {label: "My Profile", name: "button_myProfile", href: "/profile", login: true},
];
