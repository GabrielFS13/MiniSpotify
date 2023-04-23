export default async function getSpotifyData(token, apiUrl){
    const conn = await fetch(apiUrl, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    
    const data = conn.json()

    return data
}