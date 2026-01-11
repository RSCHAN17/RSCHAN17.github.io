import fs from 'fs'

import path from 'path'

import dotenv from 'dotenv'

dotenv.config()
const DATA_DIR = path.join(import.meta.dirname, 'data')

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR)
}

const CLICHE_FILE = path.join(DATA_DIR, 'cliches.json')
const GIG_FILE = path.join(DATA_DIR, 'gigs.json')
const FESTIVALS_FILE = path.join(DATA_DIR, 'festivals.json')
const YEARS_FILE = path.join(DATA_DIR, 'years.json')

export async function fetchCliches() {
    const apiKey = process.env.CLICHES_API_KEY
    const url = `https://rschan17-github-io.onrender.com/cliches/all`
    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        const nowUTC = new Date().toISOString()
        data._last_updated_utc = nowUTC
        data.push(nowUTC)
        fs.writeFileSync(CLICHE_FILE, JSON.stringify(data, null, 2))
        console.log(`Cliches updated at ${nowUTC}`)
    } catch (err) {
        console.log(`Error fetching cliches: ${err}`);
    }
}

export async function fetchGigs() {
    const apiKey = process.env.CLICHES_API_KEY
    const url = `https://rschan17-github-io.onrender.com/gigs/all`
    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        const nowUTC = new Date().toISOString()
        data._last_updated_utc = nowUTC
        fs.writeFileSync(GIG_FILE, JSON.stringify(data, null, 2))
        console.log(`Gigs updated at ${nowUTC}`)
    } catch (err) {
        console.log(`Error fetching gigs: ${err}`);
    }
}

export async function fetchFestivals() {
    const apiKey = process.env.CLICHES_API_KEY
    const url = `https://rschan17-github-io.onrender.com/gigs/festivals`
    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        const nowUTC = new Date().toISOString()
        data._last_updated_utc = nowUTC
        fs.writeFileSync(FESTIVALS_FILE, JSON.stringify(data, null, 2))
        console.log(`Festivals updated at ${nowUTC}`)
    } catch (err) {
        console.log(`Error fetching festivals: ${err}`);
    }
}

export async function fetchYears() {
    const apiKey = process.env.CLICHES_API_KEY
    const url = `https://rschan17-github-io.onrender.com/gigs/years`
    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        const nowUTC = new Date().toISOString()
        data._last_updated_utc = nowUTC
        fs.writeFileSync(YEARS_FILE, JSON.stringify(data, null, 2))
        console.log(`Years updated at ${nowUTC}`)
    } catch (err) {
        console.log(`Error fetching years: ${err}`);
    }
}



if (import.meta.url === `file://${[process.argv[1]]}`) {
    fetchCliches()
    fetchFestivals()
    fetchGigs()
    fetchYears()
}

fetchCliches()
fetchFestivals()
fetchGigs()
fetchYears()