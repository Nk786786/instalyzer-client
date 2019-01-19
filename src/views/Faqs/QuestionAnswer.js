import React from 'react';
import './QuestionAnswer.css';

const CaretIcon = ({ open }) => open
    ? <div className='qa-cart-icon'>&#9660;</div>
    : <div className='qa-cart-icon'>&#9668;</div>

export class QuestionAnswer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleAnswer: false,
        }

        this.toggleVisibleAnswer = this.toggleVisibleAnswer.bind(this);
    }

    toggleVisibleAnswer() {
        const visibleAnswer = !this.state.visibleAnswer;

        this.setState({ visibleAnswer });
    }

    render() {
        const { question, answer } = this.props;
        const { visibleAnswer } = this.state;

        return (
            <div className='question-answer-container'>
                <div className='qa-question-container' onClick={this.toggleVisibleAnswer}>
                    <CaretIcon open={visibleAnswer} />
                    <div className='qa-question'>{question}</div>
                </div>
                {visibleAnswer &&
                    <div className='qa-answer'>{answer}</div>
                }
            </div>
        );
    }
}

export default QuestionAnswer;