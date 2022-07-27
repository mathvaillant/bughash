import { ITime } from "../components/Timer/utils";

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

export const transformToMilliseconds = (time: ITime): number => {
    const hours = parseInt(time.hours) * 3600000;
    const minutes = parseInt(time.minutes) * 60000;
    const seconds = parseInt(time.seconds) * 1000;

    return hours + minutes + seconds;
}

export const transformToFullTime = (ms: number): ITime => {
    const seconds = (ms / 1000) % 60;
    const minutes = (ms / (1000*60)) % 60;
    const hours = (ms / (1000*60*60)) % 24;

    return {
        seconds: Number(seconds.toFixed(0)) < 10 ? `0${seconds.toFixed(0)}` : seconds.toFixed(0).toString(),
        minutes: Number(minutes.toFixed(0)) < 10 ? `0${minutes.toFixed(0)}` : minutes.toFixed(0).toString(),
        hours: Number(hours.toFixed(0)) < 10 ? `0${hours.toFixed(0)}` : hours.toFixed(0).toString(),
    };
}