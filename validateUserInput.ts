function validateUserInput(name: string, platform: string, releaseYear: number, genre: string, esrb: string, isGood: boolean, videogames: Videogame[], filteredWords: string[]) {
    console.log("Bad Words:", filteredWords)

    let currentYear = new Date().getFullYear();
    if (name.length > 20) {
        throw Error(`Name is too long, maximum length: 20, got: ${name.length}`)
    }
    if (name.length === 0) {
        throw Error(`No name was inputted. Input a name.`)
    }
    if (videogames.find(v => v.name === name)) {
        throw Error(`Title already exists in database.`)
    }
    filteredWords.forEach(element => { 
       if (name.includes(element)) {
        throw Error('Title is not allowed. Select a different title')
       }
        
    });
    if (platform === "") {
        throw Error(`No platform selected. Select a platform or select 'Other' if platform is unavailable`)
    }
    if (releaseYear < 1958 || releaseYear > currentYear) {
        throw Error(`Year must be between 1958 and ${currentYear}`)
    }
    if (genre === "")
        throw Error(`No genre selected. Select a genre or select 'Other' if genre is unavailable`)
    if (esrb === "") {
        throw Error(`No ESRB rating selected. Please select a rating`)
    }
}

export default validateUserInput