import React, { Component } from 'react'

export default class CommentForm extends Component {
    render() {
        return (
            <div class="container">
                <div className="new-comment">
                    <form id="comment">
                        <textarea 
                        form ="comment" 
                        name="text" 
                        id="text" 
                        rows="3"
                        placeholder="Write Something..."
                        />
                        <input type="submit" />
                    </form> 
                    
                </div>
            </div>
        )
    }
}
