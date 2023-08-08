export interface AppData {
  Anmeldung: Anmeldung[];
  Registration: Registration[];
  Team: TeamMember[];
  KiwoImages: KiwoImages[];
}

interface Anmeldung {
  status: string;
  contentActive: string;
  contentInactive: string;
  infoActive: string;
  infoInactive: string;
  info: string;
  service: string;
  flyer: string;
  tel: string;
}

interface Registration {
  registration: string;
  days: any;
  labels: any;
  options: any;
}

interface TeamMember {
  img: string;
  name: string;
  position: string;
  text: string;
}

interface KiwoImages {
  img: string;
}
