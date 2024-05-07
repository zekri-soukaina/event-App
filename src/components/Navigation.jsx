// import { Heading, ListItem, UnorderedList } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export const Navigation = () => {
//   const [eventsList, setEventList] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/events");
//         if (!response.ok) {
//           throw new Error("faild to fetch events:" + response.statusText);
//         }
//         const data = await response.json();
//         setEventList(data);
//       } catch (error) {
//         console.log("Error fetching events", error);
//       }
//     };
//     fetchEvents();
//   }, []);
//   return (
//     <nav>
//       <Heading as={"h5"} m={8}>
//         <Link to="/">All Events</Link>
//       </Heading>
//       <UnorderedList m={10}>
//         {eventsList &&
//           eventsList.map((event) => (
//             <ListItem key={event.id} style={{ cursor: "pointer" }}>
//               <Link to={`/events/${event.id}`}>{event.title} </Link>
//             </ListItem>
//           ))}
//       </UnorderedList>
//       <Heading as={"h5"} m={8}>
//         {" "}
//         <Link to="/event/:eventId">Event 1</Link>
//       </Heading>
//       {/* <ul>
//         <li>
//           <Link to="/">All Events</Link>
//         </li>
//         <li>
//           <Link to="/event/:eventId">Event 1</Link>
//         </li>
//       </ul> */}
//     </nav>
//   );
// };

import { Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [eventsList, setEventList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events: " + response.statusText);
        }
        const data = await response.json();
        setEventList(data);
      } catch (error) {
        console.log("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <nav>
      <Heading as={"h5"} m={8}>
        <Link to="/">All Events</Link>
      </Heading>
      <UnorderedList m={10}>
        {eventsList &&
          eventsList.map((event) => (
            <ListItem key={event.id} style={{ cursor: "pointer" }}>
              <Link to={`/events/${event.id}`}>{event.title}..</Link>
            </ListItem>
          ))}
      </UnorderedList>
    </nav>
  );
};
