import './config';
import 'firebase/auth'
import * as firebase from 'firebase'

const auth = firebase.auth()

export const getCurrentUser = () => {
    return auth.currentUser.email
}

export const signUp = identifiants => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(identifiants.email, identifiants.psw)
            .then(() => {
                resolve(true)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const signIn = identifiants => {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(identifiants.email, identifiants.psw)
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const signOut = () => {
        auth.signOut()
            .then(() => {
                console.log('SignOut successfully')
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
}

export const authenticateUser = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user)
                resolve(user)
            } else {
                reject('No user signed in')
            }
        })
    })
}

export const sendEmailVerification = () => {
    const user = auth.currentUser
    user.sendEmailVerification().then(() => {
        console.log('Email successfully send')
    }).catch(err => {
        console.log(err)
    })
}

export const resetPassword = email => {
    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email).then(() => {
            resolve(true)
            console.log(`Email successfully send to ${email}`)
        }).catch(err => {
            reject(err)
        })
    })
}