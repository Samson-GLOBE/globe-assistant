export interface AccommodationInfo {
  description: string; budget: string;
  platforms: string[]; tips: string[];
}
export interface TransportInfo {
  description: string; options: string[]; tips: string[];
}
export interface SimCardInfo {
  providers: string[]; recommended: string; tips: string[];
}
export interface ResidencePermitInfo {
  required: boolean; name: string; timeline: string;
  documents: string[]; notes: string;
}
export interface MobilityPhase {
  id: string; phase: string; country: string; countryCode: string;
  flag: string; city: string; university: string; universityShort: string;
  duration: string; image: string; color: string;
  accommodation: AccommodationInfo; transport: TransportInfo;
  simCards: SimCardInfo; residencePermit: ResidencePermitInfo;
  healthInsurance: string; banking: string;
  keyContacts: { label: string; email: string }[];
  additionalNotes: string[];
}
export interface VisaCountryRequirement {
  required: boolean; visaFreeEEA?: boolean; visaType: string;
  duration: string; processingTime: string; embassyUrl: string;
  officialInfoUrl: string; requiredDocuments: string[]; notes: string;
}
export interface NationalityVisaData {
  ES: VisaCountryRequirement; GB: VisaCountryRequirement;
  MX: VisaCountryRequirement; PT: VisaCountryRequirement;
}
export interface VisaRequirementsData {
  lastUpdated: string; disclaimer: string;
  nationalities: Record<string, NationalityVisaData>;
}
export type CountryCode = 'ES' | 'GB' | 'MX' | 'PT';
