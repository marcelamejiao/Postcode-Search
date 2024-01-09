import { IFormValues } from "../components/AddSuburbForm/AddSuburbForm";
import Suburb from "../models/suburb";

const apiHost: string = import.meta.env.VITE_API_HOST ?? 'http://localhost:8080';

export const getAllSuburbs = async (): Promise<Suburb[]> => {
    const response = await fetch(`${apiHost}/suburbs`);
    return await response.json();
};

export const createSuburb = async (data: IFormValues) => {
    const response = await fetch(`${apiHost}/suburbs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Could not create a suburb");
    }
};

export const getSuburbsByPostcode = async (postcode: string): Promise<Array<Suburb>> => {
    const response = await fetch(`${apiHost}/suburbs/postcode?` + new URLSearchParams({
        postcode: postcode,
    }));
    return await response.json();
};

export const getSuburbsByName = async (name: string): Promise<Array<Suburb>> => {
    const response = await fetch(`${apiHost}/suburbs/name?` + new URLSearchParams({
        name: name,
    }));
    return await response.json();
};
