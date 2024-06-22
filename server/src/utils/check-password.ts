import bcrypt from 'bcrypt' 

export  async function checkPassword (passwordEntered : string, passwordStored : string) {
    return await bcrypt.compare(passwordEntered, passwordStored)
}