import { Driver } from "./driver.model";
import { User } from "./user.model";

export interface DriverRequest {
    driverRequestId?:number,
    userId:number,
    driverId?:number;
    requestDate:Date,
    status:string,
    tripDate:Date,
    timeSlot:string,
    pickupLocation:string,
    dropLocation:string,
    estimatedDuration:string,
    paymentAmount?:number,
    comments?:string,
    actualDropTime?:Date,
    actualDuration?:string,
    actualDropDate?:Date,

    driver?:Driver,
    user?:User
    
}