import { IFormValues } from "../components/AddSuburbForm/AddSuburbForm";
import Suburb from "../models/suburb";

const apiHost: string = import.meta.env.VITE_API_HOST ?? 'http://localhost:8080';

export const getAllSuburbs = async (): Promise<Suburb[]> => {
    const response = await fetch(`${apiHost}/suburbs`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${sessionStorage.getItem("credentials")}`
        },
    });
    return await response.json();
};

export const createSuburb = async (data: IFormValues) => {
    const response = await fetch(`${apiHost}/suburbs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${sessionStorage.getItem("credentials")}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Could not create a suburb");
    }
};

export const getSuburbsByPostcode = async (postcode: string): Promise<Array<Suburb>> => {
    const response = await fetch(`${apiHost}/suburbs/by-postcode?` + new URLSearchParams({
        postcode: postcode,
    }), {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${sessionStorage.getItem("credentials")}`
        },
    } );
    return await response.json();
};

export const getSuburbsByName = async (name: string): Promise<Array<Suburb>> => {
    const response = await fetch(`${apiHost}/suburbs/by-name?` + new URLSearchParams({
        name: name,
    }), {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${sessionStorage.getItem("credentials")}`
        },
    });
    return await response.json();
};

export const deleteSuburb = async (id: number) => {
    const response = await fetch(`${apiHost}/suburbs/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${sessionStorage.getItem("credentials")}`
        },
    });

    if (!response.ok) {
        throw new Error("Could not delete this suburb");
    }
};

