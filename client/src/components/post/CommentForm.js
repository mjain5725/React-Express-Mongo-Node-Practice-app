import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from '../../store/actions/index';

const CommentForm = ({postId, addComment}) => {
    const [text, setText] = useState('')
    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Add a Comment...</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addComment(postId,{text});
            setText('')
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Type your comment here...."
            value={text}
            onChange={e =>{
                setText(e.target.value)
            }
        }
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(CommentForm)
