import { SymptomDTO } from "./symptomDTO.model";

export interface ManifestationDTO {
    idManifestation: number;
    name: string;
    description: string;
    symptoms: SymptomDTO[];
}