export default async function getCurrentUser(token) {
    const conn = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await conn.json()

    return data
}