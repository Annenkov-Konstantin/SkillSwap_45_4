import { RequestStatus } from "./constants";

export type TRequestStatus = typeof RequestStatus[keyof typeof RequestStatus];
