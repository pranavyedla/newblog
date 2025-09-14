import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Loader from "../GeneralScreens/Loader";
import { useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { AuthContext } from '../../Context/AuthContext'
import { AiFillLock } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import ReadListStoryItem from '../StoryScreens/ReadListStoryItem';
import { getProfileImageUrl } from '../../utils/imageUtils';

import '../../Css/ReadListPage.css'

const ReadListPage = () => {
    const navigate = useNavigate();
    const [readList, setReadList] = useState([])
    const [loading, setLoading] = useState(false)
    const { config, activeUser } = useContext(AuthContext)

    // Check if user is authenticated
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            navigate("/login")
            return
        }
    }, [navigate])

    useEffect(() => {
        const getUserReadingList = async () => {
            if (!config || !activeUser._id) {
                console.log("Waiting for user data...")
                return
            }
            
            setLoading(true)
            console.log("Fetching read list...")

            try {
                const { data } = await axios.get(`/user/readList`, config)
                console.log("Read list response:", data)
                setReadList(data.data)
                setLoading(false)
            }
            catch (error) {
                console.error("Error fetching read list:", error)
                navigate("/")
            }
        }
        getUserReadingList()


    }, [config, activeUser])


    const editDate = (createdAt) => {

        const d = new Date(createdAt);
        var datestring = d.toLocaleString('eng', { month: 'long' }).substring(0, 3) + "  " + d.getDate()
        return datestring
    }


    return (
        <>
            {loading ? <Loader /> :

                <div className="Inclusive-readList-page">
                    <Link to={'/'} >
                        <FiArrowLeft />
                    </Link>
                    <h2>Reading List </h2>

                    <div className="readList-top-block">

                        <img src={getProfileImageUrl(activeUser.photo, 'http://localhost:5000')} alt={activeUser.username} />


                        <div className='activeUser-info-wrapper'>

                            <b>
                                {activeUser.username}
                            </b>

                            <div>
                                <span>
                                    {editDate(Date.now())}
                                </span>
                                <span>-</span>
                                <span>
                                    {activeUser.readListLength} stories
                                </span>
                                <i>
                                    <AiFillLock />
                                </i>
                            </div>

                        </div>

                        <i className='BsThreeDots-icon'>
                            < BsThreeDots />
                        </i>

                    </div>

                    <div className="readList-story-wrapper">

                        {readList.length !== 0 ?
                            <>
                                {readList.map(story => {
                                    return (
                                        <ReadListStoryItem key={story._id} story={story} editDate={editDate} />

                                    )
                                })}
                            </>

                            :

                            <div className="empty-readList">

                                Reading List is empty

                            </div>
                        }


                    </div>

                </div>
            }
        </>

    )
}

export default ReadListPage