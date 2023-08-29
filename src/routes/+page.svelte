<script>
    import { getDatabase, limitToLast, onValue, query, ref } from "firebase/database";
    import { onMount } from "svelte";
    import Sensor from "../components/Sensor.svelte";
	import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
	import { getApps, initializeApp } from "firebase/app";

    export let data;
    
    const mq135 = {
        acetone: 0.0,
        alcohol: 0.0,
        co: 0.0,
        co2: 0.0,
        nh4: 0.0,
        toluene: 0.0
    }

    const dht11 = {
        temperature: 0.0,
        humidity: 0.0
    }

    let timestamp = new Date();
    let fetched = false;

    const app = getApps().length ? getApps()[0] : initializeApp(data.firebaseConfig)

    const db = getDatabase(app)
    const auth = getAuth(app)

    onMount(() => {
        const recentSensorRef = query(ref(db, `/${data.refPath}`), limitToLast(1))
        
        signInWithEmailAndPassword(auth, data.userCred.username, data.userCred.password).then((cred) => {
            onValue(recentSensorRef, (snap) => {
                snap.forEach((row) => {
                    console.log(row.val())
                    
                    const dhtVal = row.val()["dht11"]
                    const mqVal = row.val()["mq135"]

                    timestamp = new Date(parseInt(row.key))
                    fetched = true;
                    
                    // assign dht value
                    dht11.temperature = dhtVal["temperature"]
                    dht11.humidity = dhtVal["humidity"]

                    // assign mq135 value
                    mq135.acetone = mqVal["acetone"]
                    mq135.alcohol = mqVal["alcohol"]
                    mq135.co = mqVal["co"]
                    mq135.co2 = mqVal["co2"]
                    mq135.nh4 = mqVal["nh4"]
                    mq135.toluene = mqVal["toluene"]
                })
            },
            (err) => {
                console.error(err)
            })
        })
        .catch((err) => {
            console.error(err)
        })
    })
</script>

<svelte:head>
    <title>Air Quality</title>
    <meta name="description" content="This is an information about air quality in Bintaro">
</svelte:head>

<div class="container xl:mx-auto px-10 max-w-screen-xl">
    <div class="text-left my-4">
        <h1 class="text-4xl font-semibold">Air quality in Bintaro</h1>
        <p class="text-lg text-gray-500">Air quality index (AQI) air pollution in Bintaro</p>
        <p class="my-2 text-sm text-gray-500 font-semibold"><span class="text-gray-800">Last Update at </span>{#if fetched} {timestamp.toLocaleString()} {/if}</p>
    </div>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
       <Sensor title="AIR TEMP (℃)" value={dht11.temperature} icon="mdi:temperature" />
       <Sensor title="HUMIDITY (%RH)" value={dht11.humidity} icon="mdi:water" />
       <Sensor title="CARBON MONOXIDE (CO)" value={mq135.co} icon="mdi:molecule-co" />
       <Sensor title="AMMONIUM (NH4)" value={mq135.nh4} icon="mdi:molecule" />
       <Sensor title="TOLUENE (CH3)" value={mq135.toluene} icon="mdi:molecule" />
       <Sensor title="ALCOHOL" value={mq135.alcohol} icon="mdi:water-opacity" />
       <Sensor title="ACETONE" value={mq135.acetone} icon="mdi:water-opacity" />
    </div>
</div>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.white);
    }
  </style>