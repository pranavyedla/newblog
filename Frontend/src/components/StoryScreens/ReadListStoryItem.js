import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { BsThreeDots, BsBookmarkFill } from 'react-icons/bs'
import { getStoryImageUrl } from '../../utils/imageUtils'

const ReadListStoryItem = ({ story, editDate }) => {

    const truncateContent = (content) => {
        const trimmedString = content.substr(0, 130);
        return trimmedString
    }

    return (

        <div className="readList-story-item">

            <section>
                <div className="story-top-block">
                    <div className="readList-story-author">

                        {story.author.username}

                    </div>
                    <span>-</span>
                    <div className="readList-story-createdAt">
                        {editDate(story.createdAt)}
                    </div>
                    <i>
                        <AiFillStar />
                    </i>

                </div>

                <div className="story-med-block">
                    <div className="readList-story-title">
                        <Link to={`/story/${story.slug}`}>
                            {story.title}
                        </Link>
                    </div>
                    <div className="readList-story-content">

                        <span dangerouslySetInnerHTML={{ __html: truncateContent(story.content) + "..." }}></span>

                    </div>

                </div>

                <div className="story-bottom-block">
                    <Link to={`/story/${story.slug}`}>
                        <span>
                            Read More
                        </span>
                        <span>
                            -
                        </span>
                        <span>
                            {story.readtime} min read
                        </span>
                    </Link>

                    <div>

                        <i>
                            <BsBookmarkFill />
                        </i>
                        <i>
                            < BsThreeDots />
                        </i>

                    </div>
                </div>
            </section>

            <section>
                <div className="story-Image-Wrap">
                    <img 
                        src={getStoryImageUrl(story.image, 'http://localhost:5000')} 
                        alt={story.title} 
                        width="180px"
                        onError={(e) => {
                            e.target.src = '/default-story.svg';
                        }}
                    />
                </div>

            </section>

        </div>
    )
}

export default ReadListStoryItem