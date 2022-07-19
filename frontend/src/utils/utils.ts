interface IgetBlobFromFile  {
    name: string
    size: number
    type: string
    previewUrl: string
}

export const getBlobFromFile = (file: File): IgetBlobFromFile => {
    const { name, size, type } = file;
    const fileToBlob = new Blob([file]);

    return {
        name,
        size: size/1000,
        type,
        previewUrl: URL.createObjectURL(fileToBlob),
    }
}

export const transformToMilliseconds = (time: any): number => {
    const hours = parseInt(time.seconds) * 3600000;
    const minutes = parseInt(time.minutes) * 60000;
    const seconds = parseInt(time.seconds) * 1000;

    return hours + minutes + seconds;
}