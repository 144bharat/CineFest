import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
} from "firebase/ai";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTaEbW2HpCO3wSfU6yg4fmLMDLYA_l_cE",
  authDomain: "cine-fest.firebaseapp.com",
  projectId: "cine-fest",
  storageBucket: "cine-fest.firebasestorage.app",
  messagingSenderId: "782977447932",
  appId: "1:782977447932:web:f621fbba1b18bed8b92479",
  measurementId: "G-0GXN3EM20H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// App Check

// App Check
initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LchFMItAAAAAJOZj5fvrWAmsyEy-wDGvRabI2c8"
  ),
  isTokenAutoRefreshEnabled: true,
});

const ai = getAI(app, {
  backend: new GoogleAIBackend(),
});

export const geminiModel = getGenerativeModel(ai, {
  model: "gemini-3.8-flash",
});

const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;