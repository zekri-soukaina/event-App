import PropTypes from "prop-types";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

export const AddEvent = ({
  createEvent,
  createUser,
  createCategory,
  users,
  categories,
  events,
}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let userIdCounter = users.length + 1;
    let eventIdCounter = events.length + 1;
    let categoryIdCounter = categories.length + 1;

    createEvent({
      id: String(eventIdCounter++),
      title,
      location,
      description,
      startTime,
      endTime,
      categoryIds: [categoryIdCounter],
      createdBy: userIdCounter,
      image,
    });
    createUser({
      id: String(userIdCounter++),
      name: userName,
      image: userImage,
    });
    createCategory({
      id: String(categoryIdCounter++),
      name: category,
    });

    // Empty the form fields
    setTitle("");
    setLocation("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setUserName("");
    setUserImage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Title: </FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Insert user image URL.."
            size="md"
            bgColor="white"
            w="80%"
            m={2}
          />
          <FormLabel>Location: </FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            size="md"
            bgColor="white"
            w="80%"
            m={2}
          />
          <FormLabel>End Time:</FormLabel>
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            size="md"
            bgColor="white"
            w="80%"
            m={2}
          />
          <FormLabel>User Name:</FormLabel>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Insert user name.."
            required
            size="md"
            bgColor="white"
            w="80%"
            m={2}
          />
          <FormLabel>User Image:</FormLabel>
          <Input
            type="text"
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
            placeholder="Insert user image URL.."
            size="md"
            bgColor="white"
            w="80%"
            m={2}
          />
          <FormLabel>Category:</FormLabel>
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Insert category.."
            required
            size="md"
            bgColor="white"
            w="80%"
            m={2}
          />
        </FormControl>
        <Button colorScheme="teal" m={10} type="submit">
          Add Event
        </Button>
      </form>
    </>
  );
};

AddEvent.propTypes = {
  createEvent: PropTypes.object.isRequired,
  createUser: PropTypes.object.isRequired,
  createCategory: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
};
