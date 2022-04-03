import { writable } from "svelte/store";

export const messages = writable([]);

export const count = writable(0);
