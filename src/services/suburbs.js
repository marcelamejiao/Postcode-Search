const apiHost = import.meta.env.VITE_API_HOST ?? 'http://localhost:8080';

export const getAllSuburbs = async () => {
    const response = await fetch(`${apiHost}/suburbs`);
    return await response.json();
};

export const createSuburb = async (data) => {
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

export const getSuburbsByPostcode = async (postcode) => {
    const response = await fetch(`${apiHost}/suburbs/postcode?` + new URLSearchParams({
        postcode: postcode,
    }));
    return await response.json();
};

export const getSuburbsByName = async (name) => {
    const response = await fetch(`${apiHost}/suburbs/name?` + new URLSearchParams({
        name: name,
    }));
    return await response.json();
};
