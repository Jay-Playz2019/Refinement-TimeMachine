const BASE_URL = '/data/data.json'

export async function loadData() {
    const res = await fetch(BASE_URL)

    if(!res.ok) throw new Error("Failed to fetch data")

    return res.json()
}

export async function getYear(year){
    const data = await loadData()
    const yearData = data[year]

    if (!yearData) {
        throw new Error(`No data for year ${year}`)
    }

    return {year: Number(year), ...yearData}
}