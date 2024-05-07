---

# Event Management App

This project is an event management application built with React, utilizing Vite, ChakraUI, StyledProps, and React Router for development ease and efficient styling. It features functionalities for browsing, adding, editing, and deleting events, as well as search and filtering capabilities.

## Instructions

### Getting Started

1. Download the [boilerplate template](link) which includes Vite, ChakraUI, StyledProps, and React Router.
2. Download the [JSON file](link) for running the JSON server.
3. Start the JSON server by running `json-server events.json` in the directory containing your JSON file.

### Features

#### Events Page

- Display a list of all events on the `<EventsPage/>`.
- Show event details such as title, description, image, start & end times, and categories.
- Make event items clickable to navigate to separate event pages.
- Add new events via a pop-up/modal or a new screen with a form.
- Connect the add events feature with the back-end for server-side uploads.
- Implement a search function to find specific events.
- Enable filtering of events based on categories.

#### Event Page

- Show event details on the `<EventPage />`.
- Allow editing of event details using a form.
- Update data on the server after saving edits.
- Provide feedback on success or failure, e.g., through toasts.
- Allow event deletion with a confirmation check.
- Send a delete request to the server after confirmation.
- Redirect the user back to the events page after deletion.

## Usage

Clone the repository:

```bash
git clone https://github.com/zekri-soukaina/event-App.git
```

Install dependencies:

```bash
cd your-repository
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Contributing

Contributions are welcome! Fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](link) file for details.

---

Feel free to customize it further to fit your project specifics and add any additional sections you think are necessary!
