function gameApp() {
    return {
        // User management
        currentUser: null,
        newUserName: '',
        newUserGrade: '',
        savedUsers: [],
        
        // Game management
        currentGame: null,
        gameOver: false,
        timeRemaining: 0,
        timerInterval: null,
        currentScore: 0,
        feedbackClass: '',
        
        // Game specific variables
        currentProblem: {},
        userAnswer: '',
        bingoNumbers: [],
        selectedBingoNumbers: [],
        guessedLetters: [],
        guessesLeft: 6,
        displayedWord: '',
        
        // Rewards
        rewards: [
            { id: 1, name: '15 minutes Screen Time', cost: 50 },
            { id: 2, name: 'Ice Cream Treat', cost: 100 },
            { id: 3, name: 'Small Lego Set', cost: 200 },
            { id: 4, name: 'Board Game', cost: 300 },
            { id: 5, name: 'Art Supplies', cost: 150 },
            { id: 6, name: 'Movie Night', cost: 250 }
        ],
        showRewardConfirmation: false,
        selectedReward: null,
        rewardHistory: [],
        
        // Available games
        games: [
            { id: 1, name: 'Math Bingo', category: 'Math', type: 'mathBingo', minGrade: 'K', maxGrade: '5' },
            { id: 2, name: 'Math Challenge', category: 'Math', type: 'mathProblem', minGrade: '1', maxGrade: '5' },
            { id: 3, name: 'Word Scramble', category: 'Language', type: 'wordScramble', minGrade: '1', maxGrade: '5' },
            { id: 4, name: 'Hangman', category: 'Language', type: 'hangman', minGrade: 'K', maxGrade: '5' },
            { id: 5, name: 'IQ Challenge', category: 'IQ Test', type: 'iqTest', minGrade: '2', maxGrade: '5' }
        ],
        
        init() {
            this.loadUsers();
            this.loadRewardHistory();
        },
        
        get filteredGames() {
            if (!this.currentUser) return [];
            
            const grade = this.currentUser.grade;
            return this.games.filter(game => {
                // Convert grades to numerical values for comparison
                const minGradeValue = game.minGrade === 'K' ? 0 : parseInt(game.minGrade);
                const maxGradeValue = parseInt(game.maxGrade);
                const userGradeValue = grade === 'K' ? 0 : parseInt(grade);
                
                return userGradeValue >= minGradeValue && userGradeValue <= maxGradeValue;
            });
        },
        
        // User Management Functions
        loadUsers() {
            const storedUsers = localStorage.getItem('educationalGameUsers');
            if (storedUsers) {
                this.savedUsers = JSON.parse(storedUsers);
            }
        },
        
        saveUsers() {
            localStorage.setItem('educationalGameUsers', JSON.stringify(this.savedUsers));
        },
        
        registerUser() {
            if (!this.newUserName.trim() || !this.newUserGrade) {
                alert('Please enter your name and select a grade.');
                return;
            }
            
            const newUser = {
                id: Date.now(),
                name: this.newUserName.trim(),
                grade: this.newUserGrade,
                points: 0
            };
            
            this.savedUsers.push(newUser);
            this.saveUsers();
            this.loginUser(newUser);
        },
        
        loginUser(user) {
            this.currentUser = user;
            this.loadRewardHistory();
        },
        
        logout() {
            this.currentUser = null;
        },
        
        updateUserPoints() {
            const index = this.savedUsers.findIndex(user => user.id === this.currentUser.id);
            if (index !== -1) {
                this.savedUsers[index] = this.currentUser;
                this.saveUsers();
            }
        },
        
        // Game Management Functions
        startGame(game) {
            this.currentGame = game;
            this.currentScore = 0;
            this.timeRemaining = 120; // 2 minutes
            this.feedbackClass = '';
            this.gameOver = false;
            
            // Set up game-specific variables
            switch (game.type) {
                case 'mathBingo':
                    this.setupMathBingo();
                    break;
                case 'mathProblem':
                    this.setupMathProblem();
                    break;
                case 'wordScramble':
                    this.setupWordScramble();
                    break;
                case 'hangman':
                    this.setupHangman();
                    break;
                case 'iqTest':
                    this.setupIQTest();
                    break;
            }
            
            // Start the timer
            this.timerInterval = setInterval(() => {
                this.timeRemaining--;
                if (this.timeRemaining <= 0) {
                    this.endGame();
                }
            }, 1000);
        },
        
        exitGame() {
            if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
                this.endGame();
            }
        },
        
        endGame() {
            clearInterval(this.timerInterval);
            
            // Add points to user account
            this.currentUser.points += this.currentScore;
            this.updateUserPoints();
            
            // Show game over screen
            this.gameOver = true;
        },
        
        closeGameOver() {
            this.gameOver = false;
            this.currentGame = null;
        },
        
        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        },
        
        showFeedback(isCorrect) {
            // Play sound
            const sound = document.getElementById(isCorrect ? 'correctSound' : 'wrongSound');
            sound.currentTime = 0;
            sound.play();
            
            // Show visual feedback
            this.feedbackClass = isCorrect ? 'correct-bg' : 'incorrect-bg';
            
            // Clear feedback after a short delay
            setTimeout(() => {
                this.feedbackClass = '';
            }, 500);
        },
        
        // Math Bingo Game
        setupMathBingo() {
            this.selectedBingoNumbers = [];
            this.generateMathBingoProblem();
        },
        
        generateMathBingoProblem() {
            const grade = this.currentUser.grade;
            let max, operation;
            
            // Adjust difficulty based on grade
            if (grade === 'K') {
                max = 10;
                operation = '+';
            } else if (grade === '1') {
                max = 20;
                operation = Math.random() < 0.7 ? '+' : '-';
            } else if (grade === '2') {
                max = 50;
                operation = Math.random() < 0.6 ? '+' : '-';
            } else if (grade === '3') {
                max = 100;
                const rand = Math.random();
                operation = rand < 0.4 ? '+' : (rand < 0.8 ? '-' : '×');
            } else {
                max = 100;
                const rand = Math.random();
                operation = rand < 0.3 ? '+' : (rand < 0.6 ? '-' : (rand < 0.9 ? '×' : '÷'));
            }
            
            let num1, num2, answer;
            
            switch (operation) {
                case '+':
                    num1 = Math.floor(Math.random() * max) + 1;
                    num2 = Math.floor(Math.random() * max) + 1;
                    answer = num1 + num2;
                    break;
                case '-':
                    num1 = Math.floor(Math.random() * max) + 1;
                    num2 = Math.floor(Math.random() * num1) + 1; // Ensure positive result
                    answer = num1 - num2;
                    break;
                case '×':
                    num1 = Math.floor(Math.random() * 12) + 1;
                    num2 = Math.floor(Math.random() * 12) + 1;
                    answer = num1 * num2;
                    break;
                case '÷':
                    num2 = Math.floor(Math.random() * 12) + 1;
                    answer = Math.floor(Math.random() * 12) + 1;
                    num1 = num2 * answer; // Ensure clean division
                    break;
            }
            
            this.currentProblem = {
                question: `${num1} ${operation} ${num2} = ?`,
                answer: answer
            };
            
            // Generate bingo numbers
            this.bingoNumbers = this.generateBingoNumbers(answer);
        },
        
        generateBingoNumbers(correctAnswer) {
            const numbers = [correctAnswer];
            
            // Generate 14 more unique random numbers
            while (numbers.length < 15) {
                const offset = Math.floor(Math.random() * 20) - 10;
                const newNumber = correctAnswer + offset;
                
                if (newNumber > 0 && !numbers.includes(newNumber)) {
                    numbers.push(newNumber);
                }
            }
            
            // Shuffle the array
            return numbers.sort(() => Math.random() - 0.5);
        },
        
        checkBingoAnswer(number) {
            this.selectedBingoNumbers.push(number);
            
            if (number === this.currentProblem.answer) {
                this.showFeedback(true);
                this.currentScore += 10;
                setTimeout(() => this.generateMathBingoProblem(), 1000);
            } else {
                this.showFeedback(false);
            }
        },
        
        // Math Problem Game
        setupMathProblem() {
            this.userAnswer = '';
            this.generateMathProblem();
        },
        
        generateMathProblem() {
            // Reuse the same logic as math bingo
            this.generateMathBingoProblem();
            this.userAnswer = '';
        },
        
        checkMathAnswer() {
            const userAnswerNum = parseInt(this.userAnswer);
            
            if (userAnswerNum === this.currentProblem.answer) {
                this.showFeedback(true);
                this.currentScore += 10;
                this.generateMathProblem();
            } else {
                this.showFeedback(false);
            }
        },
        
        // Word Scramble Game
        setupWordScramble() {
            this.userAnswer = '';
            this.generateWordScramble();
        },
        
        generateWordScramble() {
            const grade = this.currentUser.grade;
            let words;
            
            // Word lists by grade level
            if (grade === 'K' || grade === '1') {
                words = [
                    {word: 'cat', hint: 'A furry pet that meows'},
                    {word: 'dog', hint: 'A pet that barks'},
                    {word: 'sun', hint: 'It shines during the day'},
                    {word: 'hat', hint: 'You wear it on your head'},
                    {word: 'run', hint: 'Moving fast with your feet'}
                ];
            } else if (grade === '2' || grade === '3') {
                words = [
                    {word: 'school', hint: 'Where you learn'},
                    {word: 'friend', hint: 'Someone you like to play with'},
                    {word: 'apple', hint: 'A fruit that can be red or green'},
                    {word: 'water', hint: 'You drink it'},
                    {word: 'happy', hint: 'Feeling good'}
                ];
            } else {
                words = [
                    {word: 'science', hint: 'Study of the natural world'},
                    {word: 'computer', hint: 'Electronic device for work and games'},
                    {word: 'mountain', hint: 'Very tall landform'},
                    {word: 'adventure', hint: 'An exciting experience'},
                    {word: 'knowledge', hint: 'Information and skills gained through experience'}
                ];
            }
            
            // Select random word
            const wordObj = words[Math.floor(Math.random() * words.length)];
            
            // Scramble the word
            const scrambled = wordObj.word.split('')
                .sort(() => Math.random() - 0.5)
                .join('');
            
            this.currentProblem = {
                scrambled: scrambled,
                word: wordObj.word,
                hint: wordObj.hint
            };
            
            this.userAnswer = '';
        },
        
        checkWordAnswer() {
            if (this.userAnswer.toLowerCase() === this.currentProblem.word.toLowerCase()) {
                this.showFeedback(true);
                this.currentScore += 10;
                this.generateWordScramble();
            } else {
                this.showFeedback(false);
            }
        },
        
        // Hangman Game
        setupHangman() {
            this.guessedLetters = [];
            this.guessesLeft = 6;
            this.generateHangmanWord();
        },
        
        generateHangmanWord() {
            const grade = this.currentUser.grade;
            let words;
            
            // Word lists by grade level
            if (grade === 'K' || grade === '1') {
                words = [
                    {word: 'CAT', hint: 'A furry pet that meows'},
                    {word: 'DOG', hint: 'A pet that barks'},
                    {word: 'SUN', hint: 'It shines during the day'},
                    {word: 'HAT', hint: 'You wear it on your head'},
                    {word: 'BUS', hint: 'A big vehicle that carries many people'}
                ];
            } else if (grade === '2' || grade === '3') {
                words = [
                    {word: 'SCHOOL', hint: 'Where you learn'},
                    {word: 'FRIEND', hint: 'Someone you like to play with'},
                    {word: 'PLANET', hint: 'Earth is one of these'},
                    {word: 'ANIMAL', hint: 'Living creatures like dogs and cats'},
                    {word: 'GARDEN', hint: 'Where plants and flowers grow'}
                ];
            } else {
                words = [
                    {word: 'SCIENCE', hint: 'Study of the natural world'},
                    {word: 'COMPUTER', hint: 'Electronic device for work and games'},
                    {word: 'MOUNTAIN', hint: 'Very tall landform'},
                    {word: 'ADVENTURE', hint: 'An exciting experience'},
                    {word: 'KNOWLEDGE', hint: 'Information and skills gained through experience'}
                ];
            }
            
            // Select random word
            const wordObj = words[Math.floor(Math.random() * words.length)];
            
            this.currentProblem = {
                word: wordObj.word,
                hint: wordObj.hint
            };
            
            this.updateDisplayedWord();
        },
        
        updateDisplayedWord() {
            this.displayedWord = this.currentProblem.word
                .split('')
                .map(letter => this.guessedLetters.includes(letter) ? letter : '_')
                .join(' ');
        },
        
        guessLetter(letter) {
            this.guessedLetters.push(letter);
            
            if (this.currentProblem.word.includes(letter)) {
                this.showFeedback(true);
                this.updateDisplayedWord();
                
                // Check if word is complete
                if (!this.displayedWord.includes('_')) {
                    this.currentScore += 20;
                    setTimeout(() => this.generateHangmanWord(), 1000);
                }
            } else {
                this.showFeedback(false);
                this.guessesLeft--;
                
                if (this.guessesLeft <= 0) {
                    setTimeout(() => this.generateHangmanWord(), 1000);
                }
            }
        },
        
        // IQ Test Game
        setupIQTest() {
            this.generateIQQuestion();
        },
        
        generateIQQuestion() {
            const grade = this.currentUser.grade;
            let questions;
            
            // Questions by grade level
            if (grade === '2' || grade === '3') {
                questions = [
                    {
                        question: "What comes next in the pattern: 2, 4, 6, 8, ?",
                        options: ["9", "10", "12", "14"],
                        answer: "10"
                    },
                    {
                        question: "If a cat has 4 legs, how many legs do 3 cats have?",
                        options: ["7", "12", "9", "6"],
                        answer: "12"
                    },
                    {
                        question: "Which shape doesn't belong?",
                        options: ["Circle", "Square", "Triangle", "Rainbow"],
                        answer: "Rainbow"
                    },
                    {
                        question: "If today is Tuesday, what day was it yesterday?",
                        options: ["Wednesday", "Monday", "Sunday", "Thursday"],
                        answer: "Monday"
                    }
                ];
            } else {
                questions = [
                    {
                        question: "What number comes next: 1, 4, 9, 16, 25, ?",
                        options: ["30", "36", "49", "64"],
                        answer: "36"
                    },
                    {
                        question: "If a clock shows 3:45, what is the angle between the hour and minute hands?",
                        options: ["90°", "97.5°", "107.5°", "112.5°"],
                        answer: "97.5°"
                    },
                    {
                        question: "Which word doesn't belong?",
                        options: ["Apple", "Banana", "Carrot", "Orange"],
                        answer: "Carrot"
                    },
                    {
                        question: "If 5 workers can build a wall in 8 days, how many days would it take 10 workers to build the same wall?",
                        options: ["16", "4", "2", "40"],
                        answer: "4"
                    }
                ];
            }
            
            // Select random question
            const question = questions[Math.floor(Math.random() * questions.length)];
            this.currentProblem = question;
        },
        
        checkIQAnswer(answer) {
            if (answer === this.currentProblem.answer) {
                this.showFeedback(true);
                this.currentScore += 15;
                this.generateIQQuestion();
            } else {
                this.showFeedback(false);
            }
        },
        
        // Rewards System
        loadRewardHistory() {
            if (!this.currentUser) return;
            
            const historyKey = `rewardHistory_${this.currentUser.id}`;
            const storedHistory = localStorage.getItem(historyKey);
            
            if (storedHistory) {
                this.rewardHistory = JSON.parse(storedHistory);
            } else {
                this.rewardHistory = [];
            }
        },
        
        saveRewardHistory() {
            if (!this.currentUser) return;
            
            const historyKey = `rewardHistory_${this.currentUser.id}`;
            localStorage.setItem(historyKey, JSON.stringify(this.rewardHistory));
        },
        
        purchaseReward(reward) {
            if (this.currentUser.points < reward.cost) {
                alert("You don't have enough points for this reward!");
                return;
            }
            
            // Deduct points
            this.currentUser.points -= reward.cost;
            this.updateUserPoints();
            
            // Add to history
            this.rewardHistory.unshift({
                reward: reward,
                date: new Date().toISOString()
            });
            this.saveRewardHistory();
            
            // Show confirmation
            this.selectedReward = reward;
            this.showRewardConfirmation = true;
        },
        
        closeRewardConfirmation() {
            this.showRewardConfirmation = false;
            this.selectedReward = null;
        }
    };
}

          
