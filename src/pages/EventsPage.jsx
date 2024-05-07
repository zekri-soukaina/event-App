import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { AddEvent } from "../components/AddEvent";
import { useState } from "react";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return {
    events: await events.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventsPage = () => {
  const { events, categories, users } = useLoaderData();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [error, setError] = useState(null);

  const [searchField, setSearchField] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [eventsList, setEvents] = useState(events);
  const [userList, setUserList] = useState(users);
  const [categoryList, setCategoryList] = useState(categories);

  const createEvent = async (event) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });

      if (!response.ok) {
        throw new Error("Faild to create event:" + response.statusText);
      }
      const newEvent = await response.json();
      setEvents([...eventsList, newEvent]);
      onClose(); // on close the modle after adding the event
    } catch (error) {
      console.error("Error creating event:", error.message);

      setError("Failed to fetch event data. Please try again later.");
    }
  };
  console.log("events List,", eventsList);

  const createUser = async (user) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      if (!response.ok) {
        throw new Error("Faild to create user:" + response.statusText);
      }
      const newUser = await response.json();
      setUserList([...userList, newUser]);
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  console.log("users list", userList);

  const createCategory = async (category) => {
    try {
      const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        body: JSON.stringify(category),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      if (!response.ok) {
        throw new Error("Faild to create category :" + response.statusText);
      }
      const newCategory = await response.json();
      setCategoryList([...categoryList, newCategory]);
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  console.log("category list", categoryList);

  const matchedEvent = eventsList.filter((event) => {
    const isMatchingSearch = event.title
      .toLowerCase()
      .includes(searchField.toLowerCase());
    const isMatchingCategory = selectedCategory
      ? event.categoryIds.includes(parseInt(selectedCategory))
      : true;

    return isMatchingSearch && isMatchingCategory;
  });

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId === "all" ? null : categoryId);
  };
  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="5">
        <Heading m={5}> All events -({events.length})</Heading>
        <Button onClick={onOpen} colorScheme={"orange"}>
          Add New Event
        </Button>
      </Flex>
      <Center flexDir="column">
        <Input
          type="text"
          onChange={(e) => setSearchField(e.target.value)}
          placeholder="search for event by name.."
          size="md"
          bgColor="white"
          w="80%"
          m={2}
        />
        <Select
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory || "all"}
          size="md"
          bg="white"
          w="80%"
          m={2}>
          <option value="all"> All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Center>

      <Center
        gap={8}
        // w={{ base: "full" }}
        w={{ base: "full", sm: "85%" }}
        flexWrap="wrap"
        flexDir={{ base: "column", sm: "row" }}
        justify={"center"}
        alignSelf={"center"}>
        {matchedEvent && matchedEvent.length > 0 ? (
          matchedEvent.map((event) => (
            <Card
              bgColor="white"
              w="sm"
              height={"45rem"}
              borderRadius={"xl"}
              cursor={"pointer"}
              _hover={{ transform: "scale(1.05)" }}
              m={5}
              p={5}
              key={event.id}>
              <Heading size="lg" color={"orange.500"} align={"center"}>
                <Link to={`/events/${event.id}`}>{event.title} </Link>
                <ExternalLinkIcon />
              </Heading>
              <CardBody>
                <Image
                  src={event.image}
                  alt={event.title}
                  h={60}
                  w="100%"
                  borderRadius="xl"
                  objectFit="cover"
                />
                <Stack mt="6" spacing="3">
                  <Text>
                    Categories:
                    {event.categoryIds
                      .map(
                        (categoryId) =>
                          categories.find(
                            (category) => Number(category.id) === categoryId
                          )?.name
                      )
                      .join(", ")}
                  </Text>
                  <Text>{event.description}.</Text>
                  <Text color="orange.600" fontSize="2xl">
                    Location: {event.location}
                  </Text>
                  <Heading size="lg" color={"orange.600"} align={"center"}>
                    {new Date(event.startTime).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Heading>
                  <Text size="lg" color={"orange.600"} align={"center"}>
                    {" "}
                    Created by-
                    {
                      users.find((user) => event.createdBy === Number(user.id))
                        ?.name
                    }
                  </Text>
                </Stack>
              </CardBody>
              <Divider />

              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="orange">
                    Start: {event.startTime.slice(11, 16)}
                  </Button>
                  <Button
                    variant="ghost"
                    colorScheme="orange"
                    border={"2px solid orange"}>
                    End: {event.endTime.slice(11, 16)}
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Text>No events found</Text>
        )}
      </Center>

      <Modal size={["full", "md"]} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            height={["full", "fit-content"]}
            display={"flex"}
            justifyContent={"center"}
            alignItems={["center", "flex-start"]}
            flexDir={"column"}>
            <AddEvent
              createEvent={createEvent}
              createCategory={createCategory}
              createUser={createUser}
              users={userList}
              categories={categoryList}
              events={events}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              border={"1px solid teal"}
              color={"teal"}
              onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
