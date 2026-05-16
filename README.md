# Apka Interior Wala

Apka Interior Wala is a professional interior design and construction agency website. This application features a full-stack architecture with a React frontend (Vite), an Express backend, and Firebase integration for data management and authentication.

## 🚀 Getting Started Locally

Follow these steps to set up and run the project on your local machine.

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18.x or higher is recommended.
- **npm**: (Included with Node.js) or **yarn** / **pnpm**.

### 🛠️ Installation

1. **Clone the Repository**:
   ```bash
   git clone <your-repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add your secret keys. You can use `.env.example` as a template:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and provide your `GEMINI_API_KEY`:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key"
   ```

4. **Firebase Configuration**:
   The app requires a `firebase-applet-config.json` file in the root directory. If you don't have this file:
   1. Go to your [Firebase Console](https://console.firebase.google.com/).
   2. Select your project and go to **Project Settings**.
   3. Under **Your apps**, find your Web App configuration.
   4. Copy the `firebaseConfig` object into a new file named `firebase-applet-config.json` in the root of the project.
   
   Ensure the format matches:
   ```json
   {
     "apiKey": "...",
     "authDomain": "...",
     "projectId": "...",
     "storageBucket": "...",
     "messagingSenderId": "...",
     "appId": "...",
     "firestoreDatabaseId": "(default)"
   }
   ```

### 💻 Running the Application

To start the development server:
```bash
npm run dev
```

The application will be accessible at:
- **Local machine**: [http://localhost:3000](http://localhost:3000)
- **Local network**: [http://<your-machine-private-ip>:3000](http://localhost:3000) (e.g., `http://192.168.1.5:3000`)

### 🔑 Local Environment Variables
Make sure to set the following in your `.env` file:
- `GEMINI_API_KEY`: Required for AI-powered features.
- `APP_URL`: Set this to `http://localhost:3000` for local development.

### 🏗️ Building for Production

To create an optimized production build:
```bash
npm run build
```
This will generate a `dist` folder with the static assets.

## 📁 Project Structure

- `src/`: Contains the React frontend code.
  - `components/`: Reusable UI components.
  - `pages/`: Page-level components (Home, About, Admin, etc.).
- `server.ts`: The Express server entry point that serves the frontend and handles API requests.
- `firestore.rules`: Security rules for your Firebase database.
- `firebase-blueprint.json`: Data schema for the Firestore database.

## 🛡️ Security & Roles

The application includes an Admin dashboard accessible via `/admin`. Authentication is handled via Firebase Auth. Security rules are defined in `firestore.rules` and should be deployed to your Firebase console to protect your data.

---

**Founder**: Zainab Khan  
**Location**: Bhopal, India
