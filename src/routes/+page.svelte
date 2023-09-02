<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Sensor from '$lib/components/Sensor.svelte';
	import type { DHT11, MQ135 } from '$lib/firebaseConfig';
	import { onMount } from 'svelte';

	export let data;

	let sensor: { mq135: MQ135; dht11: DHT11; timestamp: number } = data.sensor;
	onMount(() => {
		setInterval(() => {
			invalidateAll();
			sensor = data.sensor;
			console.log(sensor);
			console.log(data.user);
		}, 60000);
	});
</script>

<svelte:head>
	<title>Air Quality</title>
	<meta name="description" content="This is an information about air quality in Bintaro" />
</svelte:head>

<div class="container xl:mx-auto px-10 max-w-screen-xl">
	<div class="text-left my-4">
		<h1 class="text-4xl font-semibold">Air quality in Bintaro</h1>
		<p class="text-lg text-gray-500">Air quality index (AQI) air pollution in Bintaro</p>
		<p class="my-2 text-sm text-gray-500 font-semibold">
			<span class="text-gray-800">Last Update at </span>
			{new Date(sensor.timestamp).toLocaleString()}
		</p>
	</div>
	<div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
		<Sensor title="AIR TEMP (℃)" value={sensor.dht11.temperature} icon="mdi:temperature" />
		<Sensor title="HUMIDITY (%RH)" value={sensor.dht11.humidity} icon="mdi:water" />
		<Sensor title="CARBON MONOXIDE (CO)" value={sensor.mq135.co} icon="mdi:molecule-co" />
		<Sensor title="CARBON DIOXIDE (CO2)" value={sensor.mq135.co2} icon="mdi:molecule-co2" />
		<Sensor title="AMMONIUM (NH4)" value={sensor.mq135.nh4} icon="mdi:molecule" />
		<Sensor title="TOLUENE (CH3)" value={sensor.mq135.toluene} icon="mdi:molecule" />
		<Sensor title="ALCOHOL" value={sensor.mq135.alcohol} icon="mdi:water-opacity" />
		<Sensor title="ACETONE" value={sensor.mq135.acetone} icon="mdi:water-opacity" />
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.white);
	}
</style>
