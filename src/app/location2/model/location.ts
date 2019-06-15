import { Address } from "./address";
import { Coordinates } from "./coordinates";

export interface Location {
name: string;
normalizedName : string;
coordinates : Coordinates;
address : Address;
resourceId? : string;
version? : string;
function : string;
}