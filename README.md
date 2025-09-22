# Quiz Master 🧠

Quiz Master is a cross-platform mobile application built with React Native and Expo. It allows users to test their knowledge through various quizzes, manage study notes, and track their progress. The app features a sleek, modern, dark-themed UI with smooth animations.

## ✨ Features

-   **Authentication**: Secure user registration and login using Firebase Authentication.
-   **Interactive Quizzes**: A timed, multiple-choice quiz system with instant feedback.
-   **Scoring & Results**: A detailed results screen showing the score, percentage, and performance message.
-   **Note Management (CRUD)**: Users can create, read, update, and delete their personal study notes.
-   **Navigation**: File-based routing handled by Expo Router.
-   **Styling**: Styled with NativeWind (Tailwind CSS for React Native).
-   **Firebase Integration**: Uses Firebase for authentication and Firestore for storing user notes.

## 🛠️ Tech Stack

-   **Framework**: React Native with Expo
-   **Language**: TypeScript
-   **Backend**: Firebase (Authentication, Firestore)
-   **Navigation**: Expo Router
-   **Styling**: NativeWind / Tailwind CSS
-   **Animation**: React Native Reanimated
-   **Icons**: `react-native-vector-icons`

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (LTS version recommended)
-   npm or yarn
-   Expo Go app on your mobile device or an Android/iOS emulator.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd QuizMaster-Mobile
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    This project uses Firebase for authentication and database services. You'll need to create your own Firebase project.

    -   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    -   Enable **Authentication** (Email/Password provider).
    -   Set up **Firestore Database**.
    -   Get your Firebase project configuration keys.
    -   Update the `firebaseConfig` object in [firebase.ts](firebase.ts) with your own keys.

    ```typescript
    // filepath: firebase.ts
    // ...existing code...
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    // ...existing code...
    ```

### Running the Application

Once the setup is complete, you can run the application using the Expo CLI.

1.  **Start the development server:**
    ```bash
    npx expo start
    ```

2.  **Run on a device or emulator:**
    -   Scan the QR code with the Expo Go app on your iOS or Android device.
    -   Or, press `a` to run on an Android emulator, or `i` to run on an iOS simulator.
