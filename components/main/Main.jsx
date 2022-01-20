import { Box, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from "@chakra-ui/react";
import Router from "next/router";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import AllPosts from "./AllPosts";

const Main = props => {
  const getDefaultIndex = () => {
    if (Router.query.category == undefined) return 0;
    if (Router.query.category == "technology") return 1;
    if (Router.query.category == "exp") return 2;
    if (Router.query.category == "other") return 3;
  };
  const tabChangeQueryHandler = nameQuery => {
    if (nameQuery != "all") {
      Router.replace({ query: { category: nameQuery } });
    } else {
      Router.replace(Router.pathname);
    }
  };
  return (
    <Flex mt={"24"}>
      <Box width={{ base: "98%", lg: "80%" }} mx={"auto"}>
        <Tabs isFitted variant="enclosed" colorScheme="cyan" ml={"10"} defaultIndex={getDefaultIndex}>
          <TabList>
            <Tab
              fontSize={"2xl"}
              _selected={{ color: "white", bg: "cyan.500" }}
              onClick={() => {
                tabChangeQueryHandler("all");
              }}
            >
              Tất cả
            </Tab>
            <Tab
              fontSize={"2xl"}
              _selected={{ color: "white", bg: "cyan.500" }}
              onClick={() => {
                tabChangeQueryHandler("technology");
              }}
            >
              Công nghệ
            </Tab>
            <Tab
              fontSize={"2xl"}
              _selected={{ color: "white", bg: "cyan.500" }}
              onClick={() => {
                tabChangeQueryHandler("exp");
              }}
            >
              Kinh nghiệm việc làm
            </Tab>
            <Tab
              fontSize={"2xl"}
              _selected={{ color: "white", bg: "cyan.500" }}
              onClick={() => {
                tabChangeQueryHandler("other");
              }}
            >
              Khác
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AllPosts blogs={props.blogs} />
            </TabPanel>
            <TabPanel>
              <AllPosts blogs={props.blogs} />
            </TabPanel>
            <TabPanel>
              <AllPosts blogs={props.blogs} />
            </TabPanel>
            <TabPanel>
              <AllPosts blogs={props.blogs} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Main;
