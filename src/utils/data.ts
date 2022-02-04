

export const transformData = (data: any) => {
    const {postcode, latitude, longitude, ...rest} = data;
    delete rest.distance;
    delete rest.quality;
    return {
        postcode,
        latitude: latitude,
        longitude: longitude,
        data: rest
    }
}