import { recentSensorRef, signIn, type MQ135, type DHT11 } from '$lib/firebaseConfig';
import { get } from 'firebase/database';

export async function load() {
	const user = (await signIn).user.toJSON();

	return {
		user: user,
		sensor: await get(recentSensorRef)
			.then((snap) => {
				let data: {
					mq135: MQ135;
					dht11: DHT11;
					timestamp: number;
				} = {
					dht11: {
						temperature: 0,
						humidity: 0
					},
					mq135: {
						acetone: 0,
						alcohol: 0,
						co: 0,
						co2: 0,
						nh4: 0,
						toluene: 0
					},
					timestamp: 0
				};
				snap.forEach((row) => {
					data = row.val();
				});
				return data;
			})
			.catch(() => ({
				dht11: {
					temperature: 0,
					humidity: 0
				},
				mq135: {
					acetone: 0,
					alcohol: 0,
					co: 0,
					co2: 0,
					nh4: 0,
					toluene: 0
				},
				timestamp: 0
			}))
	};
}
