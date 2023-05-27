import { createContext, useEffect, useState } from "react";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { collection, addDoc, doc, setDoc, getFirestore, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebaseApp from "../services/firebase";

// const UserContext = createContext({})

interface Data {
    couldLogin: any
    signIn: any
    signOut: any
    user: any
    loading: any
    signUp: any
    xp: any
    getXP: any
    updateXp: any
    decreaseXp: any
}

const UserContext = createContext<Data>({} as Data);

const UserProvider = ({children}) => {

    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    const [couldLogin, setCouldLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [userUid, setUserUid] = useState<any>();
    const [loading, setLoading] = useState(true)
    const [xp, setXp] = useState<number>();

    useEffect(() => {
        return onAuthStateChanged(auth, listenAuth)
    }, [])

    const listenAuth = (userState: any) => {
        console.log('listenAuth', userState)
        setUser(auth.currentUser)
        setLoading(false)
    }

    const signIn = (email: string, password: string) => {
        console.log('xxx', email, password)
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            setUserUid(userCredential.user.uid);
            await getXP();
        }).catch((error) => {
            console.log('error', error)
            setLoading(false)
        })

    }

    const signOut = () => {
        setLoading(true)

        signOutFirebase(auth)
            .then(() => {
                console.log("deslogado com sucesso")
            }).catch((error) => {
                console.log('error', error)
                setLoading(false)
            })
    }

    const signUp = (email: string, password: string) => {
        console.log('xxx', email, password);
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password).then( async (userCredential) => {
            setUserUid(userCredential.user.uid);
            const ref = doc(db, "UserInformation", userCredential.user.uid);
            await setDoc(ref, { xp: 0 })
            await getXP();
            setLoading(false);
            }).catch((error) => {
                console.log('error', error)
                setLoading(false)
            })

    }

    const getXP = async () => {
        setLoading(true);
        const ref = doc(db, "UserInformation", userUid);
        const a = await getDoc(ref);
        setXp(a.data().xp);
        setLoading(false);
    }

    const updateXp =  async() => {
        setLoading(true);
        const ref = doc(db, "UserInformation", userUid);
        let newValue = xp + 5;
        setXp(newValue);
        await deleteDoc(doc(db, "UserInformation", userUid));
        await setDoc(ref, { xp: newValue });
        setLoading(false);
    }

    const decreaseXp =  async() => {
        setLoading(true);
        const ref = doc(db, "UserInformation", userUid);
        let newValue = xp - 1;
        setXp(newValue);
        await deleteDoc(doc(db, "UserInformation", userUid));
        await setDoc(ref, { xp: newValue });
        setLoading(false);
    }

    return (
        <UserContext.Provider value={{ couldLogin, signIn, signOut, user, loading, signUp, xp, getXP, updateXp, decreaseXp }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }