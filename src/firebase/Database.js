import './config';
import 'firebase/firestore'
import * as firebase from 'firebase'
import { getCurrentUser } from './Auth';

const collections = {
    favorites: "favorites"
}

const db = firebase.firestore()

//write & remove

export const write = item => {
    item.isFavorite = true
    const doc = {
        user: getCurrentUser(),
        item: item
    }

    db.collection(collections.favorites).doc(item.imdb).set(doc)
        .then(() => {
        console.log("Document successfully written!");
        })
        .catch(error => {
        console.error("Error writing document: ", error);
        });
}

export const remove = item => {
    db.collection(collections.favorites).doc(item.imdb).delete()
        .then(() => {
            console.log("Le doc a été retiré avec succès")
        })
        .catch(error => {
            console.error("Erreur à la suppression du document", error);
        })
}

//read

export const read = () => {
    return new Promise((resolve, reject) => {
        db.collection(collections.favorites)
            .get()
            .then(querySnapshot => {
                resolve(querySnapshot)
            })
            .catch(err => reject(err))
    })
}       