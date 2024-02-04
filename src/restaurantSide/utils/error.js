export const handleErrorMsg = (errorCode) => {
    if (errorCode === 'auth/invalid-credential') {
        return 'Password is incorrect'
    }
}