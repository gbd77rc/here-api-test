export enum HereMapType {
    Venue = "venue",
    Map = "map"
};

export class MapSetting {
    name: string;
    type: HereMapType;
    mapId: string;
    defaultZoom: number;
    mapKey: string;
    venueKey: string;
};