export const fetchCustomers = (setCustomers) => {
    return fetch(import.meta.env.VITE_API_URL + '/api/customers')
    .then(response => {
        if(!response.ok) 
            throw new Error("Something went wrong: " + response.statusText)

        return response.json();
     })
     .then(data => setCustomers(data.content))
     .catch(err => console.error(err))


     
}