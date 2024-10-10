import React, { Component } from "react";
import styles from "./style.module.css";
import { EventsTable } from "../EventsTable";
import { StatusFilter } from "../StatusFilter";
import { TitleSearch } from "../TitleSearch";
import { Flex, Image } from "antd";

class EventsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsData: [],
            responseTime: "",
        };
    }

    componentDidMount() {
        this.fetchEventsData();
    }

    fetchEventsData = async () => {
        try {
            const response = await fetch("http://localhost:8000/news");
            const data = await response.json();
            console.log("Data fetched:", data);
            this.setState({ eventsData: data.data });
        } catch (error) {
            console.error("Error fetching events data:", error);
        }
    };

    handleFilter = (key) => {
        const selected = parseInt(key);
        if (selected === 3) {
            return this.fetchEventsData();
        }

        const statusMap = {
            1: "complete",
            2: "inProgress",
        };

        const selectedStatus = statusMap[selected];

        const filteredEvents = this.state.eventsData.filter(({ status }) => status === selectedStatus);
        this.setState({
            eventsData: filteredEvents,
        });
    };

    handleSearch = async (searchText) => {
        try {
            const response = await fetch(`http://localhost:8000/news/search?title=${encodeURIComponent(searchText)}`);
            const data = await response.json();

            console.log("Search results:", data);
            this.setState({
                eventsData: data.data,
                responseTime: `${data.duration}`,
            });
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    render() {
        return (
            <section className={styles.container}>
                <header className={styles.header}>
                    <Image
                        src="https://yt3.ggpht.com/a/AATXAJyOAI2VqmkqTvDepqiroaABTPtYHvdFX7RA9Q=s900-c-k-c0xffffffff-no-rj-mo"
                        alt="Theanh28 Entertainment Logo"
                        width={30}
                        height={30}
                    />
                    <h1 className={styles.title}>Fake News</h1>
                    {/* <StatusFilter filterBy={this.handleFilter} className={styles.action} /> */}
                    <p>
                        Response time: <strong>{this.state.responseTime}</strong>
                    </p>
                    <TitleSearch onSearch={this.handleSearch} className={styles.action} />
                </header>
                <EventsTable eventsData={this.state.eventsData} />
            </section>
        );
    }
}

export { EventsSection };
