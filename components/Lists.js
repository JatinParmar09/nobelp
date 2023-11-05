import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Text,
  Input,
  Select,
  Button,
  List,
  ListItem,
  ListIcon,
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

const Lists = () => {
    const { colorMode, toggleColorMode } = useColorMode();

  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPrizes = async () => {
        try {
          const res = await axios.get('http://api.nobelprize.org/v1/prize.json'); // Use the local /api path
          const prizes = res.data.prizes.filter(
            (prize) =>
              parseInt(prize.year) >= 1900 &&
              parseInt(prize.year) <= 2018
          );
          setMyData(prizes);
        } catch (error) {
          setIsError(error.message);
          console.log(isError);
        }
      };

    getPrizes();
  }, []); 
  const [multiTimeWinners, setMultiTimeWinners] = useState([]);

  useEffect(() => {
    const getMultiTimeWinners = () => {
      const laureates = {};
      myData.forEach((prize) => {
        if (prize.laureates) {
          prize.laureates.forEach((laureate) => {
            if (laureate.id in laureates) {
              laureates[laureate.id].count += 1;
            } else {
              laureates[laureate.id] = {
                id: laureate.id,
                firstname: laureate.firstname,
                surname: laureate.surname,
                count: 1,
              };
            }
          });
        }
      });

      const multiTimeWinners = Object.values(laureates).filter(
        (laureate) => laureate.count > 1
      );

      setMultiTimeWinners(multiTimeWinners);
    };

    getMultiTimeWinners();
  }, [myData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPrizes = myData.filter((prize) => {
    const categoryMatch =
      selectedCategory === "" ||
      prize.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const yearMatch = selectedYear === "" || prize.year.includes(selectedYear);

    const searchMatch =
      searchTerm === "" ||
      prize.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prize.year.includes(searchTerm);

    return categoryMatch && yearMatch && searchMatch;
  });

  const categoryOptions = [...new Set(myData.map((prize) => prize.category))];
  const yearOptions = [...new Set(myData.map((prize) => prize.year))];

  const pageSize = 10;
  const pageCount = Math.ceil(filteredPrizes.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
        console.log('New Page:', newPage);
      setCurrentPage(newPage);
    }
  };
  
    return (
      <ChakraProvider>
        <Container background={"#b57bee"}>
        <ColorModeProvider>
          <Container maxW="xl" p={4}>
            <Box textAlign="right">
              {/* <IconButton
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
              /> */}
            </Box>
            <Box mb={4}>
              {/* <Input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search"
              /> */}
            </Box>
              <Text fontSize='2xl' as='b' align='center'>Name Of All Nobel Prize Winners</Text>
            <Box display="flex" justifyContent="space-between" mb={4}>
              <Select
              boxShadow='dark-lg' p='2' rounded='md' bg='white'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                placeholder="Filter by Category"
                w="70%"
              >
                <option value="">All Categories</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              </Select>
  
              <Select
              boxShadow='dark-lg' p='2' rounded='md' bg='white'
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                placeholder="Filter by Year"
                w="70%"
              >
                <option value="">All Years</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
              </Select>
            </Box>
  
            {filteredPrizes.length === 0 ? (
              <Text>No prizes match the current filters.</Text>
            ) : (
              <>
                <List spacing={3}>
                  {filteredPrizes
                    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    .map((prize, index) => (
                      <ListItem
                        key={prize.year + prize.category + index}
                        borderWidth="1px"
                        borderColor="#ddd"
                        p={4}
                        borderRadius="md"
                        boxShadow='dark-lg'  rounded='md' bg='white'
                        bgGradient='linear(to-l, #b57bee, #392d69)'
                      >
                         <Text color={"white"}>Year: {prize.year}</Text>
        <Text color={"white"}>Category: {prize.category}</Text>
        <Text color={"white"}>
          Laureates:{" "}
          {prize.laureates
            ? prize.laureates
                .map(
                  (laureate) =>
                    `${laureate.firstname} ${laureate.surname}`
                )
                .join(", ")
            : "N/A"}
        </Text>
                      </ListItem>
                    ))}
                </List>
  
                <Container mt={3} display="flex" justifyContent="center" gap='50px'>
                  <Button
                  boxShadow='dark-lg' p='3' rounded='md' bg='white'
                     leftIcon={<ArrowBackIcon />}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    Previous
                  </Button>
                  <Button
                  boxShadow='dark-lg' p='3' rounded='md' bg='white'
                    rightIcon={<ArrowForwardIcon />}
                    
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= pageCount}
                  >
                    Next
                  </Button>
                </Container>
              </>
            )}
          </Container>
          {multiTimeWinners.length > 0 && (
        <Container maxW="xl" p={4}>
          <Text fontWeight="bold" fontSize="xl" mb={2}>
            Multi-Time Nobel Prize Winners
          </Text>
          <List spacing={3}>
            {multiTimeWinners.map((laureate) => (
              <ListItem
                key={laureate.id}
                borderWidth="1px"
                borderColor="#ddd"
                p={4}
                borderRadius="md"
                boxShadow='dark-lg'  rounded='md' bg='white'
                        bgGradient='linear(to-l, #b57bee, #392d69)'
              >
                <Text color={"white"}>
                  Name: {laureate.firstname} {laureate.surname}
                </Text>
                <Text color={"white"}>Number of Nobel Prizes: {laureate.count}</Text>
              </ListItem>
            ))}
          </List>
        </Container>
      )}
        </ColorModeProvider></Container>
      </ChakraProvider>
    );
  };
  
  export default Lists;
  