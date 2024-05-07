import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <>
      <Grid
        h="100vh"
        w="100vw"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        m={0}>
        <GridItem rowSpan={2} colSpan={1} bg="orange.400" p={5}>
          {" "}
          <Navigation />
        </GridItem>
        <GridItem colSpan={4} bg="orange.400" p={5} h="15vh">
          <Heading> Event App</Heading>{" "}
        </GridItem>
        <GridItem colSpan={4} bg="papayawhip">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};
