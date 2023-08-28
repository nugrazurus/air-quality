import {  firebaseConfig, refPath, user } from "$lib/firebaseConfig";

export function load() {
    return {
        firebaseConfig: firebaseConfig,
        userCred: user,
        refPath: refPath
    }    
}