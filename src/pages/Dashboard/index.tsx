import { Link } from 'react-router-dom'
import './style.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'

import firebaseApp from '../../services/firebase'

import { getFirestore, addDoc, collection, getDocs, onSnapshot, query } from 'firebase/firestore'

const Dashboard = () => {

    const { signOut, user, xp, getXP } = useContext(UserContext)

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<any>([])
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {

        const q = query(collection(db, "messages"))

        onSnapshot(q, (querySnapshot) => {
            const aux: any = []
            querySnapshot.forEach((doc: any) => {
                console.log(doc.id, doc.data())
                aux.push({
                    id: doc.id,
                    ...doc.data()
                })

            })
            setMessages([...aux])
        })
    }, [])

    useEffect(() => {
        getXP();
        setHasLoaded(true);
    }, [])

    const db = getFirestore(firebaseApp)

    const handleAdd = async function () {

        const message_json = {
            message,
            email: user.email
        }

        const docref = await addDoc(collection(db, "messages"), message_json)
    }

    return (
        <>
            <div className='DashboardContainer'>

            <h1>Dashboard</h1>
            {hasLoaded && <h1>{xp}</h1>}

            <Link to="/game">JOGAR!</Link>
            <div onClick={() => signOut()}>Deslogar</div>
            </div>
        </>
    )
}

export default Dashboard