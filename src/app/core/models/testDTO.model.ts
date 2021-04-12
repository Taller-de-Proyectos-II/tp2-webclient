import { ManifestationDTO } from "./manifestationDTO.model";
import { SymptomDTO } from "./symptomDTO.model";

export interface TestDTO {
    idTest: number;
    startDate: string;
    endDate: string;
    finished: boolean;
    symptoms: SymptomDTO[];
    physicalManifestation: ManifestationDTO;
    emotionalManifestation: ManifestationDTO;
    conductualManifestation: ManifestationDTO;
    cognitiveManifestation: ManifestationDTO;
}