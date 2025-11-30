export interface ISOSEvent {
  id: string;
  name: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface SOSLocation {
  latitude: number;
  longitude: number;
  address?: string;
}
