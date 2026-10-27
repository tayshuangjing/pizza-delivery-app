# 🍕 Pitza — Pizza Ordering App

**A mobile-first pizza ordering experience, from browsing the menu to choosing pickup or delivery.**

Pitza is a React Native and Expo app prototype for a neighborhood pizza shop. It brings the core ordering journey into one place: discover promotions, explore food by category, view item details, manage a cart, and choose how to get your order.

> **Project status:** This is a portfolio prototype, not a production ordering service. It does not process payments or submit orders to a restaurant. Map screens use demo locations, and delivery-place autocomplete needs a valid Google Places API key.

## 🎥 Demo video

**[▶ Watch the Pitza demo]**

**Push Notification**
https://github.com/user-attachments/assets/4adbc23d-eb2d-488b-8c12-c16297c135c2

**Track Order Status**
https://github.com/user-attachments/assets/e67c8b72-8d9c-47df-bd79-fc259a36c4d6

**Track Driver's Location**
https://github.com/user-attachments/assets/9e8940e9-39cf-4964-90cc-d838d3fe2119

## ✨ The experience

- **Discover:** Browse featured promotions and new menu items.
- **Explore the menu:** Switch between pizza, sides, desserts, and drinks.
- **View item details:** See product descriptions and a preference-customization interface.
- **Keep track of an order:** A shared cart context tracks items and calculates quantities and totals.
- **Choose fulfillment:** Open delivery location search or browse pickup locations on a map.
- **Create an account:** Register and sign in with Firebase Authentication; profile details are stored in Firestore.

The interface uses custom food imagery, branded colors, and typography to give the ordering flow a warm, playful feel.

## 🧰 Built with

- React Native 0.68
- Expo SDK 45
- React Navigation (native stack and bottom tabs)
- Firebase Authentication and Firestore
- React Native Maps and Google Places Autocomplete

## 🚀 Run it locally

### Requirements

- Node.js and npm
- Expo Go on a compatible device, or an Android/iOS development environment

### Start the app

```bash
npm install
npm start
```

Then scan the QR code with Expo Go, or use the Expo CLI to launch an available platform:

```bash
npm run android
npm run ios
npm run web
```

### Configure external services

- **Firebase:** Set up an authorized Firebase project with Authentication and Firestore enabled, then configure the app with that project's credentials.
- **Delivery search:** Replace the Google Places placeholder in `screens/DeliveryScreen.js` with a valid API key and enable the required Places API.
- **Maps:** Configure platform-specific Google Maps credentials if required by your development environment.

Do not commit private credentials or production API keys to a public repository.

## 🧑‍💻 Project story

I built Pitza as a mobile ordering prototype to explore how a restaurant's menu and fulfillment choices could translate into a simple app experience. My work includes the React Native screens and navigation, category-based menu browsing, cart state and totals, delivery and pickup map interfaces, and Firebase sign-up/sign-in and profile integration.

**Team and usage:** Solo project

## 📌 Scope notes

Pitza demonstrates the app flow and interface; it is not connected to a restaurant's inventory, payment provider, or order-management system. The pickup locations are sample map data, and the delivery screen's Places integration needs an API key before address search can work.
