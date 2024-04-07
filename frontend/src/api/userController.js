import layer8 from "layer8_interceptor";

export const fetchUsers = async () => {
    try {
        const res = await layer8.fetch("http://localhost:3004/api/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        return res
    } catch (e) {
        console.error(e)
    }

}

export const postUserData = async (timeZone) => await layer8.fetch('http://localhost:3004/api/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        location: timeZone
    })
})

export const removeUserData = async () => await layer8.fetch("http://localhost:3004/api/user", {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: "95.65.60.159"
    })
})

