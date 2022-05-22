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