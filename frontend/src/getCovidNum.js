//import covidJson from "./data/covids.json";

export const getCovidNum = (preName, covidNum) => {
    const covids = covidNum.itemList;
    console.log(covidNum);
    const filtered = covids.filter(covid => covid.name_jp == preName);
    console.log(filtered);
    return filtered[0].npatients;
}