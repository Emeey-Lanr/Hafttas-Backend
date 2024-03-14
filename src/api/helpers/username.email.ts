export const usernameOrEmail = async (data: string) => {
    // every email comes with an @
    // we check if the data contains it 
    // when splited it turn to an array with the length of 2
    // if not the array length will be 1 when can then use that to determine if it's a username or an email
    const array = data.split('@')   
    let type = ''
    if (array.length > 1) {
        type = 'email'
    } else {
        type = 'username'
    }
    return type
     
}