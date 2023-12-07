export const fetchTrainings = (setTrainings) => {
    return fetch(import.meta.env.VITE_API_URL + '/gettrainings')
    .then(response => {
        if(!response.ok) 
            throw new Error("Something went wrong: " + response.statusText)

        return response.json();
     })
     .then(data => setTrainings(data.content))
     .catch(err => console.error(err))
}

