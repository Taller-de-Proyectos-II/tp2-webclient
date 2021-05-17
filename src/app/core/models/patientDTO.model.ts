import { UserLoginDTO } from './userLoginDTO.model'

export interface PatientDTO {
  idPatient: number;
  names: string;
  lastNames: string;
  phone: string;
  email: string;
  description: string;
  birthday: string;
  userLoginDTO: UserLoginDTO;
  imageURL?: string;
}
