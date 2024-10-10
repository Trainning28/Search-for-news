import React from "react";

import { actionService } from "./eventService";
import { StatusTag } from "../StatusTag";
import { Flex, Table, Button } from "antd";

const EventsTable = ({ eventsData }) => {
    const tableColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Summary",
            dataIndex: "summary",
            key: "summary",
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
        },
    ];

    const handleAction = (currentEvent) => {
        actionService(currentEvent);
    };

    const handleAnotherAction = (currentEvent) => {
        actionService(currentEvent);
    };

    return <Table dataSource={eventsData} columns={tableColumns} bordered rowKey="id" />;
};

export { EventsTable };
