export interface Candidate{
    id: string;
    name: string;
    location: string;
    yearsExp: number;
    skills: string[];
    gender?: string;
    education?: string;
}