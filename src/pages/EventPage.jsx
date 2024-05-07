import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");
  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const navigateTo = useNavigate();
  const toast = useToast();
  const { event, users, categories } = useLoaderData();
  const user = users.find((user) => event.createdBy === Number(user.id));

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editEvent, setEditEvent] = useState(event);

  useEffect(() => {
    setEditEvent(event);
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editEvent),
      });
      if (!response.ok) {
        throw new Error("Faild to update event details");
      }
      setEditEvent(editEvent);
      onClose();
      toast({
        title: "Event updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigateTo("/");
    } catch (e) {
      console.log("Error updating event details", e);
      toast({
        title: "Error updating Event",
        description: "Faild to update event details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEvent({
      ...editEvent,
      [name]: value,
    });
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/events/${event.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Faild to delete event");
        }
        toast({
          title: "Event deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigateTo("/");
      } catch (e) {
        console.log("Error deleting event", e);

        toast({
          title: "Erroor deleting event",
          description: "Faild to delete  event",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap={2}>
        <Heading m={8}>Event details:</Heading>
        <Button colorScheme="teal" onClick={onOpen}>
          Edit Event
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
          Delete Event
        </Button>
      </Flex>

      <Center flexDirection="column" p={10}>
        <Card
          h="fit-content"
          // w="2xl"
          boxShadow="dark-lg"
          rounded="md"
          bg="white"
          borderWidth={"1px"}
          overflow={"hidden"}
          // maxW={"fit-content"}
          maxH={"fit-content"}
          m={10}
          p={6}
          borderRadius={"xl"}
          cursor={"pointer"}
          gap={4}
          w={{ base: "full", sm: "85%" }}>
          <Heading as="h2" size={"lg"} mb={2}>
            {event.title}
          </Heading>

          <CardHeader>
            {user ? (
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name={user.name} src={user.image} />
                  <Box>
                    <span>Organized By:</span>
                    <Heading size="sm">{user.name}</Heading>
                  </Box>
                </Flex>
              </Flex>
            ) : (
              <Text>no user Found..</Text>
            )}
          </CardHeader>

          <Text fontSize={"sm"} mb={2}>
            Categories:{" "}
            {event.categoryIds
              .map(
                (categoryId) =>
                  categories.find(
                    (category) => Number(category.id) === categoryId
                  )?.name
              )
              .join(", ")}
          </Text>
          <Text fontSize={"sm"} mb={2}>
            {event.description}
          </Text>
          <Image
            src={event.image}
            alt={event.title}
            borderRadius={"xl"}
            alignSelf={"center"}
            // maxW={"60vw"}
            // maxH={"40vh"}
            h={"40vh"}
            w="100%"
            p={2}
            m={2}
          />
          <Text fontSize={"sm"} mb={2}>
            Location: {event.location}
          </Text>

          <Divider mt={4} mb={4} />
          <Text fontSize={"sm"} mb={2}>
            Start Time: {event.startTime.slice(0, 10)} at{" "}
            {event.startTime.slice(11, 16)}
          </Text>
          <Text fontSize={"sm"} mb={2}>
            End Time: {event.endTime.slice(0, 10)} at{" "}
            {event.endTime.slice(11, 16)}
          </Text>
        </Card>
      </Center>

      <Modal size={["full", "md"]} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            height={["full", "fit-content"]}
            display={"flex"}
            justifyContent={"center"}
            alignItems={["center", "flex-start"]}
            flexDir={"column"}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Title: </FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={editEvent.title}
                  onChange={handleInputChange}
                  placeholder="Insert title of the event.."
                  required
                  size="md"
                  bgColor="white"
                  w="80%"
                  m={2}
                />
                <FormLabel>Image:</FormLabel>
                <Input
                  type="text"
                  name="image"
                  value={editEvent.image}
                  onChange={handleInputChange}
                  placeholder="Insert user image URL.."
                  size="md"
                  bgColor="white"
                  w="80%"
                  m={2}
                />
                <FormLabel>Location: </FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={editEvent.location}
                  onChange={handleInputChange}
                  placeholder="Insert location.."
                  required
                  size="md"
                  bgColor="white"
                  w="80%"
                  m={2}
                />
                <FormLabel>Description:</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={editEvent.description}
                  onChange={handleInputChange}
                  placeholder="Insert description.."
                  required
                  size="md"
                  bgColor="white"
                  w="80%"
                  m={2}
                />
                <FormLabel>Start Time:</FormLabel>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={editEvent.startTime}
                  onChange={handleInputChange}
                  required
                  size="md"
                  bgColor="white"
                  w="80%"
                  m={2}
                />
                <FormLabel>End Time:</FormLabel>
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={editEvent.endTime}
                  onChange={handleInputChange}
                  required
                  size="md"
                  bgColor="white"
                  w="80%"
                  m={2}
                />
              </FormControl>
              <Button colorScheme="teal" m={10} type="submit">
                Save changes
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              m={10}
              type="submit"
              onClick={handleSubmit}>
              confirm
            </Button>
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
