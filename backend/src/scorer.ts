import {Candidate} from "./types";

const WEIGHTS = {
    yearsExp: 0.4,
    skillMatch: 0.4,
    diversityBonus: 0.2
};

const REQUIRED_SKILLS = ['react', 'node', 'typescript'];

export function score(c:Candidate, cohort: Candidate[]): number {
    const exp =     Math.min(c.yearsExp/10, 1);
    const skillMatch = c.skills.filter((s)=> REQUIRED_SKILLS.includes(s.toLowerCase())).length/REQUIRED_SKILLS.length;
    const sameGender = cohort.filter((x)=>x.gender==c.gender).length;
    const diversityBonus = 1/(1+sameGender);

    return(
        exp* WEIGHTS.yearsExp+skillMatch*WEIGHTS.skillMatch+diversityBonus*WEIGHTS.diversityBonus
    );
}

export function pickFive(all: Candidate[]) : Candidate[] {
    const withScores = all.map((c)=>({c, s : score(c, all)}));
    return withScores
        .sort((a, b) => b.s - a.s)
        .slice(0, 5)
        .map((x)=>x.c)
}