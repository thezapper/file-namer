import { writable } from 'svelte/store';

export const repeatedWords = writable<Set<string>>(new Set<string>());
export const delims = writable<string>("-. ");
export const fileNames = writable<string[]>([]);