import { Component } from 'react';

export default class LikeDislike extends Component {

    state = {
        likeValied: false,
        dislikeValied: false,
    }

    dislikeClickHandler = () => {
        this.setState({ dislikeValied: !this.state.dislikeValied });
        if (this.state.likeValied === true) {
            this.setState({ likeValied: false });
        }
    }

    likeClickHandler = () => {
        this.setState({ likeValied: !this.state.likeValied });
        if (this.state.dislikeValied === true) {
            this.setState({ dislikeValied: false });
        }
    }

    render() {
        let newClass = ["like-button", "liked"];
        let newDisClass = ["dislike-button", "disliked"];
        return (
            <>
                <div>
                    <button
                        className={this.state.likeValied ? newClass.join(' ') : "like-button"}
                        onClick={this.likeClickHandler}> Like | <span >{
                            this.state.likeValied ? 101 : 100
                        }</span></button>
                    <button
                        className={this.state.dislikeValied ? newDisClass.join(' ') : "dislike-button"}
                        onClick={this.dislikeClickHandler}>Dislike | <span>{
                            this.state.dislikeValied ? 26 : 25
                        }</span></button>
                    <h2>Like/Dislike</h2>
                </div>
                <style>{`
                    .like-button, .dislike-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:   #585858;
                    }

                    .liked, .disliked {
                        font-weight: bold;
                        color: #1565c0;
                    }
                `}</style>
            </>
        );
    }
}
