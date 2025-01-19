# TravelTrucks Rental Web App

This project represents the frontend component of a web application for TravelTrucks, a camper rental company. The application features a main landing page, a catalog showcasing available campers, and individual camper pages that allow users to explore detailed information, read reviews, and make reservations.

### Technologies Used

Vite — For fast project setup and development.

React — For building user interfaces.

Redux — For state management.

React Router — For routing between pages.

Axios — For handling HTTP requests.

CSS Modules — For styling components.

### The web application consists of three pages:

- HomePage: contains a banner, navigation, and a "View Now" button that redirects to the CatalogPage.
- CatalogPage: a page displaying all available vehicles with filtering options based on specific criteria (location, type of transport, availability of additional equipment such as an air conditioner or kitchen) and the ability to add a camper to favorites.
- CamperPage: a detailed camper page featuring a comprehensive description of the selected camper, a photo gallery, user reviews, and a booking form.

### Installation and Setup

1. Clone the repository:

```
git clone https://github.com/your-repository/traveltrucks.git
cd traveltrucks
```

2. Install dependencies:

```
npm install
```

3.Start the development server:

```
npm run dev
```

4. Build the project for production:

```
npm run build
```

5. Deploy the project (e.g., on Vercel or Netlify).

   The project is deployed and live at: [https://react-test-urtr.vercel.app/]
