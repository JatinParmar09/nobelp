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

// const Lists = () => {
//   const { colorMode, toggleColorMode } = useColorMode();

//   const [myData, setMyData] = useState([]);
//   const [isError, setIsError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const getPrizes = async () => {
//         try {
//           const res = await axios.get('/api/prize.json'); // Use the local /api path
//           const prizes = res.data.prizes.filter(
//             (prize) =>
//               parseInt(prize.year) >= 1900 &&
//               parseInt(prize.year) <= 2018
//           );
//           setMyData(prizes);
//         } catch (error) {
//           setIsError(error.message);
//           console.log(isError);
//         }
//       };

//     getPrizes();
//   }, []); 

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredPrizes = myData.filter((prize) => {
//     const categoryMatch =
//       selectedCategory === "" ||
//       prize.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     const yearMatch = selectedYear === "" || prize.year.includes(selectedYear);

//     const searchMatch =
//       searchTerm === "" ||
//       prize.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       prize.year.includes(searchTerm);

//     return categoryMatch && yearMatch && searchMatch;
//   });

//   const categoryOptions = [...new Set(myData.map((prize) => prize.category))];
//   const yearOptions = [...new Set(myData.map((prize) => prize.year))];

//   const pageSize = 10;
//   const pageCount = Math.ceil(filteredPrizes.length / pageSize);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pageCount) {
//         console.log('New Page:', newPage);
//       setCurrentPage(newPage);
//     }
//   };

//   return (
//     <ChakraProvider>
//       <ColorModeProvider>
//         <Container maxWidth={"100%"} centerContent height={"100vh"}>
//           <Box textAlign="right" p={4}>
//             <IconButton
//               icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
//               onClick={toggleColorMode}
//               variant="ghost"
//             />
//           </Box>
//           <Container maxWidth={"100%"} centerContent height={"100vh"}>
//           <Container maxWidth={"100%"} centerContent height={"100vh"}>
//             {/* <Input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearch}
//               placeholder="Search"
//               mb={"1.5rem"}
//               mt={"1.5rem"}
//               width={{ base: "90%", md: "60%", lg: "40rem" }}
//               border={"2px"}
//               borderColor={"gray.200"}
//             /> */}

//             <Select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               placeholder="Filter by Category"
//               mb="1rem"
//               width={{ base: "90%", md: "60%", lg: "40rem" }}
//             >
//               <option value="">All Categories</option>
//               {categoryOptions.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </Select>

//             <Select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//               placeholder="Filter by Year"
//               mb="1rem"
//               width={{ base: "90%", md: "60%", lg: "40rem" }}
//             >
//               <option value="">All Years</option>
//               {yearOptions.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </Select>
//             <List spacing={3}>
//   {filteredPrizes
//     .slice((currentPage - 1) * pageSize, currentPage * pageSize)
//     .map((prize, index) => (
//       <ListItem
//         key={prize.year + prize.category + index}
//         p="1rem"
//         borderWidth="1px"
//         borderColor="#ddd"
//         marginBottom="1rem"
//       >
//         <Text>Year: {prize.year}</Text>
//         <Text>Category: {prize.category}</Text>
//         <Text>
//           Laureates:{" "}
//           {prize.laureates
//             ? prize.laureates
//                 .map(
//                   (laureate) =>
//                     `${laureate.firstname} ${laureate.surname}`
//                 )
//                 .join(", ")
//             : "N/A"}
//         </Text>
//       </ListItem>
//     ))}
// </List>

// <Container mt={3} display="flex" justifyContent="space-between">
//   <Button
//     onClick={() => handlePageChange(currentPage - 1)}
//     disabled={currentPage <= 1}
//   >
//     Previous
//   </Button>
//   <Button
//     onClick={() => handlePageChange(currentPage + 1)}
//     disabled={currentPage >= pageCount}
//   >
//     Next
//   </Button>
// </Container>

//             {/* <List spacing={3}>
//               {filteredPrizes
//                 .slice((currentPage - 1) * pageSize, currentPage * pageSize)
//                 .map((prize, index) => (
//                   <ListItem
//                     key={prize.year + prize.category + index}
//                     p="1rem"
//                     borderWidth="1px"
//                     borderColor="#ddd"
//                     marginBottom="1rem"
//                   >
//                     <Text>Year: {prize.year}</Text>
//                     <Text>Category: {prize.category}</Text>
//                     <Text>
//                       Laureates:{" "}
//                       {prize.laureates
//                         ? prize.laureates
//                             .map(
//                               (laureate) =>
//                                 `${laureate.firstname} ${laureate.surname}`
//                             )
//                             .join(", ")
//                         : "N/A"}
//                     </Text>
//                   </ListItem>
//                 ))}
//             </List>

//             <Container mt={3} display="flex" justifyContent="space-between">
//               <Button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage <= 1}
//               >
//                 Previous
//               </Button>
//               <Button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === pageCount}
//               >
//                 Next
//               </Button>
//             </Container> */}
//           </Container>
//           </Container>
//         </Container>
//       </ColorModeProvider>
//     </ChakraProvider>
//   );
// };

// export default Lists;

// ... (existing imports)

const Lists = () => {
    // ... (existing state and functions)
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
          const res = await axios.get('/api/prize.json'); // Use the local /api path
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
            <Box display="flex" justifyContent="space-between" mb={4}>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                placeholder="Filter by Category"
                w="45%"
              >
                <option value="">All Categories</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              </Select>
  
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                placeholder="Filter by Year"
                w="45%"
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
                     leftIcon={<ArrowBackIcon />}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    Previous
                  </Button>
                  <Button
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
              >
                <Text>
                  Name: {laureate.firstname} {laureate.surname}
                </Text>
                <Text>Number of Nobel Prizes: {laureate.count}</Text>
              </ListItem>
            ))}
          </List>
        </Container>
      )}
        </ColorModeProvider>
      </ChakraProvider>
    );
  };
  
  export default Lists;
  