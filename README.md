# ![BookNook Logo](https://github.com/PhucMaii/BookNook/blob/main/public/customerLogo.png) 

[**Visit the website.**](https://book-nook-three.vercel.app/)<br>

## Contributer

Bin Mai [Github Link](https://github.com/PhucMaii) | [LinkedIn Link](https://linkedin.com/in/binmai0102)<br>
Chuanche Liu [Github Link](https://github.com/FR33MAN9808) | [LinkedIn Link](www.linkedin.com/in/chuancheliu)<br>
Inigo [Github Link]() | [LinkedIn Link]()<br>
Leoval [Github Link]() | [LinkedIn Link]()<br>

## Description

BookNook is a booking restaurant reservation application developed with two sides: restaurant side and user side. Users are people who will book a reservation based on their requirements about date, time, capacity, types of restaurants, etc. Restaurant side will receive reservations from customers and prepare tables for them at the booked time. 

## Key Features
<ul>
    <li>Fetch nearby restaurants for customer by calculating the longtitude and langtitude of all the restaurants' addresses compare to user's address
    </li>
    <li>Utilize search function with give users lots of options to select and search based on what they need.</li>
    <li>
Users have the capability to edit their booking details while ensuring that all available restaurant time slots are checked for availability.</li>
<li>Users are able to leave a review of their dining experience for a restaurant</li>
</ul>

## Installation

1. **Clone the repo:**
```bash
git clone https://github.com/PhucMaii/dmg-blockchain-test.git
```

2. **Install Dependencies**
```bash
npm i
# or
npm install
```

## Run Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

All restaurant side pages and components are come from `/src/restaurantSide`.

All customer side pages and components are come from `/src/customerSide`.

## Set up env file
1. **Set up firebase**
You need to set up a firebase in order to store data. Here are env keys are related to firebase:
```
`VITE_FIREBASE_API_KEY;
VITE_FIREBASE_AUTH_DOMAIN;
VITE_FIREBASE_PROJECT_ID;
VITE_FIREBASE_STORAGE_BUCKET;
VITE_FIREBASE_MESSAGE_ID;
VITE_FIREBASE_APP_ID;
VITE_FIREBASE_MESUREMENT_ID`

3. **Set up Google Maps API**
You need to create an account for Google Maps Platform to get the API Key. Here is the key in env file for it:
`VITE_MAPS_KEY`

## Tech Stacks
Programming Language: `Javascript`

Frameworks: `React.js and Vite`

Database: `Firebase`
