import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Result(props) {
  return (
    <section id="quiz">
      <CSSTransitionGroup
        className="container result"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div>
          Thank you for inquiring. Your answers have been sent to my email and I will be contacting you as soon as I can.
        </div>
      </CSSTransitionGroup>
    </section>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
