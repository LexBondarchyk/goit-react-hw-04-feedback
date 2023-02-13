import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';


const options = ['good', 'bad', 'neutral'];

const Feedback = () =>{
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

const leaveFeedback = feedback => {
  setFeedbacks(prevState => {
    const value = prevState[feedback];
    return { ...prevState, [feedback]: value + 1 };
  });
};

const countTotalFeedback = () => {
  const { good, neutral, bad } = feedbacks;
  return good + bad + neutral;
  };


  const countPositiveFeedbackPercentage = () => {
    let total = countTotalFeedback();
    if (!total) {
      return 0;
    };
    
  const result = Math.round(Number((good / total) * 100));
    return result;
  };

  const { good, neutral, bad } = feedbacks;
  const totalFeedbackCount = countTotalFeedback();
  const positiveFeedback = countPositiveFeedbackPercentage(); 

    return (
      <>
        <Section title={'Please leave feedback'}>
          <FeedbackOptions
            onLeaveFeedback={leaveFeedback}
            options={options}
          />
          
          {countTotalFeedback() ? (
            <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedbackCount}
            positivePercentage={positiveFeedback}
            />
            ) : (
              <Notification message="There is no feedback" />
            )}
          </Section>
        </>
      );
    }
    
    export default Feedback;
    