import { Document } from 'mongoose';

interface StopRoute extends Document {
    number: string;
    headsign: string;
    direction: number;
    route: string;                              // ref
    stop: string;                               // ref
    stopTimes: string[];                        // ref
}

export { StopRoute };