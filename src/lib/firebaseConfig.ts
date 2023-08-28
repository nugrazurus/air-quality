import { API_KEY, APP_ID, AUTH_DOMAIN, DATABASE_URL, MEASUREMENT_ID, MESSAGE_SENDER_ID, PASSWORD, PROJECT_ID, STORAGE_BUCKET, USERNAME, REF_PATH } from "$env/static/private";

export const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
  };

export const user = {
  username: USERNAME,
  password: PASSWORD
}

export const refPath = REF_PATH


