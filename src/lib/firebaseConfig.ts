import {
	API_KEY,
	APP_ID,
	AUTH_DOMAIN,
	DATABASE_URL,
	MEASUREMENT_ID,
	MESSAGE_SENDER_ID,
	PASSWORD,
	PROJECT_ID,
	REF_PATH,
	STORAGE_BUCKET,
	USERNAME
} from '$env/static/private';
import { getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, limitToLast, query, ref } from 'firebase/database';

const firebaseConfig: FirebaseOptions = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DATABASE_URL,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGE_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const signIn = signInWithEmailAndPassword(auth, USERNAME, PASSWORD);
export const recentSensorRef = query(ref(db, `/${REF_PATH}`), limitToLast(1));

export declare interface MQ135 {
	acetone: number;
	alcohol: number;
	co: number;
	co2: number;
	nh4: number;
	toluene: number;
}
export declare interface DHT11 {
	temperature: number;
	humidity: number;
}
