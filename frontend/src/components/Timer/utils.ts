interface ITime {
    seconds: string;
    minutes: string;
    hours: string;
}

export const countTimer = (time: ITime): ITime => {
    const newTime = {...time};
    newTime.seconds = (parseInt(time.seconds) + 1) < 10 ? `0${(parseInt(time.seconds) + 1)}` : (parseInt(time.seconds) + 1).toString();

    if(parseInt(time.seconds) >= 59) {
      newTime.seconds = '00';
      newTime.minutes = (parseInt(time.minutes) + 1) < 10 ? `0${(parseInt(time.minutes) + 1)}` : (parseInt(time.minutes) + 1).toString();
    }

    if(parseInt(time.minutes) >= 59) {
      newTime.minutes = '00';
      newTime.hours = (parseInt(time.hours) + 1) < 10 ? `0${(parseInt(time.hours) + 1)}` : (parseInt(time.hours) + 1).toString();
    }
    
    return newTime;
};