import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    SlideInLeft,
    SlideInRight,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

const DUMMY_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    category: "Geography"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    category: "Science"
  },
  {
    id: 3,
    question: "What is 15 + 27?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    category: "Math"
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"],
    correctAnswer: 2,
    category: "Art"
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3,
    category: "Geography"
  },
  {
    id: 6,
    question: "Which gas makes up most of Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 1,
    category: "Science"
  },
  {
    id: 7,
    question: "What is 12 × 8?",
    options: ["84", "92", "96", "104"],
    correctAnswer: 2,
    category: "Math"
  },
  {
    id: 8,
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    category: "History"
  },
  {
    id: 9,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    category: "Science"
  },
  {
    id: 10,
    question: "Which instrument has 88 keys?",
    options: ["Guitar", "Piano", "Violin", "Drums"],
    correctAnswer: 1,
    category: "Music"
  }
];

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const progressWidth = useSharedValue(0);
  const questionScale = useSharedValue(1);
  
  const router = useRouter();

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, quizCompleted]);

  // Progress bar animation
  useEffect(() => {
    progressWidth.value = withTiming((currentQuestion / DUMMY_QUESTIONS.length) * 100, {
      duration: 500,
    });
  }, [currentQuestion]);

  // Question animation
  useEffect(() => {
    questionScale.value = withSpring(1, { damping: 15 });
  }, [currentQuestion]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const questionStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: questionScale.value }],
    };
  });

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption === null) {
      setSelectedOption(optionIndex);
      
      // Check if answer is correct
      const isCorrect = optionIndex === DUMMY_QUESTIONS[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
      
      // Update selected answers array
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestion] = optionIndex;
      setSelectedAnswers(newSelectedAnswers);
      
      // Show result for 2 seconds then move to next question
      setShowResult(true);
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < DUMMY_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimeLeft(30);
      questionScale.value = withSpring(0.8);
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
    setQuizCompleted(false);
  };

  const handleGoHome = () => {
    router.push('/home');
  };

  const getOptionColor = (optionIndex: number) => {
    if (!showResult) {
      return selectedOption === optionIndex ? '#4CAF50' : '#2a2a2a';
    }
    
    if (optionIndex === DUMMY_QUESTIONS[currentQuestion].correctAnswer) {
      return '#4CAF50'; // Correct answer - green
    }
    
    if (selectedOption === optionIndex && optionIndex !== DUMMY_QUESTIONS[currentQuestion].correctAnswer) {
      return '#f44336'; // Wrong selected answer - red
    }
    
    return '#2a2a2a';
  };

  const getOptionTextColor = (optionIndex: number) => {
    if (!showResult) {
      return selectedOption === optionIndex ? '#ffffff' : '#ffffff';
    }
    
    return '#ffffff';
  };

  if (quizCompleted) {
    const percentage = Math.round((score / DUMMY_QUESTIONS.length) * 100);
    
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
        <Animated.View 
          entering={FadeIn.duration(800)}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={{ alignItems: 'center', marginBottom: 40 }}>
            <Text style={{ color: '#ffffff', fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>
              Quiz Completed! 🎉
            </Text>
            <Text style={{ color: '#b0b0b0', fontSize: 18, textAlign: 'center' }}>
              Great job! Here are your results
            </Text>
          </Animated.View>

          {/* Score Circle */}
          <Animated.View 
            entering={FadeIn.delay(400).duration(800)}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: '#2a2a2a',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 40,
              borderWidth: 8,
              borderColor: percentage >= 70 ? '#4CAF50' : percentage >= 50 ? '#FF9800' : '#f44336'
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 48, fontWeight: 'bold' }}>
              {percentage}%
            </Text>
            <Text style={{ color: '#b0b0b0', fontSize: 16 }}>
              {score}/{DUMMY_QUESTIONS.length} Correct
            </Text>
          </Animated.View>

          {/* Performance Message */}
          <Animated.View entering={FadeInDown.delay(600).duration(600)} style={{ marginBottom: 40 }}>
            <Text style={{ 
              color: percentage >= 70 ? '#4CAF50' : percentage >= 50 ? '#FF9800' : '#f44336',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {percentage >= 70 ? 'Excellent!' : percentage >= 50 ? 'Good Job!' : 'Keep Practicing!'}
            </Text>
            <Text style={{ color: '#b0b0b0', fontSize: 16, textAlign: 'center', marginTop: 8 }}>
              {percentage >= 70 
                ? 'Outstanding performance! You really know your stuff.' 
                : percentage >= 50 
                ? 'Well done! With a bit more practice, you\'ll be perfect.' 
                : 'Don\'t give up! Every expert was once a beginner.'}
            </Text>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View entering={FadeInDown.delay(800).duration(600)} style={{ width: '100%' }}>
            <TouchableOpacity
              onPress={handleRestartQuiz}
              style={{
                backgroundColor: '#4CAF50',
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 12,
                marginBottom: 16,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Icon name="refresh" size={24} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
                Try Again
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoHome}
              style={{
                backgroundColor: '#2a2a2a',
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 12,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#404040'
              }}
            >
              <Icon name="home" size={24} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
                Back to Home
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      {/* Header */}
      <View style={{ paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={handleGoHome}>
            <Icon name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
            Question {currentQuestion + 1}/{DUMMY_QUESTIONS.length}
          </Text>
          <View style={{
            backgroundColor: timeLeft <= 10 ? '#f44336' : '#4CAF50',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20
          }}>
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
              {timeLeft}s
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={{
          height: 8,
          backgroundColor: '#2a2a2a',
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <Animated.View
            style={[
              progressStyle,
              {
                height: '100%',
                backgroundColor: '#4CAF50',
                borderRadius: 4
              }
            ]}
          />
        </View>

        {/* Score */}
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Text style={{ color: '#b0b0b0', fontSize: 16 }}>
            Score: <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>{score}</Text>
          </Text>
        </View>
      </View>

      {/* Question Content */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <Animated.View style={questionStyle}>
          {/* Category Badge */}
          <Animated.View 
            entering={SlideInLeft.duration(600)}
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#4CAF50',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              marginBottom: 24
            }}
          >
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
              {DUMMY_QUESTIONS[currentQuestion].category}
            </Text>
          </Animated.View>

          {/* Question */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <Text style={{
              color: '#ffffff',
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 40,
              lineHeight: 32
            }}>
              {DUMMY_QUESTIONS[currentQuestion].question}
            </Text>
          </Animated.View>

          {/* Options */}
          <View style={{ gap: 16 }}>
            {DUMMY_QUESTIONS[currentQuestion].options.map((option, index) => (
              <Animated.View
                key={index}
                entering={SlideInRight.delay(400 + index * 100).duration(600)}
              >
                <TouchableOpacity
                  onPress={() => handleOptionSelect(index)}
                  disabled={selectedOption !== null}
                  style={{
                    backgroundColor: getOptionColor(index),
                    padding: 20,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: selectedOption === index ? '#ffffff' : 'transparent'
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: getOptionTextColor(index) === '#ffffff' ? 'rgba(255,255,255,0.2)' : '#4CAF50',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 16
                    }}>
                      <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <Text style={{
                      color: getOptionTextColor(index),
                      fontSize: 18,
                      fontWeight: '600',
                      flex: 1
                    }}>
                      {option}
                    </Text>
                    {showResult && index === DUMMY_QUESTIONS[currentQuestion].correctAnswer && (
                      <Icon name="check-circle" size={24} color="#ffffff" />
                    )}
                    {showResult && selectedOption === index && index !== DUMMY_QUESTIONS[currentQuestion].correctAnswer && (
                      <Icon name="close-circle" size={24} color="#ffffff" />
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Result Message */}
          {showResult && (
            <Animated.View 
              entering={FadeIn.delay(500).duration(600)}
              style={{
                marginTop: 32,
                padding: 20,
                backgroundColor: selectedOption === DUMMY_QUESTIONS[currentQuestion].correctAnswer ? '#4CAF50' : '#f44336',
                borderRadius: 16,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                {selectedOption === DUMMY_QUESTIONS[currentQuestion].correctAnswer ? '🎉 Correct!' : '❌ Wrong!'}
              </Text>
              {selectedOption !== DUMMY_QUESTIONS[currentQuestion].correctAnswer && (
                <Text style={{ color: '#ffffff', fontSize: 14, textAlign: 'center' }}>
                  The correct answer was: {DUMMY_QUESTIONS[currentQuestion].options[DUMMY_QUESTIONS[currentQuestion].correctAnswer]}
                </Text>
              )}
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default QuizScreen;
