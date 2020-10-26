import QuestionType from '../../question/enums/questionType';

const generateRandomQuestionType = (): QuestionType => {
  const chooseSwift = Math.random() >= 0.5;
  return chooseSwift ? QuestionType.SWIFT : QuestionType.TRUMP;
};

export default generateRandomQuestionType();
