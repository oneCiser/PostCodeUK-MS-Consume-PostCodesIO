

export const transformData = (data: any) => {
    const {postcode, lat, lon, ...rest} = data;
    return {
        postcode,
        latitude: lat,
        longitude: lon,
        data: rest
    }
}