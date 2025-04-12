window.gameApp = function () {
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
        guessesLeft: 3,
        displayedWord: '',
        
        // Rewards
        rewards: [
            { id: 1, name: '15 minutes Screen Time', cost: 1500 },
            { id: 2, name: 'Ice Cream Treat', cost: 1000 },
            { id: 3, name: 'Small Lego Set', cost: 5000 },
            { id: 4, name: 'Board Game', cost: 7500 },
            { id: 5, name: 'Art Supplies', cost: 110000 },
            { id: 6, name: 'Movie Night', cost: 100000 }
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
            this.timeRemaining = 180; // 3 minutes
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
                this.currentScore += 3;
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
                this.currentScore += 2;
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
            // } else if (grade === '2' || grade === '3') {
                 } else {
const words = [
    {word: 'SCHOOL', hint: 'Where you learn'},
    {word: 'FRIEND', hint: 'Someone you like to play with'},
    {word: 'PLANET', hint: 'Earth is one of these'},
    {word: 'ANIMAL', hint: 'Living creatures like dogs and cats'},
    {word: 'GARDEN', hint: 'Where plants and flowers grow'},
    {word: 'PENCIL', hint: 'Writing tool with lead inside'},
    {word: 'BANANA', hint: 'Yellow curved fruit'},
    {word: 'WINDOW', hint: 'Glass opening in a wall'},
    {word: 'JACKET', hint: 'Clothing worn to stay warm'},
    {word: 'PUZZLE', hint: 'Game with pieces to fit together'},
    {word: 'ORANGE', hint: 'Citrus fruit that shares name with a color'},
    {word: 'GUITAR', hint: 'Musical instrument with strings'},
    {word: 'PILLOW', hint: 'Soft cushion for your head'},
    {word: 'ROCKET', hint: 'Vehicle that travels to space'},
    {word: 'CASTLE', hint: 'Large building where kings and queens live'},
    {word: 'BRIDGE', hint: 'Structure built over rivers or roads'},
    {word: 'COOKIE', hint: 'Sweet baked treat'},
    {word: 'TURTLE', hint: 'Reptile with a shell'},
    {word: 'DOCTOR', hint: 'Person who helps sick people'},
    {word: 'WINTER', hint: 'Cold season with snow'},
    {word: 'SUMMER', hint: 'Warm season for swimming'},
    {word: 'CAMERA', hint: 'Device used to take pictures'},
    {word: 'POTATO', hint: 'Vegetable that grows underground'},
    {word: 'BASKET', hint: 'Container woven from flexible materials'},
    {word: 'RABBIT', hint: 'Animal with long ears that hops'},
    {word: 'CIRCUS', hint: 'Traveling show with performers and animals'},
    {word: 'MUSEUM', hint: 'Building where art and artifacts are displayed'},
    {word: 'BUTTER', hint: 'Dairy product spread on bread'},
    {word: 'ISLAND', hint: 'Land surrounded by water'},
    {word: 'JUNGLE', hint: 'Dense tropical forest'},
    {word: 'BOTTLE', hint: 'Container for liquids'},
    {word: 'DRAGON', hint: 'Mythical fire-breathing creature'},
    {word: 'MARKET', hint: 'Place where goods are bought and sold'},
    {word: 'HELMET', hint: 'Protective gear for your head'},
    {word: 'PENCIL', hint: 'Tool used for writing or drawing'},
    {word: 'FOREST', hint: 'Large area covered with trees'},
    {word: 'SOCCER', hint: 'Sport played with a round ball and feet'},
    {word: 'SPIDER', hint: 'Eight-legged creature that spins webs'},
    {word: 'CHEESE', hint: 'Dairy food often used on pizza'},
    {word: 'FLOWER', hint: 'Colorful part of a plant'},
    {word: 'WALLET', hint: 'Small case for carrying money'},
    {word: 'COFFEE', hint: 'Hot beverage made from beans'},
    {word: 'KITTEN', hint: 'Baby cat'},
    {word: 'PURPLE', hint: 'Color between red and blue'},
    {word: 'TENNIS', hint: 'Sport played with rackets and a ball'},
    {word: 'CARPET', hint: 'Floor covering made of fabric'},
    {word: 'MIRROR', hint: 'Surface that reflects your image'},
    {word: 'LEMON', hint: 'Sour yellow citrus fruit'},
    {word: 'SAILOR', hint: 'Person who works on a ship'},
    {word: 'PUPPET', hint: 'Toy figure moved by strings or hands'},
    {word: 'HOCKEY', hint: 'Sport played on ice with sticks'},
    {word: 'CANDLE', hint: 'Wax stick with wick that provides light'},
    {word: 'HAMMER', hint: 'Tool used to drive nails'},
    {word: 'TURKEY', hint: 'Large bird eaten at Thanksgiving'},
    {word: 'DESERT', hint: 'Hot, dry area with sand'},
    {word: 'LADDER', hint: 'Tool for climbing up and down'},
    {word: 'CARROT', hint: 'Orange vegetable that rabbits like'},
    {word: 'BUTTON', hint: 'Small disc used to fasten clothes'},
    {word: 'POLICE', hint: 'People who enforce laws'},
    {word: 'JACKET', hint: 'Outer garment with sleeves'},
    {word: 'DINNER', hint: 'Evening meal'},
    {word: 'TIGER', hint: 'Large striped wild cat'},
    {word: 'MUSIC', hint: 'Sounds organized to be pleasant'},
    {word: 'RIVER', hint: 'Large natural stream of water'},
    {word: 'PIZZA', hint: 'Italian dish with cheese and toppings'},
    {word: 'BEACH', hint: 'Sandy shore by the ocean'},
    {word: 'TRUCK', hint: 'Large vehicle for carrying goods'},
    {word: 'QUEEN', hint: 'Female ruler of a kingdom'},
    {word: 'APPLE', hint: 'Round fruit, often red or green'},
    {word: 'HOUSE', hint: 'Building where people live'},
    {word: 'CLOCK', hint: 'Device that shows the time'},
    {word: 'CHAIR', hint: 'Furniture for sitting'},
    {word: 'WATER', hint: 'Clear liquid essential for life'},
    {word: 'TRAIN', hint: 'Vehicle that runs on tracks'},
    {word: 'CLOUD', hint: 'White fluffy thing in the sky'},
    {word: 'BREAD', hint: 'Baked food made from flour'},
    {word: 'SNAKE', hint: 'Reptile with no legs'},
    {word: 'HORSE', hint: 'Animal people ride'},
    {word: 'OCEAN', hint: 'Large body of salt water'},
    {word: 'SHIRT', hint: 'Clothing worn on upper body'},
    {word: 'PHONE', hint: 'Device used to call people'},
    {word: 'TABLE', hint: 'Furniture with flat top and legs'},
    {word: 'SHARK', hint: 'Large fish with sharp teeth'},
    {word: 'MOUSE', hint: 'Small rodent or computer device'},
    {word: 'MOVIE', hint: 'Story shown on a screen'},
    {word: 'PAPER', hint: 'Material used for writing'},
    {word: 'MONEY', hint: 'Used to buy things'},
    {word: 'QUEEN', hint: 'Female monarch'},
    {word: 'NIGHT', hint: 'Time when it's dark outside'},
    {word: 'LIGHT', hint: 'Makes things visible'},
    {word: 'SPACE', hint: 'Area beyond Earth's atmosphere'},
    {word: 'GRASS', hint: 'Green plants in lawns'},
    {word: 'BABY', hint: 'Very young child'},
    {word: 'KITE', hint: 'Toy that flies in the wind'},
    {word: 'STAR', hint: 'Bright object in the night sky'},
    {word: 'CAKE', hint: 'Sweet dessert for celebrations'},
    {word: 'BIRD', hint: 'Animal with wings that can fly'},
    {word: 'BOOK', hint: 'Pages with words bound together'},
    {word: 'MILK', hint: 'White drink from cows'},
    {word: 'BALL', hint: 'Round object used in games'},
    {word: 'FISH', hint: 'Animal that lives in water'},
    {word: 'LION', hint: 'Large wild cat with a mane'},
    {word: 'SNOW', hint: 'White frozen precipitation'},
    {word: 'TREE', hint: 'Plant with trunk and branches'},
    {word: 'DOOR', hint: 'Entrance to a room or building'},
    {word: 'MOON', hint: 'Object that orbits Earth'},
    {word: 'KING', hint: 'Male ruler of a kingdom'},
    {word: 'FIRE', hint: 'Hot, burning phenomenon'},
    {word: 'RAIN', hint: 'Water falling from clouds'},
    {word: 'GOLD', hint: 'Precious yellow metal'},
    {word: 'FROG', hint: 'Green jumping amphibian'},
    {word: 'BOAT', hint: 'Vehicle that travels on water'},
    {word: 'DUCK', hint: 'Bird that swims in water'},
    {word: 'BEAR', hint: 'Large furry woodland animal'},
    {word: 'DESK', hint: 'Furniture used for writing'},
    {word: 'SOAP', hint: 'Used for washing'},
    {word: 'GIFT', hint: 'Something given to someone'},
    {word: 'CHEF', hint: 'Person who cooks professionally'},
    {word: 'GAME', hint: 'Activity played for fun'},
    {word: 'FARM', hint: 'Land used for growing crops'},
    {word: 'RING', hint: 'Circular piece of jewelry'},
    {word: 'WING', hint: 'Part of a bird used for flying'},
    {word: 'SONG', hint: 'Musical composition with words'},
    {word: 'ROAD', hint: 'Path for traveling'},
    {word: 'SHOE', hint: 'Footwear'},
    {word: 'BIKE', hint: 'Two-wheeled vehicle'},
    {word: 'NOSE', hint: 'Body part used for smelling'},
    {word: 'LAKE', hint: 'Large body of fresh water'},
    {word: 'COAT', hint: 'Warm outer clothing'},
    {word: 'GOAT', hint: 'Farm animal with horns'},
    {word: 'BELL', hint: 'Metal object that makes ringing sound'},
    {word: 'CORN', hint: 'Yellow vegetable with kernels'},
    {word: 'WIND', hint: 'Moving air outdoors'},
    {word: 'CRAB', hint: 'Sea creature with pincers'},
    {word: 'SHIP', hint: 'Large vessel for sea travel'},
    {word: 'FROG', hint: 'Amphibian that jumps and croaks'},
    {word: 'SOUP', hint: 'Liquid food eaten with a spoon'},
    {word: 'NEST', hint: 'Bird's home'},
    {word: 'ROCK', hint: 'Hard mineral material'},
    {word: 'WOOL', hint: 'Fiber from sheep'},
    {word: 'CAVE', hint: 'Natural underground space'},
    {word: 'CHEF', hint: 'Professional cook'},
    {word: 'ROPE', hint: 'Thick cord made by twisting fibers'},
    {word: 'DRUM', hint: 'Percussion musical instrument'},
    {word: 'SALT', hint: 'White crystal used to flavor food'},
    {word: 'WOLF', hint: 'Wild animal related to dogs'},
    {word: 'VEST', hint: 'Sleeveless garment'},
    {word: 'LAMP', hint: 'Device that gives light'},
    {word: 'PEAR', hint: 'Sweet fruit with narrow top'},
    {word: 'BOWL', hint: 'Round container for food'},
    {word: 'DEER', hint: 'Forest animal with antlers'},
    {word: 'SOAP', hint: 'Cleaning product that makes bubbles'},
    {word: 'BEAN', hint: 'Seed from a pod used as food'},
    {word: 'TAPE', hint: 'Sticky material in a roll'},
    {word: 'SEED', hint: 'Small part of plant that grows'},
    {word: 'LEAF', hint: 'Green flat part of a plant'},
    {word: 'BULB', hint: 'Part of a lamp or flower'},
    {word: 'STEM', hint: 'Main stalk of a plant'},
    {word: 'FOAM', hint: 'Light material full of bubbles'},
    {word: 'ROOF', hint: 'Top covering of a building'},
    {word: 'NAIL', hint: 'Metal spike or fingertip covering'},
    {word: 'SEAL', hint: 'Marine mammal or wax stamp'},
    {word: 'PIPE', hint: 'Tube for carrying water'},
    {word: 'WORM', hint: 'Long thin soft-bodied animal'},
    {word: 'CLAY', hint: 'Soft earth material used in pottery'},
    {word: 'TOAD', hint: 'Amphibian similar to a frog'},
    {word: 'KNOT', hint: 'Fastening made by tying rope'},
    {word: 'PLUM', hint: 'Purple fruit with smooth skin'},
    {word: 'YARN', hint: 'Spun thread used for knitting'},
    {word: 'MINT', hint: 'Herb with cool-tasting leaves'},
    {word: 'HIVE', hint: 'Home for bees'},
    {word: 'CUBE', hint: 'Box with six equal square sides'},
    {word: 'PUMP', hint: 'Device for moving fluids'},
    {word: 'FORK', hint: 'Eating utensil with prongs'},
    {word: 'MASK', hint: 'Covering for the face'},
    {word: 'MOTH', hint: 'Insect similar to a butterfly'},
    {word: 'PEEL', hint: 'Outer skin of fruits'},
    {word: 'ARCH', hint: 'Curved structure spanning an opening'},
    {word: 'DART', hint: 'Small pointed missile thrown by hand'},
    {word: 'DUST', hint: 'Fine dry particles of matter'},
    {word: 'HOOK', hint: 'Curved piece of metal for catching'},
    {word: 'IRIS', hint: 'Colored part of the eye or a flower'},
    {word: 'LIME', hint: 'Green citrus fruit'},
    {word: 'MOLD', hint: 'Fungus growth or shaping container'},
    {word: 'NEST', hint: 'Structure where birds lay eggs'},
    {word: 'OVEN', hint: 'Enclosed cooking appliance'},
    {word: 'PACT', hint: 'Formal agreement'},
    {word: 'QUILT', hint: 'Warm bed covering'},
    {word: 'RUST', hint: 'Reddish coating on iron'},
    {word: 'SAIL', hint: 'Canvas sheet on a boat'},
    {word: 'TANK', hint: 'Container for liquids or military vehicle'},
    {word: 'VASE', hint: 'Container for displaying flowers'},
    {word: 'WASP', hint: 'Stinging flying insect'},
    {word: 'YARN', hint: 'Thread used for knitting'},
    {word: 'ZOOM', hint: 'Move quickly or magnify'},
    {word: 'ACID', hint: 'Sour chemical substance'},
    {word: 'BARK', hint: 'Outer covering of a tree'},
    {word: 'CLAW', hint: 'Sharp nail on animal's foot'},
    {word: 'DOCK', hint: 'Platform at water's edge'},
    {word: 'ECHO', hint: 'Sound repeated by reflection'},
    {word: 'FOAM', hint: 'Mass of small bubbles'},
    {word: 'GERM', hint: 'Microscopic organism'},
    {word: 'HAIL', hint: 'Frozen rain'},
    {word: 'INCH', hint: 'Small unit of length'},
    {word: 'JOKE', hint: 'Something said to cause laughter'},
    {word: 'KNOB', hint: 'Round handle for opening doors'},
    {word: 'LACE', hint: 'Delicate fabric with pattern of holes'},
    {word: 'MIST', hint: 'Light fog or spray'},
    {word: 'NOON', hint: 'Middle of the day'},
    {word: 'OPAL', hint: 'Colorful gemstone'},
    {word: 'PALM', hint: 'Inner surface of hand or tropical tree'},
    {word: 'QUIZ', hint: 'Test of knowledge'},
    {word: 'RAFT', hint: 'Flat floating structure'},
    {word: 'SCAR', hint: 'Mark left by healed wound'},
    {word: 'TWIG', hint: 'Small branch of a tree'},
    {word: 'UNIT', hint: 'Single thing or group'},
    {word: 'VEIN', hint: 'Blood vessel or streak in rock'},
    {word: 'WEED', hint: 'Unwanted plant'},
    {word: 'YAWN', hint: 'Open mouth wide from tiredness'},
    {word: 'ZEST', hint: 'Outer colored part of citrus peel'},
    {word: 'ATOM', hint: 'Smallest unit of an element'},
    {word: 'BEAD', hint: 'Small decorative object with a hole'},
    {word: 'COIL', hint: 'Spiral of rope or wire'},
    {word: 'DENT', hint: 'Small hollow in a surface'},
    {word: 'EDGE', hint: 'Outside limit of an object'},
    {word: 'FLAP', hint: 'Something that hangs loose and moves'},
    {word: 'GLOW', hint: 'Emit steady light'},
    {word: 'HEAP', hint: 'Pile of things'},
    {word: 'IRON', hint: 'Metal element or pressing tool'},
    {word: 'JUNK', hint: 'Discarded items of little use'},
    {word: 'KEEL', hint: 'Bottom part of a ship's structure'},
    {word: 'LENS', hint: 'Curved piece of glass'},
    {word: 'MAZE', hint: 'Complex network of paths'},
    {word: 'NOOK', hint: 'Small corner or recess'},
    {word: 'OVAL', hint: 'Egg-shaped figure'},
    {word: 'POLE', hint: 'Long slender piece of wood or metal'},
    {word: 'QUAY', hint: 'Platform by water for loading ships'},
    {word: 'RAMP', hint: 'Sloping surface connecting different levels'},
    {word: 'SLED', hint: 'Vehicle that slides over snow'},
    {word: 'TRAY', hint: 'Flat receptacle for carrying things'},
    {word: 'URGE', hint: 'Strong desire or impulse'},
    {word: 'VINE', hint: 'Climbing or trailing plant'},
    {word: 'WAVE', hint: 'Moving ridge on water surface'},
    {word: 'YARN', hint: 'Continuous strand of twisted fibers'},
    {word: 'ZERO', hint: 'Number representing none'},
    {word: 'ARCH', hint: 'Curved structure'},
    {word: 'BEAM', hint: 'Ray of light or structural support'},
    {word: 'COAL', hint: 'Black fossil fuel'},
    {word: 'DICE', hint: 'Small cubes used in games'},
    {word: 'ETCH', hint: 'Cut into a surface'},
    {word: 'FERN', hint: 'Plant with feathery leaves'},
    {word: 'GLUE', hint: 'Sticky substance for bonding'},
    {word: 'HOOP', hint: 'Circular ring'},
    {word: 'ICON', hint: 'Symbol or representation'},
    {word: 'JADE', hint: 'Green gemstone'},
    {word: 'KELP', hint: 'Large seaweed'},
    {word: 'LAVA', hint: 'Molten rock from volcano'},
    {word: 'MANE', hint: 'Long hair on neck of horse or lion'},
    {word: 'NEST', hint: 'Bird's home'},
    {word: 'OATS', hint: 'Cereal grain'},
    {word: 'PEAK', hint: 'Pointed top of mountain'},
    {word: 'QUIP', hint: 'Clever remark'},
    {word: 'REED', hint: 'Tall grass-like plant'},
    {word: 'SASH', hint: 'Decorative band worn around waist'},
    {word: 'TUSK', hint: 'Long pointed tooth'},
    {word: 'UNDO', hint: 'Reverse an action'},
    {word: 'VASE', hint: 'Decorative container for flowers'},
    {word: 'WICK', hint: 'String in candle that burns'},
    {word: 'YARN', hint: 'Fiber for knitting'},
    {word: 'ZINC', hint: 'Metallic element'},
    {word: 'AURA', hint: 'Distinctive atmosphere or quality'},
    {word: 'BOLT', hint: 'Metal fastener or lightning strike'},
    {word: 'COVE', hint: 'Small sheltered bay'},
    {word: 'DUSK', hint: 'Time before nightfall'},
    {word: 'ELBOW', hint: 'Joint in the middle of arm'},
    {word: 'FLINT', hint: 'Hard stone used to make fire'},
    {word: 'GRILL', hint: 'Cooking device with metal bars'},
    {word: 'HATCH', hint: 'Opening or emerge from egg'},
    {word: 'IGLOO', hint: 'Dome-shaped snow house'},
    {word: 'JEWEL', hint: 'Precious stone'},
    {word: 'KAYAK', hint: 'Small narrow watercraft'},
    {word: 'LOTUS', hint: 'Water lily with floating leaves'},
    {word: 'MAPLE', hint: 'Tree with distinctive leaf'},
    {word: 'NICKEL', hint: 'Five-cent coin or metallic element'},
    {word: 'ONION', hint: 'Layered vegetable that makes eyes water'},
    {word: 'PRISM', hint: 'Transparent object that splits light'},
    {word: 'QUILT', hint: 'Multi-layered bedcover'},
    {word: 'RADAR', hint: 'System using radio waves to detect objects'},
    {word: 'SQUID', hint: 'Sea creature with ten arms'},
    {word: 'TULIP', hint: 'Spring flower with cup-shaped bloom'},
    {word: 'UTOPIA', hint: 'Imagined perfect place'},
    {word: 'VAPOR', hint: 'Gas form of a substance'},
    {word: 'WHALE', hint: 'Large marine mammal'},
    {word: 'YACHT', hint: 'Recreational sailing vessel'},
    {word: 'ZEBRA', hint: 'Black and white striped animal'},
    {word: 'AMBER', hint: 'Fossilized tree resin'},
    {word: 'BLOOM', hint: 'Flower or flourishing state'},
    {word: 'CORAL', hint: 'Marine organism forming reefs'},
    {word: 'DELTA', hint: 'Triangular area at river mouth'},
    {word: 'EMBER', hint: 'Glowing coal in dying fire'},
    {word: 'FLUTE', hint: 'Wind musical instrument'},
    {word: 'GRAVY', hint: 'Sauce made from meat juices'},
    {word: 'HEDGE', hint: 'Row of bushes forming boundary'},
    {word: 'IVORY', hint: 'Hard white material from tusks'},
    {word: 'JELLY', hint: 'Soft, semi-solid food'},
    {word: 'KOALA', hint: 'Australian marsupial that eats eucalyptus'},
    {word: 'LINEN', hint: 'Fabric made from flax'},
    {word: 'MOOSE', hint: 'Large deer with broad antlers'},
    {word: 'NINJA', hint: 'Japanese warrior skilled in stealth'},
    {word: 'OPERA', hint: 'Musical drama with singing'},
    {word: 'PANDA', hint: 'Black and white bear from China'},
    {word: 'QUILL', hint: 'Feather used as writing pen'},
    {word: 'RAVEN', hint: 'Large black bird'},
    {word: 'STRAW', hint: 'Dried stalks of grain or drinking tube'},
    {word: 'THORN', hint: 'Sharp pointed growth on plant'},
    {word: 'UMPIRE', hint: 'Person who enforces rules in sports'},
    {word: 'VOWEL', hint: 'A, E, I, O, U in alphabet'},
    {word: 'WALNUT', hint: 'Wrinkled edible nut'},
    {word: 'XYLOPHONE', hint: 'Musical instrument with wooden bars'},
    {word: 'YOGURT', hint: 'Fermented dairy product'},
    {word: 'ANCHOR', hint: 'Device that holds ship in place'},
    {word: 'BREEZE', hint: 'Gentle wind'},
    {word: 'CANVAS', hint: 'Strong cloth for painting or sails'},
    {word: 'DIAMOND', hint: 'Precious gemstone'},
    {word: 'ECLIPSE', hint: 'Blocking of light from one celestial body'},
    {word: 'FOSSIL', hint: 'Preserved remains of ancient organism'},
    {word: 'GLACIER', hint: 'Slow-moving mass of ice'},
    {word: 'HORIZON', hint: 'Line where earth meets sky'},
    {word: 'INSECT', hint: 'Small invertebrate animal with six legs'},
    {word: 'JASMINE', hint: 'Fragrant flowering plant'},
    {word: 'KANGAROO', hint: 'Australian animal that hops'},
    {word: 'LANTERN', hint: 'Portable light with protective case'},
    {word: 'MAGNET', hint: 'Object that attracts iron'},
    {word: 'NECKLACE', hint: 'Jewelry worn around neck'},
    {word: 'OCTOPUS', hint: 'Sea creature with eight arms'},
    {word: 'PEACOCK', hint: 'Male bird with colorful tail feathers'},
    {word: 'QUARTER', hint: 'Twenty-five cents or one-fourth'},
    {word: 'RAINBOW', hint: 'Arc of colors in the sky'},
    {word: 'SCISSORS', hint: 'Cutting tool with two blades'},
    {word: 'TORNADO', hint: 'Violent rotating column of air'},
    {word: 'UMBRELLA', hint: 'Device that protects from rain'},
    {word: 'VOLCANO', hint: 'Mountain that erupts lava'},
    {word: 'WHISTLE', hint: 'Device that makes high-pitched sound'},
    {word: 'XYLOPHONE', hint: 'Percussion instrument with wooden bars'},
    {word: 'YESTERDAY', hint: 'Day before today'},
    {word: 'ZUCCHINI', hint: 'Green summer squash'},
    {word: 'AIRPLANE', hint: 'Flying vehicle with wings'},
    {word: 'BUTTERFLY', hint: 'Insect with colorful wings'},
    {word: 'CALENDAR', hint: 'System for organizing days and months'},
    {word: 'DINOSAUR', hint: 'Extinct reptile from millions of years ago'},
    {word: 'ELEPHANT', hint: 'Large animal with trunk and tusks'},
    {word: 'FLAMINGO', hint: 'Pink wading bird that stands on one leg'},
    {word: 'GIRAFFE', hint: 'Tall animal with long neck'},
    {word: 'HOSPITAL', hint: 'Building where sick people are treated'},
    {word: 'IGUANA', hint: 'Large lizard with spines'},
    {word: 'JELLYFISH', hint: 'Sea creature with tentacles'},
    {word: 'KANGAROO', hint: 'Animal that carries babies in pouch'},
    {word: 'LIBRARY', hint: 'Place with many books to borrow'},
    {word: 'MOUNTAIN', hint: 'Very high landform with peak'},
    {word: 'NOODLES', hint: 'Long thin strips of pasta'},
    {word: 'OCTAGON', hint: 'Shape with eight sides'},
    {word: 'PENGUIN', hint: 'Black and white bird that cannot fly'},
    {word: 'QUESTION', hint: 'Sentence asking for information'},
    {word: 'RAINBOW', hint: 'Colorful arc in sky after rain'},
    {word: 'SANDWICH', hint: 'Food with filling between bread slices'},
    {word: 'TELESCOPE', hint: 'Instrument for viewing distant objects'},
    {word: 'UNICORN', hint: 'Mythical horse with single horn'},
    {word: 'VACATION', hint: 'Period of time for rest and travel'},
    {word: 'WATERFALL', hint: 'Water flowing over edge of cliff'},
    {word: 'XYLOPHONE', hint: 'Musical instrument with wooden bars'},
    {word: 'YOGURT', hint: 'Creamy fermented milk food'},
    {word: 'ZIPPER', hint: 'Device with interlocking teeth for fastening'},
    {word: 'ALLIGATOR', hint: 'Large reptile similar to crocodile'},
    {word: 'BLUEBERRY', hint: 'Small round blue fruit'},
    {word: 'CHOCOLATE', hint: 'Sweet food made from cocoa'},
    {word: 'DRAGONFLY', hint: 'Insect with transparent wings'},
    {word: 'EVERGREEN', hint: 'Tree that keeps leaves all year'},
    {word: 'FIREPLACE', hint: 'Structure where indoor fire is made'},
    {word: 'GRASSHOPPER', hint: 'Jumping insect that makes chirping sounds'},
    {word: 'HAMBURGER', hint: 'Sandwich with ground meat patty'},
    {word: 'INSTRUMENT', hint: 'Tool for making music'},
    {word: 'JELLYBEAN', hint: 'Small bean-shaped candy'},
    {word: 'KEYBOARD', hint: 'Set of keys for typing or playing music'},
    {word: 'LIGHTHOUSE', hint: 'Tower with light to guide ships'},
    {word: 'MICROPHONE', hint: 'Device that amplifies your voice'},
    {word: 'NEWSPAPER', hint: 'Printed publication with news'},
    {word: 'ORCHESTRA', hint: 'Large group of musicians'},
    {word: 'PINEAPPLE', hint: 'Tropical fruit with spiky top'},
       {word: 'QUICKSAND', hint: 'Dangerous loose wet sand that sucks things down'},
    {word: 'RECTANGLE', hint: 'Shape with four sides and four right angles'},
    {word: 'STRAWBERRY', hint: 'Red fruit with seeds on outside'},
    {word: 'TELESCOPE', hint: 'Instrument for viewing distant objects'},
    {word: 'UMBRELLA', hint: 'Device that protects from rain or sun'},
    {word: 'VEGETABLE', hint: 'Plant part eaten as food'},
    {word: 'WATERMELON', hint: 'Large fruit with green rind and red flesh'},
    {word: 'XYLOPHONE', hint: 'Musical instrument with wooden bars struck by mallets'},
    {word: 'YESTERDAY', hint: 'The day before today'},
    {word: 'ZOOKEEPER', hint: 'Person who cares for animals in a zoo'},
    {word: 'ADVENTURE', hint: 'Exciting or unusual experience'},
    {word: 'BUTTERFLY', hint: 'Insect with colorful wings'},
    {word: 'CROCODILE', hint: 'Large reptile with powerful jaws'},
    {word: 'DETECTIVE', hint: 'Person who investigates crimes'},
    {word: 'ELEPHANT', hint: 'Largest land mammal with trunk'},
    {word: 'FURNITURE', hint: 'Movable objects in a room'},
    {word: 'GRASSLAND', hint: 'Large area covered with grass'},
    {word: 'HAPPINESS', hint: 'Feeling of joy or contentment'},
    {word: 'INVISIBLE', hint: 'Cannot be seen'},
    {word: 'JELLYFISH', hint: 'Sea creature with tentacles'},
    {word: 'KANGAROO', hint: 'Australian animal that hops'},
    {word: 'LEMONADE', hint: 'Drink made from lemons and sugar'},
    {word: 'MUSHROOM', hint: 'Fungus with cap and stem'},
    {word: 'NIGHTTIME', hint: 'Period of darkness when sun is down'},
    {word: 'OCTOPUS', hint: 'Sea animal with eight arms'},
    {word: 'PARACHUTE', hint: 'Device for slowing fall through air'},
    {word: 'QUESTION', hint: 'Sentence that asks for information'},
    {word: 'RAINCOAT', hint: 'Waterproof jacket for wet weather'},
    {word: 'SANDWICH', hint: 'Food with filling between bread'},
    {word: 'TRIANGLE', hint: 'Shape with three sides'},
    {word: 'UNIVERSE', hint: 'All of space and everything in it'},
    {word: 'VACATION', hint: 'Period of time for travel or rest'},
    {word: 'WHISKERS', hint: 'Hair growing on animal's face'},
    {word: 'XYLOPHONE', hint: 'Musical instrument with wooden bars'},
    {word: 'YOGHURT', hint: 'Fermented milk product'},
    {word: 'ZUCCHINI', hint: 'Green summer squash vegetable'},
    {word: 'ASTRONAUT', hint: 'Person who travels in space'},
    {word: 'BACKPACK', hint: 'Bag carried on your back'},
    {word: 'CAMPFIRE', hint: 'Outdoor fire for cooking or warmth'},
    {word: 'DINOSAUR', hint: 'Extinct prehistoric reptile'},
    {word: 'ELEVATOR', hint: 'Moving compartment between floors'},
    {word: 'FESTIVAL', hint: 'Celebration or special event'},
    {word: 'GRAPEFRUIT', hint: 'Large citrus fruit'},
    {word: 'HOSPITAL', hint: 'Building where sick people are treated'},
    {word: 'INTERNET', hint: 'Global computer network'},
    {word: 'JACKFRUIT', hint: 'Large tropical fruit'},
    {word: 'KILOMETER', hint: 'Unit of distance (1000 meters)'},
    {word: 'LULLABY', hint: 'Gentle song to help babies sleep'},
    {word: 'MOSQUITO', hint: 'Small flying insect that bites'},
    {word: 'NOTEBOOK', hint: 'Book with blank pages for writing'},
    {word: 'OBSTACLE', hint: 'Something that blocks your way'},
    {word: 'PANCAKES', hint: 'Flat cakes cooked in a pan'},
    {word: 'QUICKSAND', hint: 'Deep wet sand that traps things'},
    {word: 'RAINFOREST', hint: 'Dense forest with high rainfall'},
    {word: 'SUBMARINE', hint: 'Vessel that travels underwater'},
    {word: 'TELEPHONE', hint: 'Device used for talking to people far away'},
    {word: 'UNICYCLE', hint: 'One-wheeled vehicle'},
    {word: 'VOLCANO', hint: 'Mountain that can erupt'},
    {word: 'WINDMILL', hint: 'Building with sails turned by wind'},
    {word: 'XYLOPHONE', hint: 'Percussion instrument with wooden bars'},
    {word: 'YESTERDAY', hint: 'Day before today'},
    {word: 'ZOOLOGIST', hint: 'Scientist who studies animals'},
    {word: 'ACROBAT', hint: 'Person who performs gymnastic feats'},
    {word: 'BIRTHDAY', hint: 'Anniversary of the day you were born'},
    {word: 'CARNIVAL', hint: 'Traveling amusement show'},
    {word: 'DOLPHIN', hint: 'Intelligent marine mammal'},
    {word: 'EARRING', hint: 'Jewelry worn on ears'},
    {word: 'FOUNTAIN', hint: 'Ornamental water feature'},
    {word: 'GORILLA', hint: 'Large powerful ape'},
    {word: 'HAIRCUT', hint: 'Trimming or styling of hair'},
    {word: 'ICEBERG', hint: 'Large floating mass of ice'},
    {word: 'JEWELRY', hint: 'Decorative items worn on body'},
    {word: 'KEYBOARD', hint: 'Set of keys for typing or playing music'},
    {word: 'LANTERN', hint: 'Portable light with protective case'},
    {word: 'MEDICINE', hint: 'Substance used to treat illness'},
    {word: 'NECKLACE', hint: 'Ornament worn around neck'},
    {word: 'OBSTACLE', hint: 'Thing that blocks your way'},
    {word: 'POPCORN', hint: 'Snack made from heated corn kernels'},
    {word: 'QUARREL', hint: 'Angry argument or disagreement'},
    {word: 'RACCOON', hint: 'Mammal with black mask-like face marking'},
    {word: 'SAILBOAT', hint: 'Boat propelled by wind'},
    {word: 'TOOTHBRUSH', hint: 'Tool for cleaning teeth'},
    {word: 'UNIFORM', hint: 'Standard clothing worn by group members'},
    {word: 'VAMPIRE', hint: 'Mythical creature that drinks blood'},
    {word: 'WEEKEND', hint: 'Saturday and Sunday'},
    {word: 'YOGURT', hint: 'Fermented dairy product'},
    {word: 'ALPHABET', hint: 'Set of letters used in language'},
    {word: 'BALLOON', hint: 'Inflated rubber bag'},
    {word: 'CAMERA', hint: 'Device for taking photographs'},
    {word: 'DIAMOND', hint: 'Precious gemstone'},
    {word: 'ENVELOPE', hint: 'Paper container for letters'},
    {word: 'FEATHER', hint: 'Light growth covering birds'},
    {word: 'GARBAGE', hint: 'Waste material to be thrown away'},
    {word: 'HAMMOCK', hint: 'Swinging bed suspended between supports'},
    {word: 'INSECT', hint: 'Small invertebrate animal with six legs'},
    {word: 'JOURNEY', hint: 'Travel from one place to another'},
    {word: 'KITCHEN', hint: 'Room where food is prepared'},
    {word: 'LEATHER', hint: 'Material made from animal skin'},
    {word: 'MAGICIAN', hint: 'Person who performs magic tricks'},
    {word: 'NOODLES', hint: 'Long thin strips of pasta'},
    {word: 'OSTRICH', hint: 'Large flightless bird'},
    {word: 'PERFUME', hint: 'Fragrant liquid worn on body'},
    {word: 'QUARTER', hint: 'One fourth of something'},
    {word: 'RAINBOW', hint: 'Arc of colors in the sky after rain'},
    {word: 'SNOWMAN', hint: 'Figure made from snow'},
    {word: 'THUNDER', hint: 'Loud sound that follows lightning'},
    {word: 'UKULELE', hint: 'Small four-stringed guitar'},
    {word: 'VICTORY', hint: 'Success in contest or struggle'},
    {word: 'WHISTLE', hint: 'Device that makes high-pitched sound'},
    {word: 'YOGURT', hint: 'Fermented milk food'},
    {word: 'AIRPORT', hint: 'Place where airplanes take off and land'},
    {word: 'BICYCLE', hint: 'Two-wheeled vehicle'},
    {word: 'COMPASS', hint: 'Instrument showing directions'},
    {word: 'DOORBELL', hint: 'Button that rings to signal arrival'},
    {word: 'EARPHONES', hint: 'Small speakers worn on ears'},
    {word: 'FIREWORKS', hint: 'Explosive devices for display'},
    {word: 'GOLDFISH', hint: 'Small orange aquarium fish'},
    {word: 'HIGHWAY', hint: 'Main public road'},
    {word: 'ICECREAM', hint: 'Frozen dairy dessert'},
    {word: 'JUGGLER', hint: 'Person who tosses objects in the air'},
    {word: 'KETCHUP', hint: 'Tomato-based condiment'},
    {word: 'LOBSTER', hint: 'Large marine crustacean'},
    {word: 'MAILBOX', hint: 'Container for receiving mail'},
    {word: 'NAPKIN', hint: 'Small cloth for wiping mouth'},
    {word: 'OATMEAL', hint: 'Breakfast food made from oats'},
    {word: 'PAJAMAS', hint: 'Clothes worn for sleeping'},
    {word: 'QUICKSAND', hint: 'Wet sand that objects sink into'},
    {word: 'RAILWAY', hint: 'Track for trains'},
    {word: 'SEESAW', hint: 'Playground equipment that goes up and down'},
    {word: 'TEAPOT', hint: 'Container for brewing tea'},
    {word: 'UMBRELLA', hint: 'Device that protects from rain'},
    {word: 'VITAMIN', hint: 'Nutrient needed in small amounts'},
    {word: 'WEBSITE', hint: 'Collection of pages on internet'},
    {word: 'XYLOPHONE', hint: 'Percussion instrument with wooden bars'},
    {word: 'YARDSTICK', hint: 'Measuring tool three feet long'},
    {word: 'ZIPPER', hint: 'Fastener with interlocking teeth'},
    {word: 'APRICOT', hint: 'Small orange fruit'},
    {word: 'BLANKET', hint: 'Covering used on bed for warmth'},
    {word: 'CACTUS', hint: 'Desert plant with spines'},
    {word: 'DOMINO', hint: 'Small rectangular tile for games'},
    {word: 'ECLIPSE', hint: 'Blocking of light from one celestial body'},
    {word: 'FRISBEE', hint: 'Flying disc thrown for recreation'},
    {word: 'GLACIER', hint: 'Large mass of ice moving slowly'},
    {word: 'HAIRPIN', hint: 'Small pin for holding hair in place'},
    {word: 'ISLAND', hint: 'Land surrounded by water'},
    {word: 'JIGSAW', hint: 'Puzzle with interlocking pieces'},
    {word: 'KENNEL', hint: 'House for a dog'},
    {word: 'LOLLIPOP', hint: 'Sweet on a stick'},
    {word: 'MITTEN', hint: 'Hand covering with section for thumb only'},
    {word: 'NEEDLE', hint: 'Thin pointed tool for sewing'},
    {word: 'OYSTER', hint: 'Shellfish that can produce pearls'},
    {word: 'PUMPKIN', hint: 'Large orange squash'},
    {word: 'QUILT', hint: 'Thick bedcover with padding'},
    {word: 'RIBBON', hint: 'Narrow strip of fabric for decoration'},
    {word: 'STATUE', hint: 'Sculpture of person or animal'},
    {word: 'TRUMPET', hint: 'Brass musical instrument'},
    {word: 'UNICORN', hint: 'Mythical horse with single horn'},
    {word: 'VOLCANO', hint: 'Mountain that erupts'},
    {word: 'WALNUT', hint: 'Edible nut with wrinkled shell'},
    {word: 'YOGURT', hint: 'Fermented milk product'},
    {word: 'ZEBRA', hint: 'Black and white striped animal'},
    {word: 'AUTUMN', hint: 'Season between summer and winter'},
    {word: 'BUBBLE', hint: 'Sphere of liquid enclosing air'},
    {word: 'CRAYON', hint: 'Colored wax stick for drawing'},
    {word: 'DONKEY', hint: 'Animal related to horse with long ears'},
    {word: 'ERASER', hint: 'Object used to remove pencil marks'},
    {word: 'FARMER', hint: 'Person who works on a farm'},
    {word: 'GLOVES', hint: 'Hand coverings with separate fingers'},
    {word: 'HAMMER', hint: 'Tool for driving nails'},
    {word: 'IGLOO', hint: 'Dome-shaped snow house'},
    {word: 'JACKET', hint: 'Short coat'},
    {word: 'KETTLE', hint: 'Container for boiling water'},
    {word: 'LEMON', hint: 'Yellow citrus fruit'},
    {word: 'MAGNET', hint: 'Object that attracts iron'},
    {word: 'NICKEL', hint: 'Five-cent coin'},
    {word: 'ORANGE', hint: 'Round citrus fruit'},
    {word: 'PEPPER', hint: 'Spice that makes you sneeze'},
    {word: 'QUIVER', hint: 'Container for arrows'},
    {word: 'ROCKET', hint: 'Vehicle that travels into space'},
    {word: 'SADDLE', hint: 'Seat for rider on horse'},
    {word: 'TICKET', hint: 'Printed slip showing payment'},
    {word: 'UNCLE', hint: 'Brother of your parent'},
    {word: 'VIOLIN', hint: 'Stringed musical instrument'},
    {word: 'WINDOW', hint: 'Opening in wall with glass'},
    {word: 'YELLOW', hint: 'Color of bananas and lemons'},
    {word: 'ZOMBIE', hint: 'Walking dead person in stories'},
    {word: 'ACORN', hint: 'Seed of an oak tree'},
    {word: 'BRUSH', hint: 'Tool with bristles'},
    {word: 'CLOCK', hint: 'Device that shows time'},
    {word: 'DAISY', hint: 'White flower with yellow center'},
    {word: 'EAGLE', hint: 'Large bird of prey'},
    {word: 'FUDGE', hint: 'Soft sweet chocolate candy'},
    {word: 'GOOSE', hint: 'Large waterfowl with long neck'},
    {word: 'HONEY', hint: 'Sweet food made by bees'},
    {word: 'IGLOO', hint: 'Snow house'},
    {word: 'JEWEL', hint: 'Precious stone'},
    {word: 'KOALA', hint: 'Australian animal that eats eucalyptus'},
    {word: 'LEMON', hint: 'Sour yellow fruit'},
    {word: 'MELON', hint: 'Sweet juicy fruit with thick rind'},
    {word: 'NURSE', hint: 'Person who cares for sick people'},
    {word: 'OCEAN', hint: 'Vast body of saltwater'},
    {word: 'PEACH', hint: 'Soft juicy fruit with fuzzy skin'},
    {word: 'QUEEN', hint: 'Female ruler of a country'},
    {word: 'RULER', hint: 'Tool for measuring or drawing straight lines'},
    {word: 'SUGAR', hint: 'Sweet crystalline substance'},
    {word: 'TIGER', hint: 'Large wild cat with stripes'},
    {word: 'USHER', hint: 'Person who shows people to seats'},
    {word: 'VAULT', hint: 'Secure storage for valuables'},
    {word: 'WAGON', hint: 'Four-wheeled vehicle pulled by animal'},
    {word: 'XEROX', hint: 'Brand name for photocopier'},
    {word: 'YACHT', hint: 'Recreational sailing vessel'},
    {word: 'ZESTY', hint: 'Full of flavor or enthusiasm'},
    {word: 'ALARM', hint: 'Device that warns or alerts'},
    {word: 'BAGEL', hint: 'Ring-shaped bread roll'},
    {word: 'CAMEL', hint: 'Desert animal with humps'},
    {word: 'DENIM', hint: 'Sturdy cotton fabric for jeans'},
    {word: 'EAGLE', hint: 'Large bird with hooked beak'},
    {word: 'FENCE', hint: 'Structure enclosing an area'},
    {word: 'GRAPE', hint: 'Small round fruit growing in clusters'},
    {word: 'HOTEL', hint: 'Building offering rooms to travelers'},
    {word: 'IMAGE', hint: 'Picture or representation'},
    {word: 'JUICE', hint: 'Liquid from fruits or vegetables'},
    {word: 'KIOSK', hint: 'Small stand selling goods'},
    {word: 'LINEN', hint: 'Fabric made from flax'},
    {word: 'MOTEL', hint: 'Roadside hotel for motorists'},
    {word: 'NOVEL', hint: 'Long fictional story in book form'},
    {word: 'OLIVE', hint: 'Small oval fruit used for oil'},
    {word: 'PIANO', hint: 'Musical instrument with keys'},
    {word: 'QUAIL', hint: 'Small ground-dwelling bird'},
    {word: 'RADIO', hint: 'Device receiving broadcast signals'},
    {word: 'STOVE', hint: 'Appliance for cooking food'},
    {word: 'TOWEL', hint: 'Absorbent cloth for drying'},
    {word: 'URBAN', hint: 'Relating to a city'},
    {word: 'VAPOR', hint: 'Moisture suspended in air'},
    {word: 'WAFER', hint: 'Thin crisp cookie'},
    {word: 'XENON', hint: 'Chemical element used in lights'},
    {word: 'YACHT', hint: 'Luxury sailing vessel'},
    {word: 'ZEBRA', hint: 'African animal with black and white stripes'},
    {word: 'ANKLE', hint: 'Joint between foot and leg'},
    {word: 'BEACH', hint: 'Sandy shore by ocean'},
    {word: 'CANDY', hint: 'Sweet sugary treat'},
    {word: 'DANCE', hint: 'Move rhythmically to music'},
    {word: 'ELBOW', hint: 'Joint in middle of arm'},
    {word: 'FAIRY', hint: 'Magical tiny being with wings'},
    {word: 'GHOST', hint: 'Spirit of dead person'},
    {word: 'HEART', hint: 'Organ that pumps blood'},
    {word: 'IVORY', hint: 'Hard white material from tusks'},
    {word: 'JEANS', hint: 'Pants made from denim'},
    {word: 'KIWI', hint: 'Fuzzy brown fruit with green flesh'},
    {word: 'LEMON', hint: 'Sour yellow citrus fruit'},
    {word: 'MANGO', hint: 'Tropical fruit with orange flesh'},
    {word: 'NORTH', hint: 'Direction toward the North Pole'},
    {word: 'OPERA', hint: 'Musical drama with singing'},
    {word: 'PASTA', hint: 'Italian food made from dough'},
    {word: 'QUIET', hint: 'Making little or no noise'},
    {word: 'ROBIN', hint: 'Small bird with red breast'},
    {word: 'SCARF', hint: 'Fabric worn around neck'},
    {word: 'TULIP', hint: 'Spring flower with cup-shaped bloom'},
    {word: 'UNCLE', hint: 'Brother of your parent'},
    {word: 'VOICE', hint: 'Sound made when speaking'},
    {word: 'WATCH', hint: 'Device worn to tell time'},
    {word: 'XEROX', hint: 'Make a photocopy'},
    {word: 'YOUTH', hint: 'Period between childhood and adult age'},
    {word: 'ZEBRA', hint: 'Animal with black and white stripes'},
    {word: 'APPLE', hint: 'Round fruit, often red or green'},
    {word: 'BREAD', hint: 'Baked food made from flour'},
    {word: 'CHAIR', hint: 'Furniture for sitting'},
    {word: 'DREAM', hint: 'Images and thoughts during sleep'},
    {word: 'EARTH', hint: 'Planet we live on'},
    {word: 'FLUTE', hint: 'Wind musical instrument'},
    {word: 'GLOVE', hint: 'Covering for the hand'},
    {word: 'HORSE', hint: 'Large four-legged animal for riding'},
    {word: 'IMAGE', hint: 'Visual representation'},
    {word: 'JELLY', hint: 'Soft, semi-solid food'},
    {word: 'KNIFE', hint: 'Cutting tool with blade'},
    {word: 'LIGHT', hint: 'Brightness that lets us see'},
    {word: 'MUSIC', hint: 'Sounds organized to be pleasant'},
    {word: 'NIGHT', hint: 'Time of darkness when sun is down'},
    {word: 'OCEAN', hint: 'Vast body of salt water'},
    {word: 'PLANT', hint: 'Living organism that grows in soil'},
    {word: 'QUEEN', hint: 'Female ruler of a country'},
    {word: 'RIVER', hint: 'Large natural stream of water'},
    {word: 'SMILE', hint: 'Happy facial expression'},
    {word: 'TIGER', hint: 'Large wild cat with stripes'},
    {word: 'UNDER', hint: 'Below or beneath something'},
    {word: 'VOICE', hint: 'Sound made when speaking'},
    {word: 'WATER', hint: 'Clear liquid essential for life'},
    {word: 'XEROX', hint: 'Make a copy of a document'},
    {word: 'YOUNG', hint: 'In early stage of life'},
    {word: 'ZESTY', hint: 'Having a strong, pleasant flavor'}
];
     
            // } else {
            //     words = [
            //         {word: 'science', hint: 'Study of the natural world'},
            //         {word: 'computer', hint: 'Electronic device for work and games'},
            //         {word: 'mountain', hint: 'Very tall landform'},
            //         {word: 'adventure', hint: 'An exciting experience'},
            //         {word: 'knowledge', hint: 'Information and skills gained through experience'}
            //     ];
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
                this.currentScore += 3;
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
            // } else if (grade === '2' || grade === '3') {
            }else {
const words = [
    {word: 'SCHOOL', hint: 'Where you learn'},
    {word: 'FRIEND', hint: 'Someone you like to play with'},
    {word: 'PLANET', hint: 'Earth is one of these'},
    {word: 'ANIMAL', hint: 'Living creatures like dogs and cats'},
    {word: 'GARDEN', hint: 'Where plants and flowers grow'},
    {word: 'PENCIL', hint: 'Writing tool with lead inside'},
    {word: 'BANANA', hint: 'Yellow curved fruit'},
    {word: 'WINDOW', hint: 'Glass opening in a wall'},
    {word: 'JACKET', hint: 'Clothing worn to stay warm'},
    {word: 'PUZZLE', hint: 'Game with pieces to fit together'},
    {word: 'ORANGE', hint: 'Citrus fruit that shares name with a color'},
    {word: 'GUITAR', hint: 'Musical instrument with strings'},
    {word: 'PILLOW', hint: 'Soft cushion for your head'},
    {word: 'ROCKET', hint: 'Vehicle that travels to space'},
    {word: 'CASTLE', hint: 'Large building where kings and queens live'},
    {word: 'BRIDGE', hint: 'Structure built over rivers or roads'},
    {word: 'COOKIE', hint: 'Sweet baked treat'},
    {word: 'TURTLE', hint: 'Reptile with a shell'},
    {word: 'DOCTOR', hint: 'Person who helps sick people'},
    {word: 'WINTER', hint: 'Cold season with snow'},
    {word: 'SUMMER', hint: 'Warm season for swimming'},
    {word: 'CAMERA', hint: 'Device used to take pictures'},
    {word: 'POTATO', hint: 'Vegetable that grows underground'},
    {word: 'BASKET', hint: 'Container woven from flexible materials'},
    {word: 'RABBIT', hint: 'Animal with long ears that hops'},
    {word: 'CIRCUS', hint: 'Traveling show with performers and animals'},
    {word: 'MUSEUM', hint: 'Building where art and artifacts are displayed'},
    {word: 'BUTTER', hint: 'Dairy product spread on bread'},
    {word: 'ISLAND', hint: 'Land surrounded by water'},
    {word: 'JUNGLE', hint: 'Dense tropical forest'},
    {word: 'BOTTLE', hint: 'Container for liquids'},
    {word: 'DRAGON', hint: 'Mythical fire-breathing creature'},
    {word: 'MARKET', hint: 'Place where goods are bought and sold'},
    {word: 'HELMET', hint: 'Protective gear for your head'},
    {word: 'PENCIL', hint: 'Tool used for writing or drawing'},
    {word: 'FOREST', hint: 'Large area covered with trees'},
    {word: 'SOCCER', hint: 'Sport played with a round ball and feet'},
    {word: 'SPIDER', hint: 'Eight-legged creature that spins webs'},
    {word: 'CHEESE', hint: 'Dairy food often used on pizza'},
    {word: 'FLOWER', hint: 'Colorful part of a plant'},
    {word: 'WALLET', hint: 'Small case for carrying money'},
    {word: 'COFFEE', hint: 'Hot beverage made from beans'},
    {word: 'KITTEN', hint: 'Baby cat'},
    {word: 'PURPLE', hint: 'Color between red and blue'},
    {word: 'TENNIS', hint: 'Sport played with rackets and a ball'},
    {word: 'CARPET', hint: 'Floor covering made of fabric'},
    {word: 'MIRROR', hint: 'Surface that reflects your image'},
    {word: 'LEMON', hint: 'Sour yellow citrus fruit'},
    {word: 'SAILOR', hint: 'Person who works on a ship'},
    {word: 'PUPPET', hint: 'Toy figure moved by strings or hands'},
    {word: 'HOCKEY', hint: 'Sport played on ice with sticks'},
    {word: 'CANDLE', hint: 'Wax stick with wick that provides light'},
    {word: 'HAMMER', hint: 'Tool used to drive nails'},
    {word: 'TURKEY', hint: 'Large bird eaten at Thanksgiving'},
    {word: 'DESERT', hint: 'Hot, dry area with sand'},
    {word: 'LADDER', hint: 'Tool for climbing up and down'},
    {word: 'CARROT', hint: 'Orange vegetable that rabbits like'},
    {word: 'BUTTON', hint: 'Small disc used to fasten clothes'},
    {word: 'POLICE', hint: 'People who enforce laws'},
    {word: 'JACKET', hint: 'Outer garment with sleeves'},
    {word: 'DINNER', hint: 'Evening meal'},
    {word: 'TIGER', hint: 'Large striped wild cat'},
    {word: 'MUSIC', hint: 'Sounds organized to be pleasant'},
    {word: 'RIVER', hint: 'Large natural stream of water'},
    {word: 'PIZZA', hint: 'Italian dish with cheese and toppings'},
    {word: 'BEACH', hint: 'Sandy shore by the ocean'},
    {word: 'TRUCK', hint: 'Large vehicle for carrying goods'},
    {word: 'QUEEN', hint: 'Female ruler of a kingdom'},
    {word: 'APPLE', hint: 'Round fruit, often red or green'},
    {word: 'HOUSE', hint: 'Building where people live'},
    {word: 'CLOCK', hint: 'Device that shows the time'},
    {word: 'CHAIR', hint: 'Furniture for sitting'},
    {word: 'WATER', hint: 'Clear liquid essential for life'},
    {word: 'TRAIN', hint: 'Vehicle that runs on tracks'},
    {word: 'CLOUD', hint: 'White fluffy thing in the sky'},
    {word: 'BREAD', hint: 'Baked food made from flour'},
    {word: 'SNAKE', hint: 'Reptile with no legs'},
    {word: 'HORSE', hint: 'Animal people ride'},
    {word: 'OCEAN', hint: 'Large body of salt water'},
    {word: 'SHIRT', hint: 'Clothing worn on upper body'},
    {word: 'PHONE', hint: 'Device used to call people'},
    {word: 'TABLE', hint: 'Furniture with flat top and legs'},
    {word: 'SHARK', hint: 'Large fish with sharp teeth'},
    {word: 'MOUSE', hint: 'Small rodent or computer device'},
    {word: 'MOVIE', hint: 'Story shown on a screen'},
    {word: 'PAPER', hint: 'Material used for writing'},
    {word: 'MONEY', hint: 'Used to buy things'},
    {word: 'QUEEN', hint: 'Female monarch'},
    {word: 'NIGHT', hint: 'Time when it's dark outside'},
    {word: 'LIGHT', hint: 'Makes things visible'},
    {word: 'SPACE', hint: 'Area beyond Earth's atmosphere'},
    {word: 'GRASS', hint: 'Green plants in lawns'},
    {word: 'BABY', hint: 'Very young child'},
    {word: 'KITE', hint: 'Toy that flies in the wind'},
    {word: 'STAR', hint: 'Bright object in the night sky'},
    {word: 'CAKE', hint: 'Sweet dessert for celebrations'},
    {word: 'BIRD', hint: 'Animal with wings that can fly'},
    {word: 'BOOK', hint: 'Pages with words bound together'},
    {word: 'MILK', hint: 'White drink from cows'},
    {word: 'BALL', hint: 'Round object used in games'},
    {word: 'FISH', hint: 'Animal that lives in water'},
    {word: 'LION', hint: 'Large wild cat with a mane'},
    {word: 'SNOW', hint: 'White frozen precipitation'},
    {word: 'TREE', hint: 'Plant with trunk and branches'},
    {word: 'DOOR', hint: 'Entrance to a room or building'},
    {word: 'MOON', hint: 'Object that orbits Earth'},
    {word: 'KING', hint: 'Male ruler of a kingdom'},
    {word: 'FIRE', hint: 'Hot, burning phenomenon'},
    {word: 'RAIN', hint: 'Water falling from clouds'},
    {word: 'GOLD', hint: 'Precious yellow metal'},
    {word: 'FROG', hint: 'Green jumping amphibian'},
    {word: 'BOAT', hint: 'Vehicle that travels on water'},
    {word: 'DUCK', hint: 'Bird that swims in water'},
    {word: 'BEAR', hint: 'Large furry woodland animal'},
    {word: 'DESK', hint: 'Furniture used for writing'},
    {word: 'SOAP', hint: 'Used for washing'},
    {word: 'GIFT', hint: 'Something given to someone'},
    {word: 'CHEF', hint: 'Person who cooks professionally'},
    {word: 'GAME', hint: 'Activity played for fun'},
    {word: 'FARM', hint: 'Land used for growing crops'},
    {word: 'RING', hint: 'Circular piece of jewelry'},
    {word: 'WING', hint: 'Part of a bird used for flying'},
    {word: 'SONG', hint: 'Musical composition with words'},
    {word: 'ROAD', hint: 'Path for traveling'},
    {word: 'SHOE', hint: 'Footwear'},
    {word: 'BIKE', hint: 'Two-wheeled vehicle'},
    {word: 'NOSE', hint: 'Body part used for smelling'},
    {word: 'LAKE', hint: 'Large body of fresh water'},
    {word: 'COAT', hint: 'Warm outer clothing'},
    {word: 'GOAT', hint: 'Farm animal with horns'},
    {word: 'BELL', hint: 'Metal object that makes ringing sound'},
    {word: 'CORN', hint: 'Yellow vegetable with kernels'},
    {word: 'WIND', hint: 'Moving air outdoors'},
    {word: 'CRAB', hint: 'Sea creature with pincers'},
    {word: 'SHIP', hint: 'Large vessel for sea travel'},
    {word: 'FROG', hint: 'Amphibian that jumps and croaks'},
    {word: 'SOUP', hint: 'Liquid food eaten with a spoon'},
    {word: 'NEST', hint: 'Bird's home'},
    {word: 'ROCK', hint: 'Hard mineral material'},
    {word: 'WOOL', hint: 'Fiber from sheep'},
    {word: 'CAVE', hint: 'Natural underground space'},
    {word: 'CHEF', hint: 'Professional cook'},
    {word: 'ROPE', hint: 'Thick cord made by twisting fibers'},
    {word: 'DRUM', hint: 'Percussion musical instrument'},
    {word: 'SALT', hint: 'White crystal used to flavor food'},
    {word: 'WOLF', hint: 'Wild animal related to dogs'},
    {word: 'VEST', hint: 'Sleeveless garment'},
    {word: 'LAMP', hint: 'Device that gives light'},
    {word: 'PEAR', hint: 'Sweet fruit with narrow top'},
    {word: 'BOWL', hint: 'Round container for food'},
    {word: 'DEER', hint: 'Forest animal with antlers'},
    {word: 'SOAP', hint: 'Cleaning product that makes bubbles'},
    {word: 'BEAN', hint: 'Seed from a pod used as food'},
    {word: 'TAPE', hint: 'Sticky material in a roll'},
    {word: 'SEED', hint: 'Small part of plant that grows'},
    {word: 'LEAF', hint: 'Green flat part of a plant'},
    {word: 'BULB', hint: 'Part of a lamp or flower'},
    {word: 'STEM', hint: 'Main stalk of a plant'},
    {word: 'FOAM', hint: 'Light material full of bubbles'},
    {word: 'ROOF', hint: 'Top covering of a building'},
    {word: 'NAIL', hint: 'Metal spike or fingertip covering'},
    {word: 'SEAL', hint: 'Marine mammal or wax stamp'},
    {word: 'PIPE', hint: 'Tube for carrying water'},
    {word: 'WORM', hint: 'Long thin soft-bodied animal'},
    {word: 'CLAY', hint: 'Soft earth material used in pottery'},
    {word: 'TOAD', hint: 'Amphibian similar to a frog'},
    {word: 'KNOT', hint: 'Fastening made by tying rope'},
    {word: 'PLUM', hint: 'Purple fruit with smooth skin'},
    {word: 'YARN', hint: 'Spun thread used for knitting'},
    {word: 'MINT', hint: 'Herb with cool-tasting leaves'},
    {word: 'HIVE', hint: 'Home for bees'},
    {word: 'CUBE', hint: 'Box with six equal square sides'},
    {word: 'PUMP', hint: 'Device for moving fluids'},
    {word: 'FORK', hint: 'Eating utensil with prongs'},
    {word: 'MASK', hint: 'Covering for the face'},
    {word: 'MOTH', hint: 'Insect similar to a butterfly'},
    {word: 'PEEL', hint: 'Outer skin of fruits'},
    {word: 'ARCH', hint: 'Curved structure spanning an opening'},
    {word: 'DART', hint: 'Small pointed missile thrown by hand'},
    {word: 'DUST', hint: 'Fine dry particles of matter'},
    {word: 'HOOK', hint: 'Curved piece of metal for catching'},
    {word: 'IRIS', hint: 'Colored part of the eye or a flower'},
    {word: 'LIME', hint: 'Green citrus fruit'},
    {word: 'MOLD', hint: 'Fungus growth or shaping container'},
    {word: 'NEST', hint: 'Structure where birds lay eggs'},
    {word: 'OVEN', hint: 'Enclosed cooking appliance'},
    {word: 'PACT', hint: 'Formal agreement'},
    {word: 'QUILT', hint: 'Warm bed covering'},
    {word: 'RUST', hint: 'Reddish coating on iron'},
    {word: 'SAIL', hint: 'Canvas sheet on a boat'},
    {word: 'TANK', hint: 'Container for liquids or military vehicle'},
    {word: 'VASE', hint: 'Container for displaying flowers'},
    {word: 'WASP', hint: 'Stinging flying insect'},
    {word: 'YARN', hint: 'Thread used for knitting'},
    {word: 'ZOOM', hint: 'Move quickly or magnify'},
    {word: 'ACID', hint: 'Sour chemical substance'},
    {word: 'BARK', hint: 'Outer covering of a tree'},
    {word: 'CLAW', hint: 'Sharp nail on animal's foot'},
    {word: 'DOCK', hint: 'Platform at water's edge'},
    {word: 'ECHO', hint: 'Sound repeated by reflection'},
    {word: 'FOAM', hint: 'Mass of small bubbles'},
    {word: 'GERM', hint: 'Microscopic organism'},
    {word: 'HAIL', hint: 'Frozen rain'},
    {word: 'INCH', hint: 'Small unit of length'},
    {word: 'JOKE', hint: 'Something said to cause laughter'},
    {word: 'KNOB', hint: 'Round handle for opening doors'},
    {word: 'LACE', hint: 'Delicate fabric with pattern of holes'},
    {word: 'MIST', hint: 'Light fog or spray'},
    {word: 'NOON', hint: 'Middle of the day'},
    {word: 'OPAL', hint: 'Colorful gemstone'},
    {word: 'PALM', hint: 'Inner surface of hand or tropical tree'},
    {word: 'QUIZ', hint: 'Test of knowledge'},
    {word: 'RAFT', hint: 'Flat floating structure'},
    {word: 'SCAR', hint: 'Mark left by healed wound'},
    {word: 'TWIG', hint: 'Small branch of a tree'},
    {word: 'UNIT', hint: 'Single thing or group'},
    {word: 'VEIN', hint: 'Blood vessel or streak in rock'},
    {word: 'WEED', hint: 'Unwanted plant'},
    {word: 'YAWN', hint: 'Open mouth wide from tiredness'},
    {word: 'ZEST', hint: 'Outer colored part of citrus peel'},
    {word: 'ATOM', hint: 'Smallest unit of an element'},
    {word: 'BEAD', hint: 'Small decorative object with a hole'},
    {word: 'COIL', hint: 'Spiral of rope or wire'},
    {word: 'DENT', hint: 'Small hollow in a surface'},
    {word: 'EDGE', hint: 'Outside limit of an object'},
    {word: 'FLAP', hint: 'Something that hangs loose and moves'},
    {word: 'GLOW', hint: 'Emit steady light'},
    {word: 'HEAP', hint: 'Pile of things'},
    {word: 'IRON', hint: 'Metal element or pressing tool'},
    {word: 'JUNK', hint: 'Discarded items of little use'},
    {word: 'KEEL', hint: 'Bottom part of a ship's structure'},
    {word: 'LENS', hint: 'Curved piece of glass'},
    {word: 'MAZE', hint: 'Complex network of paths'},
    {word: 'NOOK', hint: 'Small corner or recess'},
    {word: 'OVAL', hint: 'Egg-shaped figure'},
    {word: 'POLE', hint: 'Long slender piece of wood or metal'},
    {word: 'QUAY', hint: 'Platform by water for loading ships'},
    {word: 'RAMP', hint: 'Sloping surface connecting different levels'},
    {word: 'SLED', hint: 'Vehicle that slides over snow'},
    {word: 'TRAY', hint: 'Flat receptacle for carrying things'},
    {word: 'URGE', hint: 'Strong desire or impulse'},
    {word: 'VINE', hint: 'Climbing or trailing plant'},
    {word: 'WAVE', hint: 'Moving ridge on water surface'},
    {word: 'YARN', hint: 'Continuous strand of twisted fibers'},
    {word: 'ZERO', hint: 'Number representing none'},
    {word: 'ARCH', hint: 'Curved structure'},
    {word: 'BEAM', hint: 'Ray of light or structural support'},
    {word: 'COAL', hint: 'Black fossil fuel'},
    {word: 'DICE', hint: 'Small cubes used in games'},
    {word: 'ETCH', hint: 'Cut into a surface'},
    {word: 'FERN', hint: 'Plant with feathery leaves'},
    {word: 'GLUE', hint: 'Sticky substance for bonding'},
    {word: 'HOOP', hint: 'Circular ring'},
    {word: 'ICON', hint: 'Symbol or representation'},
    {word: 'JADE', hint: 'Green gemstone'},
    {word: 'KELP', hint: 'Large seaweed'},
    {word: 'LAVA', hint: 'Molten rock from volcano'},
    {word: 'MANE', hint: 'Long hair on neck of horse or lion'},
    {word: 'NEST', hint: 'Bird's home'},
    {word: 'OATS', hint: 'Cereal grain'},
    {word: 'PEAK', hint: 'Pointed top of mountain'},
    {word: 'QUIP', hint: 'Clever remark'},
    {word: 'REED', hint: 'Tall grass-like plant'},
    {word: 'SASH', hint: 'Decorative band worn around waist'},
    {word: 'TUSK', hint: 'Long pointed tooth'},
    {word: 'UNDO', hint: 'Reverse an action'},
    {word: 'VASE', hint: 'Decorative container for flowers'},
    {word: 'WICK', hint: 'String in candle that burns'},
    {word: 'YARN', hint: 'Fiber for knitting'},
    {word: 'ZINC', hint: 'Metallic element'},
    {word: 'AURA', hint: 'Distinctive atmosphere or quality'},
    {word: 'BOLT', hint: 'Metal fastener or lightning strike'},
    {word: 'COVE', hint: 'Small sheltered bay'},
    {word: 'DUSK', hint: 'Time before nightfall'},
    {word: 'ELBOW', hint: 'Joint in the middle of arm'},
    {word: 'FLINT', hint: 'Hard stone used to make fire'},
    {word: 'GRILL', hint: 'Cooking device with metal bars'},
    {word: 'HATCH', hint: 'Opening or emerge from egg'},
    {word: 'IGLOO', hint: 'Dome-shaped snow house'},
    {word: 'JEWEL', hint: 'Precious stone'},
    {word: 'KAYAK', hint: 'Small narrow watercraft'},
    {word: 'LOTUS', hint: 'Water lily with floating leaves'},
    {word: 'MAPLE', hint: 'Tree with distinctive leaf'},
    {word: 'NICKEL', hint: 'Five-cent coin or metallic element'},
    {word: 'ONION', hint: 'Layered vegetable that makes eyes water'},
    {word: 'PRISM', hint: 'Transparent object that splits light'},
    {word: 'QUILT', hint: 'Multi-layered bedcover'},
    {word: 'RADAR', hint: 'System using radio waves to detect objects'},
    {word: 'SQUID', hint: 'Sea creature with ten arms'},
    {word: 'TULIP', hint: 'Spring flower with cup-shaped bloom'},
    {word: 'UTOPIA', hint: 'Imagined perfect place'},
    {word: 'VAPOR', hint: 'Gas form of a substance'},
    {word: 'WHALE', hint: 'Large marine mammal'},
    {word: 'YACHT', hint: 'Recreational sailing vessel'},
    {word: 'ZEBRA', hint: 'Black and white striped animal'},
    {word: 'AMBER', hint: 'Fossilized tree resin'},
    {word: 'BLOOM', hint: 'Flower or flourishing state'},
    {word: 'CORAL', hint: 'Marine organism forming reefs'},
    {word: 'DELTA', hint: 'Triangular area at river mouth'},
    {word: 'EMBER', hint: 'Glowing coal in dying fire'},
    {word: 'FLUTE', hint: 'Wind musical instrument'},
    {word: 'GRAVY', hint: 'Sauce made from meat juices'},
    {word: 'HEDGE', hint: 'Row of bushes forming boundary'},
    {word: 'IVORY', hint: 'Hard white material from tusks'},
    {word: 'JELLY', hint: 'Soft, semi-solid food'},
    {word: 'KOALA', hint: 'Australian marsupial that eats eucalyptus'},
    {word: 'LINEN', hint: 'Fabric made from flax'},
    {word: 'MOOSE', hint: 'Large deer with broad antlers'},
    {word: 'NINJA', hint: 'Japanese warrior skilled in stealth'},
    {word: 'OPERA', hint: 'Musical drama with singing'},
    {word: 'PANDA', hint: 'Black and white bear from China'},
    {word: 'QUILL', hint: 'Feather used as writing pen'},
    {word: 'RAVEN', hint: 'Large black bird'},
    {word: 'STRAW', hint: 'Dried stalks of grain or drinking tube'},
    {word: 'THORN', hint: 'Sharp pointed growth on plant'},
    {word: 'UMPIRE', hint: 'Person who enforces rules in sports'},
    {word: 'VOWEL', hint: 'A, E, I, O, U in alphabet'},
    {word: 'WALNUT', hint: 'Wrinkled edible nut'},
    {word: 'XYLOPHONE', hint: 'Musical instrument with wooden bars'},
    {word: 'YOGURT', hint: 'Fermented dairy product'},
    {word: 'ANCHOR', hint: 'Device that holds ship in place'},
    {word: 'BREEZE', hint: 'Gentle wind'},
    {word: 'CANVAS', hint: 'Strong cloth for painting or sails'},
    {word: 'DIAMOND', hint: 'Precious gemstone'},
    {word: 'ECLIPSE', hint: 'Blocking of light from one celestial body'},
    {word: 'FOSSIL', hint: 'Preserved remains of ancient organism'},
    {word: 'GLACIER', hint: 'Slow-moving mass of ice'},
    {word: 'HORIZON', hint: 'Line where earth meets sky'},
    {word: 'INSECT', hint: 'Small invertebrate animal with six legs'},
    {word: 'JASMINE', hint: 'Fragrant flowering plant'},
    {word: 'KANGAROO', hint: 'Australian animal that hops'},
    {word: 'LANTERN', hint: 'Portable light with protective case'},
    {word: 'MAGNET', hint: 'Object that attracts iron'},
    {word: 'NECKLACE', hint: 'Jewelry worn around neck'},
    {word: 'OCTOPUS', hint: 'Sea creature with eight arms'},
    {word: 'PEACOCK', hint: 'Male bird with colorful tail feathers'},
    {word: 'QUARTER', hint: 'Twenty-five cents or one-fourth'},
    {word: 'RAINBOW', hint: 'Arc of colors in the sky'},
    {word: 'SCISSORS', hint: 'Cutting tool with two blades'},
    {word: 'TORNADO', hint: 'Violent rotating column of air'},
    {word: 'UMBRELLA', hint: 'Device that protects from rain'},
    {word: 'VOLCANO', hint: 'Mountain that erupts lava'},
    {word: 'WHISTLE', hint: 'Device that makes high-pitched sound'},
    {word: 'XYLOPHONE', hint: 'Percussion instrument with wooden bars'},
    {word: 'YESTERDAY', hint: 'Day before today'},
    {word: 'ZUCCHINI', hint: 'Green summer squash'},
    {word: 'AIRPLANE', hint: 'Flying vehicle with wings'},
    {word: 'BUTTERFLY', hint: 'Insect with colorful wings'},
    {word: 'CALENDAR', hint: 'System for organizing days and months'},
    {word: 'DINOSAUR', hint: 'Extinct reptile from millions of years ago'},
    {word: 'ELEPHANT', hint: 'Large animal with trunk and tusks'},
    {word: 'FLAMINGO', hint: 'Pink wading bird that stands on one leg'},
    {word: 'GIRAFFE', hint: 'Tall animal with long neck'},
    {word: 'HOSPITAL', hint: 'Building where sick people are treated'},
    {word: 'IGUANA', hint: 'Large lizard with spines'},
    {word: 'JELLYFISH', hint: 'Sea creature with tentacles'},
    {word: 'KANGAROO', hint: 'Animal that carries babies in pouch'},
    {word: 'LIBRARY', hint: 'Place with many books to borrow'},
    {word: 'MOUNTAIN', hint: 'Very high landform with peak'},
    {word: 'NOODLES', hint: 'Long thin strips of pasta'},
    {word: 'OCTAGON', hint: 'Shape with eight sides'},
    {word: 'PENGUIN', hint: 'Black and white bird that cannot fly'},
    {word: 'QUESTION', hint: 'Sentence asking for information'},
    {word: 'RAINBOW', hint: 'Colorful arc in sky after rain'},
    {word: 'SANDWICH', hint: 'Food with filling between bread slices'},
    {word: 'TELESCOPE', hint: 'Instrument for viewing distant objects'},
    {word: 'UNICORN', hint: 'Mythical horse with single horn'},
    {word: 'VACATION', hint: 'Period of time for rest and travel'},
    {word: 'WATERFALL', hint: 'Water flowing over edge of cliff'},
    {word: 'XYLOPHONE', hint: 'Musical instrument with wooden bars'},
    {word: 'YOGURT', hint: 'Creamy fermented milk food'},
    {word: 'ZIPPER', hint: 'Device with interlocking teeth for fastening'},
    {word: 'ALLIGATOR', hint: 'Large reptile similar to crocodile'},
    {word: 'BLUEBERRY', hint: 'Small round blue fruit'},
    {word: 'CHOCOLATE', hint: 'Sweet food made from cocoa'},
    {word: 'DRAGONFLY', hint: 'Insect with transparent wings'},
    {word: 'EVERGREEN', hint: 'Tree that keeps leaves all year'},
    {word: 'FIREPLACE', hint: 'Structure where indoor fire is made'},
    {word: 'GRASSHOPPER', hint: 'Jumping insect that makes chirping sounds'},
    {word: 'HAMBURGER', hint: 'Sandwich with ground meat patty'},
    {word: 'INSTRUMENT', hint: 'Tool for making music'},
    {word: 'JELLYBEAN', hint: 'Small bean-shaped candy'},
    {word: 'KEYBOARD', hint: 'Set of keys for typing or playing music'},
    {word: 'LIGHTHOUSE', hint: 'Tower with light to guide ships'},
    {word: 'MICROPHONE', hint: 'Device that amplifies your voice'},
    {word: 'NEWSPAPER', hint: 'Printed publication with news'},
    {word: 'ORCHESTRA', hint: 'Large group of musicians'},
    {word: 'PINEAPPLE', hint: 'Tropical fruit with spiky top'},
       {word: 'QUICKSAND', hint: 'Dangerous loose wet sand that sucks things down'},
    {word: 'RECTANGLE', hint: 'Shape with four sides and four right angles'},
    {word: 'STRAWBERRY', hint: 'Red fruit with seeds on outside'},
    {word: 'TELESCOPE', hint: 'Instrument for viewing distant objects'},
    {word: 'UMBRELLA', hint: 'Device that protects from rain or sun'},
    {word: 'VEGETABLE', hint: 'Plant part eaten as food'},
    {word: 'WATERMELON', hint: 'Large fruit with green rind and red flesh'},
    {word: 'XYLOPHONE', hint: 'Musical instrument with wooden bars struck by mallets'},
    {word: 'YESTERDAY', hint: 'The day before today'},
    {word: 'ZOOKEEPER', hint: 'Person who cares for animals in a zoo'},
    {word: 'ADVENTURE', hint: 'Exciting or unusual experience'},
    {word: 'BUTTERFLY', hint: 'Insect with colorful wings'},
    {word: 'CROCODILE', hint: 'Large reptile with powerful jaws'},
    {word: 'DETECTIVE', hint: 'Person who investigates crimes'},
    {word: 'ELEPHANT', hint: 'Largest land mammal with trunk'},
    {word: 'FURNITURE', hint: 'Movable objects in a room'},
    {word: 'GRASSLAND', hint: 'Large area covered with grass'},
    {word: 'HAPPINESS', hint: 'Feeling of joy or contentment'},
    {word: 'INVISIBLE', hint: 'Cannot be seen'},
    {word: 'JELLYFISH', hint: 'Sea creature with tentacles'},
    {word: 'KANGAROO', hint: 'Australian animal that hops'},
    {word: 'LEMONADE', hint: 'Drink made from lemons and sugar'},
    {word: 'MUSHROOM', hint: 'Fungus with cap and stem'},
    {word: 'NIGHTTIME', hint: 'Period of darkness when sun is down'},
    {word: 'OCTOPUS', hint: 'Sea animal with eight arms'},
    {word: 'PARACHUTE', hint: 'Device for slowing fall through air'},
    {word: 'QUESTION', hint: 'Sentence that asks for information'},
    {word: 'RAINCOAT', hint: 'Waterproof jacket for wet weather'},
    {word: 'SANDWICH', hint: 'Food with filling between bread'},
    {word: 'TRIANGLE', hint: 'Shape with three sides'},
    {word: 'UNIVERSE', hint: 'All of space and everything in it'},
    {word: 'VACATION', hint: 'Period of time for travel or rest'},
    {word: 'WHISKERS', hint: 'Hair growing on animal's face'},
    {word: 'XYLOPHONE', hint: 'Musical instrument with wooden bars'},
    {word: 'YOGHURT', hint: 'Fermented milk product'},
    {word: 'ZUCCHINI', hint: 'Green summer squash vegetable'},
    {word: 'ASTRONAUT', hint: 'Person who travels in space'},
    {word: 'BACKPACK', hint: 'Bag carried on your back'},
    {word: 'CAMPFIRE', hint: 'Outdoor fire for cooking or warmth'},
    {word: 'DINOSAUR', hint: 'Extinct prehistoric reptile'},
    {word: 'ELEVATOR', hint: 'Moving compartment between floors'},
    {word: 'FESTIVAL', hint: 'Celebration or special event'},
    {word: 'GRAPEFRUIT', hint: 'Large citrus fruit'},
    {word: 'HOSPITAL', hint: 'Building where sick people are treated'},
    {word: 'INTERNET', hint: 'Global computer network'},
    {word: 'JACKFRUIT', hint: 'Large tropical fruit'},
    {word: 'KILOMETER', hint: 'Unit of distance (1000 meters)'},
    {word: 'LULLABY', hint: 'Gentle song to help babies sleep'},
    {word: 'MOSQUITO', hint: 'Small flying insect that bites'},
    {word: 'NOTEBOOK', hint: 'Book with blank pages for writing'},
    {word: 'OBSTACLE', hint: 'Something that blocks your way'},
    {word: 'PANCAKES', hint: 'Flat cakes cooked in a pan'},
    {word: 'QUICKSAND', hint: 'Deep wet sand that traps things'},
    {word: 'RAINFOREST', hint: 'Dense forest with high rainfall'},
    {word: 'SUBMARINE', hint: 'Vessel that travels underwater'},
    {word: 'TELEPHONE', hint: 'Device used for talking to people far away'},
    {word: 'UNICYCLE', hint: 'One-wheeled vehicle'},
    {word: 'VOLCANO', hint: 'Mountain that can erupt'},
    {word: 'WINDMILL', hint: 'Building with sails turned by wind'},
    {word: 'XYLOPHONE', hint: 'Percussion instrument with wooden bars'},
    {word: 'YESTERDAY', hint: 'Day before today'},
    {word: 'ZOOLOGIST', hint: 'Scientist who studies animals'},
    {word: 'ACROBAT', hint: 'Person who performs gymnastic feats'},
    {word: 'BIRTHDAY', hint: 'Anniversary of the day you were born'},
    {word: 'CARNIVAL', hint: 'Traveling amusement show'},
    {word: 'DOLPHIN', hint: 'Intelligent marine mammal'},
    {word: 'EARRING', hint: 'Jewelry worn on ears'},
    {word: 'FOUNTAIN', hint: 'Ornamental water feature'},
    {word: 'GORILLA', hint: 'Large powerful ape'},
    {word: 'HAIRCUT', hint: 'Trimming or styling of hair'},
    {word: 'ICEBERG', hint: 'Large floating mass of ice'},
    {word: 'JEWELRY', hint: 'Decorative items worn on body'},
    {word: 'KEYBOARD', hint: 'Set of keys for typing or playing music'},
    {word: 'LANTERN', hint: 'Portable light with protective case'},
    {word: 'MEDICINE', hint: 'Substance used to treat illness'},
    {word: 'NECKLACE', hint: 'Ornament worn around neck'},
    {word: 'OBSTACLE', hint: 'Thing that blocks your way'},
    {word: 'POPCORN', hint: 'Snack made from heated corn kernels'},
    {word: 'QUARREL', hint: 'Angry argument or disagreement'},
    {word: 'RACCOON', hint: 'Mammal with black mask-like face marking'},
    {word: 'SAILBOAT', hint: 'Boat propelled by wind'},
    {word: 'TOOTHBRUSH', hint: 'Tool for cleaning teeth'},
    {word: 'UNIFORM', hint: 'Standard clothing worn by group members'},
    {word: 'VAMPIRE', hint: 'Mythical creature that drinks blood'},
    {word: 'WEEKEND', hint: 'Saturday and Sunday'},
    {word: 'YOGURT', hint: 'Fermented dairy product'},
    {word: 'ALPHABET', hint: 'Set of letters used in language'},
    {word: 'BALLOON', hint: 'Inflated rubber bag'},
    {word: 'CAMERA', hint: 'Device for taking photographs'},
    {word: 'DIAMOND', hint: 'Precious gemstone'},
    {word: 'ENVELOPE', hint: 'Paper container for letters'},
    {word: 'FEATHER', hint: 'Light growth covering birds'},
    {word: 'GARBAGE', hint: 'Waste material to be thrown away'},
    {word: 'HAMMOCK', hint: 'Swinging bed suspended between supports'},
    {word: 'INSECT', hint: 'Small invertebrate animal with six legs'},
    {word: 'JOURNEY', hint: 'Travel from one place to another'},
    {word: 'KITCHEN', hint: 'Room where food is prepared'},
    {word: 'LEATHER', hint: 'Material made from animal skin'},
    {word: 'MAGICIAN', hint: 'Person who performs magic tricks'},
    {word: 'NOODLES', hint: 'Long thin strips of pasta'},
    {word: 'OSTRICH', hint: 'Large flightless bird'},
    {word: 'PERFUME', hint: 'Fragrant liquid worn on body'},
    {word: 'QUARTER', hint: 'One fourth of something'},
    {word: 'RAINBOW', hint: 'Arc of colors in the sky after rain'},
    {word: 'SNOWMAN', hint: 'Figure made from snow'},
    {word: 'THUNDER', hint: 'Loud sound that follows lightning'},
    {word: 'UKULELE', hint: 'Small four-stringed guitar'},
    {word: 'VICTORY', hint: 'Success in contest or struggle'},
    {word: 'WHISTLE', hint: 'Device that makes high-pitched sound'},
    {word: 'YOGURT', hint: 'Fermented milk food'},
    {word: 'AIRPORT', hint: 'Place where airplanes take off and land'},
    {word: 'BICYCLE', hint: 'Two-wheeled vehicle'},
    {word: 'COMPASS', hint: 'Instrument showing directions'},
    {word: 'DOORBELL', hint: 'Button that rings to signal arrival'},
    {word: 'EARPHONES', hint: 'Small speakers worn on ears'},
    {word: 'FIREWORKS', hint: 'Explosive devices for display'},
    {word: 'GOLDFISH', hint: 'Small orange aquarium fish'},
    {word: 'HIGHWAY', hint: 'Main public road'},
    {word: 'ICECREAM', hint: 'Frozen dairy dessert'},
    {word: 'JUGGLER', hint: 'Person who tosses objects in the air'},
    {word: 'KETCHUP', hint: 'Tomato-based condiment'},
    {word: 'LOBSTER', hint: 'Large marine crustacean'},
    {word: 'MAILBOX', hint: 'Container for receiving mail'},
    {word: 'NAPKIN', hint: 'Small cloth for wiping mouth'},
    {word: 'OATMEAL', hint: 'Breakfast food made from oats'},
    {word: 'PAJAMAS', hint: 'Clothes worn for sleeping'},
    {word: 'QUICKSAND', hint: 'Wet sand that objects sink into'},
    {word: 'RAILWAY', hint: 'Track for trains'},
    {word: 'SEESAW', hint: 'Playground equipment that goes up and down'},
    {word: 'TEAPOT', hint: 'Container for brewing tea'},
    {word: 'UMBRELLA', hint: 'Device that protects from rain'},
    {word: 'VITAMIN', hint: 'Nutrient needed in small amounts'},
    {word: 'WEBSITE', hint: 'Collection of pages on internet'},
    {word: 'XYLOPHONE', hint: 'Percussion instrument with wooden bars'},
    {word: 'YARDSTICK', hint: 'Measuring tool three feet long'},
    {word: 'ZIPPER', hint: 'Fastener with interlocking teeth'},
    {word: 'APRICOT', hint: 'Small orange fruit'},
    {word: 'BLANKET', hint: 'Covering used on bed for warmth'},
    {word: 'CACTUS', hint: 'Desert plant with spines'},
    {word: 'DOMINO', hint: 'Small rectangular tile for games'},
    {word: 'ECLIPSE', hint: 'Blocking of light from one celestial body'},
    {word: 'FRISBEE', hint: 'Flying disc thrown for recreation'},
    {word: 'GLACIER', hint: 'Large mass of ice moving slowly'},
    {word: 'HAIRPIN', hint: 'Small pin for holding hair in place'},
    {word: 'ISLAND', hint: 'Land surrounded by water'},
    {word: 'JIGSAW', hint: 'Puzzle with interlocking pieces'},
    {word: 'KENNEL', hint: 'House for a dog'},
    {word: 'LOLLIPOP', hint: 'Sweet on a stick'},
    {word: 'MITTEN', hint: 'Hand covering with section for thumb only'},
    {word: 'NEEDLE', hint: 'Thin pointed tool for sewing'},
    {word: 'OYSTER', hint: 'Shellfish that can produce pearls'},
    {word: 'PUMPKIN', hint: 'Large orange squash'},
    {word: 'QUILT', hint: 'Thick bedcover with padding'},
    {word: 'RIBBON', hint: 'Narrow strip of fabric for decoration'},
    {word: 'STATUE', hint: 'Sculpture of person or animal'},
    {word: 'TRUMPET', hint: 'Brass musical instrument'},
    {word: 'UNICORN', hint: 'Mythical horse with single horn'},
    {word: 'VOLCANO', hint: 'Mountain that erupts'},
    {word: 'WALNUT', hint: 'Edible nut with wrinkled shell'},
    {word: 'YOGURT', hint: 'Fermented milk product'},
    {word: 'ZEBRA', hint: 'Black and white striped animal'},
    {word: 'AUTUMN', hint: 'Season between summer and winter'},
    {word: 'BUBBLE', hint: 'Sphere of liquid enclosing air'},
    {word: 'CRAYON', hint: 'Colored wax stick for drawing'},
    {word: 'DONKEY', hint: 'Animal related to horse with long ears'},
    {word: 'ERASER', hint: 'Object used to remove pencil marks'},
    {word: 'FARMER', hint: 'Person who works on a farm'},
    {word: 'GLOVES', hint: 'Hand coverings with separate fingers'},
    {word: 'HAMMER', hint: 'Tool for driving nails'},
    {word: 'IGLOO', hint: 'Dome-shaped snow house'},
    {word: 'JACKET', hint: 'Short coat'},
    {word: 'KETTLE', hint: 'Container for boiling water'},
    {word: 'LEMON', hint: 'Yellow citrus fruit'},
    {word: 'MAGNET', hint: 'Object that attracts iron'},
    {word: 'NICKEL', hint: 'Five-cent coin'},
    {word: 'ORANGE', hint: 'Round citrus fruit'},
    {word: 'PEPPER', hint: 'Spice that makes you sneeze'},
    {word: 'QUIVER', hint: 'Container for arrows'},
    {word: 'ROCKET', hint: 'Vehicle that travels into space'},
    {word: 'SADDLE', hint: 'Seat for rider on horse'},
    {word: 'TICKET', hint: 'Printed slip showing payment'},
    {word: 'UNCLE', hint: 'Brother of your parent'},
    {word: 'VIOLIN', hint: 'Stringed musical instrument'},
    {word: 'WINDOW', hint: 'Opening in wall with glass'},
    {word: 'YELLOW', hint: 'Color of bananas and lemons'},
    {word: 'ZOMBIE', hint: 'Walking dead person in stories'},
    {word: 'ACORN', hint: 'Seed of an oak tree'},
    {word: 'BRUSH', hint: 'Tool with bristles'},
    {word: 'CLOCK', hint: 'Device that shows time'},
    {word: 'DAISY', hint: 'White flower with yellow center'},
    {word: 'EAGLE', hint: 'Large bird of prey'},
    {word: 'FUDGE', hint: 'Soft sweet chocolate candy'},
    {word: 'GOOSE', hint: 'Large waterfowl with long neck'},
    {word: 'HONEY', hint: 'Sweet food made by bees'},
    {word: 'IGLOO', hint: 'Snow house'},
    {word: 'JEWEL', hint: 'Precious stone'},
    {word: 'KOALA', hint: 'Australian animal that eats eucalyptus'},
    {word: 'LEMON', hint: 'Sour yellow fruit'},
    {word: 'MELON', hint: 'Sweet juicy fruit with thick rind'},
    {word: 'NURSE', hint: 'Person who cares for sick people'},
    {word: 'OCEAN', hint: 'Vast body of saltwater'},
    {word: 'PEACH', hint: 'Soft juicy fruit with fuzzy skin'},
    {word: 'QUEEN', hint: 'Female ruler of a country'},
    {word: 'RULER', hint: 'Tool for measuring or drawing straight lines'},
    {word: 'SUGAR', hint: 'Sweet crystalline substance'},
    {word: 'TIGER', hint: 'Large wild cat with stripes'},
    {word: 'USHER', hint: 'Person who shows people to seats'},
    {word: 'VAULT', hint: 'Secure storage for valuables'},
    {word: 'WAGON', hint: 'Four-wheeled vehicle pulled by animal'},
    {word: 'XEROX', hint: 'Brand name for photocopier'},
    {word: 'YACHT', hint: 'Recreational sailing vessel'},
    {word: 'ZESTY', hint: 'Full of flavor or enthusiasm'},
    {word: 'ALARM', hint: 'Device that warns or alerts'},
    {word: 'BAGEL', hint: 'Ring-shaped bread roll'},
    {word: 'CAMEL', hint: 'Desert animal with humps'},
    {word: 'DENIM', hint: 'Sturdy cotton fabric for jeans'},
    {word: 'EAGLE', hint: 'Large bird with hooked beak'},
    {word: 'FENCE', hint: 'Structure enclosing an area'},
    {word: 'GRAPE', hint: 'Small round fruit growing in clusters'},
    {word: 'HOTEL', hint: 'Building offering rooms to travelers'},
    {word: 'IMAGE', hint: 'Picture or representation'},
    {word: 'JUICE', hint: 'Liquid from fruits or vegetables'},
    {word: 'KIOSK', hint: 'Small stand selling goods'},
    {word: 'LINEN', hint: 'Fabric made from flax'},
    {word: 'MOTEL', hint: 'Roadside hotel for motorists'},
    {word: 'NOVEL', hint: 'Long fictional story in book form'},
    {word: 'OLIVE', hint: 'Small oval fruit used for oil'},
    {word: 'PIANO', hint: 'Musical instrument with keys'},
    {word: 'QUAIL', hint: 'Small ground-dwelling bird'},
    {word: 'RADIO', hint: 'Device receiving broadcast signals'},
    {word: 'STOVE', hint: 'Appliance for cooking food'},
    {word: 'TOWEL', hint: 'Absorbent cloth for drying'},
    {word: 'URBAN', hint: 'Relating to a city'},
    {word: 'VAPOR', hint: 'Moisture suspended in air'},
    {word: 'WAFER', hint: 'Thin crisp cookie'},
    {word: 'XENON', hint: 'Chemical element used in lights'},
    {word: 'YACHT', hint: 'Luxury sailing vessel'},
    {word: 'ZEBRA', hint: 'African animal with black and white stripes'},
    {word: 'ANKLE', hint: 'Joint between foot and leg'},
    {word: 'BEACH', hint: 'Sandy shore by ocean'},
    {word: 'CANDY', hint: 'Sweet sugary treat'},
    {word: 'DANCE', hint: 'Move rhythmically to music'},
    {word: 'ELBOW', hint: 'Joint in middle of arm'},
    {word: 'FAIRY', hint: 'Magical tiny being with wings'},
    {word: 'GHOST', hint: 'Spirit of dead person'},
    {word: 'HEART', hint: 'Organ that pumps blood'},
    {word: 'IVORY', hint: 'Hard white material from tusks'},
    {word: 'JEANS', hint: 'Pants made from denim'},
    {word: 'KIWI', hint: 'Fuzzy brown fruit with green flesh'},
    {word: 'LEMON', hint: 'Sour yellow citrus fruit'},
    {word: 'MANGO', hint: 'Tropical fruit with orange flesh'},
    {word: 'NORTH', hint: 'Direction toward the North Pole'},
    {word: 'OPERA', hint: 'Musical drama with singing'},
    {word: 'PASTA', hint: 'Italian food made from dough'},
    {word: 'QUIET', hint: 'Making little or no noise'},
    {word: 'ROBIN', hint: 'Small bird with red breast'},
    {word: 'SCARF', hint: 'Fabric worn around neck'},
    {word: 'TULIP', hint: 'Spring flower with cup-shaped bloom'},
    {word: 'UNCLE', hint: 'Brother of your parent'},
    {word: 'VOICE', hint: 'Sound made when speaking'},
    {word: 'WATCH', hint: 'Device worn to tell time'},
    {word: 'XEROX', hint: 'Make a photocopy'},
    {word: 'YOUTH', hint: 'Period between childhood and adult age'},
    {word: 'ZEBRA', hint: 'Animal with black and white stripes'},
    {word: 'APPLE', hint: 'Round fruit, often red or green'},
    {word: 'BREAD', hint: 'Baked food made from flour'},
    {word: 'CHAIR', hint: 'Furniture for sitting'},
    {word: 'DREAM', hint: 'Images and thoughts during sleep'},
    {word: 'EARTH', hint: 'Planet we live on'},
    {word: 'FLUTE', hint: 'Wind musical instrument'},
    {word: 'GLOVE', hint: 'Covering for the hand'},
    {word: 'HORSE', hint: 'Large four-legged animal for riding'},
    {word: 'IMAGE', hint: 'Visual representation'},
    {word: 'JELLY', hint: 'Soft, semi-solid food'},
    {word: 'KNIFE', hint: 'Cutting tool with blade'},
    {word: 'LIGHT', hint: 'Brightness that lets us see'},
    {word: 'MUSIC', hint: 'Sounds organized to be pleasant'},
    {word: 'NIGHT', hint: 'Time of darkness when sun is down'},
    {word: 'OCEAN', hint: 'Vast body of salt water'},
    {word: 'PLANT', hint: 'Living organism that grows in soil'},
    {word: 'QUEEN', hint: 'Female ruler of a country'},
    {word: 'RIVER', hint: 'Large natural stream of water'},
    {word: 'SMILE', hint: 'Happy facial expression'},
    {word: 'TIGER', hint: 'Large wild cat with stripes'},
    {word: 'UNDER', hint: 'Below or beneath something'},
    {word: 'VOICE', hint: 'Sound made when speaking'},
    {word: 'WATER', hint: 'Clear liquid essential for life'},
    {word: 'XEROX', hint: 'Make a copy of a document'},
    {word: 'YOUNG', hint: 'In early stage of life'},
    {word: 'ZESTY', hint: 'Having a strong, pleasant flavor'}
];
     
            // } else {
            //     words = [
            //         {word: 'SCIENCE', hint: 'Study of the natural world'},
            //         {word: 'COMPUTER', hint: 'Electronic device for work and games'},
            //         {word: 'MOUNTAIN', hint: 'Very tall landform'},
            //         {word: 'ADVENTURE', hint: 'An exciting experience'},
            //         {word: 'KNOWLEDGE', hint: 'Information and skills gained through experience'}
            //     ];
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
                    this.currentScore += 1;
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

            const questions = [
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
    },
    {
        question: "What comes next in the pattern: 1, 3, 5, 7, ?",
        options: ["8", "9", "10", "11"],
        answer: "9"
    },
    {
        question: "If you have 5 apples and eat 2, how many do you have left?",
        options: ["2", "3", "5", "7"],
        answer: "3"
    },
    {
        question: "Which animal doesn't belong?",
        options: ["Dog", "Cat", "Elephant", "Table"],
        answer: "Table"
    },
    {
        question: "If today is Friday, what day will it be in 2 days?",
        options: ["Saturday", "Sunday", "Monday", "Wednesday"],
        answer: "Sunday"
    },
    {
        question: "What comes next in the pattern: 10, 20, 30, 40, ?",
        options: ["45", "50", "55", "60"],
        answer: "50"
    },
    {
        question: "If a bicycle has 2 wheels, how many wheels do 4 bicycles have?",
        options: ["6", "8", "10", "12"],
        answer: "8"
    },
    {
        question: "Which color doesn't belong?",
        options: ["Red", "Blue", "Green", "Monday"],
        answer: "Monday"
    },
    {
        question: "If today is Wednesday, what day will it be yesterday from tomorrow?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Wednesday"
    },
    {
        question: "What comes next in the pattern: 3, 6, 9, 12, ?",
        options: ["14", "15", "16", "18"],
        answer: "15"
    },
    {
        question: "If a triangle has 3 sides, how many sides do 5 triangles have?",
        options: ["8", "12", "15", "20"],
        answer: "15"
    },
    {
        question: "Which item doesn't belong?",
        options: ["Apple", "Banana", "Cherry", "Carrot"],
        answer: "Carrot"
    },
    {
        question: "If today is Saturday, what day was it 3 days ago?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Wednesday"
    },
    {
        question: "What comes next in the pattern: 5, 10, 15, 20, ?",
        options: ["23", "24", "25", "30"],
        answer: "25"
    },
    {
        question: "If a car has 4 tires, how many tires do 6 cars have?",
        options: ["18", "20", "24", "30"],
        answer: "24"
    },
    {
        question: "Which item is not a fruit?",
        options: ["Apple", "Orange", "Banana", "Carrot"],
        answer: "Carrot"
    },
    {
        question: "If today is Thursday, what day will it be in 4 days?",
        options: ["Friday", "Saturday", "Sunday", "Monday"],
        answer: "Monday"
    },
    {
        question: "What comes next in the pattern: 2, 4, 8, 16, ?",
        options: ["24", "32", "48", "64"],
        answer: "32"
    },
    {
        question: "If a hand has 5 fingers, how many fingers do 3 hands have?",
        options: ["8", "10", "15", "20"],
        answer: "15"
    },
    {
        question: "Which item is not a vegetable?",
        options: ["Carrot", "Broccoli", "Potato", "Apple"],
        answer: "Apple"
    },
    {
        question: "If today is Monday, what day was it 5 days ago?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Wednesday"
    },
    {
        question: "What comes next in the pattern: 1, 4, 9, 16, ?",
        options: ["20", "23", "25", "36"],
        answer: "25"
    },
    {
        question: "If a spider has 8 legs, how many legs do 4 spiders have?",
        options: ["24", "28", "32", "36"],
        answer: "32"
    },
    {
        question: "Which item is not a planet?",
        options: ["Earth", "Mars", "Jupiter", "Moon"],
        answer: "Moon"
    },
    {
        question: "If today is Sunday, what day will it be in 9 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        answer: "Tuesday"
    },
    {
        question: "What comes next in the pattern: 1, 1, 2, 3, 5, ?",
        options: ["6", "7", "8", "9"],
        answer: "8"
    },
    {
        question: "If a week has 7 days, how many days are in 8 weeks?",
        options: ["49", "54", "56", "63"],
        answer: "56"
    },
    {
        question: "Which item is not a color?",
        options: ["Red", "Blue", "Green", "Square"],
        answer: "Square"
    },
    {
        question: "If today is Friday, what day will it be in 100 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Friday"],
        answer: "Friday"
    },
    {
        question: "What comes next in the pattern: 100, 90, 80, 70, ?",
        options: ["50", "55", "60", "65"],
        answer: "60"
    },
    {
        question: "If a dozen is 12, how many items are in 3 dozen?",
        options: ["24", "30", "36", "48"],
        answer: "36"
    },
    {
        question: "Which item doesn't belong in a kitchen?",
        options: ["Stove", "Refrigerator", "Sink", "Bed"],
        answer: "Bed"
    },
    {
        question: "If today is Wednesday, what day will it be in 25 days?",
        options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
        answer: "Monday"
    },
    {
        question: "What comes next in the pattern: 2, 6, 12, 20, ?",
        options: ["25", "30", "35", "40"],
        answer: "30"
    },
    {
        question: "If a bookshelf has 5 shelves and each shelf holds 8 books, how many books can it hold in total?",
        options: ["35", "40", "45", "50"],
        answer: "40"
    },
    {
        question: "Which item is not a weather condition?",
        options: ["Rain", "Snow", "Wind", "Mountain"],
        answer: "Mountain"
    },
    {
        question: "If today is Tuesday, what day will it be in 30 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Thursday"
    },
    {
        question: "What comes next in the pattern: 3, 6, 12, 24, ?",
        options: ["30", "36", "42", "48"],
        answer: "48"
    },
    {
        question: "If a rectangle has 4 corners, how many corners do 7 rectangles have?",
        options: ["21", "24", "28", "35"],
        answer: "28"
    },
    {
        question: "Which item is not a type of transportation?",
        options: ["Car", "Bicycle", "Airplane", "Television"],
        answer: "Television"
    },
    {
        question: "If today is Saturday, what day was it 60 days ago?",
        options: ["Wednesday", "Thursday", "Friday", "Saturday"],
        answer: "Thursday"
    },
    {
        question: "What comes next in the pattern: 1, 3, 6, 10, ?",
        options: ["12", "14", "15", "18"],
        answer: "15"
    },
    {
        question: "If a box contains 6 balls, how many balls are in 9 boxes?",
        options: ["45", "48", "54", "60"],
        answer: "54"
    },
    {
        question: "Which item is not a musical instrument?",
        options: ["Guitar", "Piano", "Trumpet", "Pencil"],
        answer: "Pencil"
    },
    {
        question: "If today is Monday, what day will it be in 18 days?",
        options: ["Thursday", "Friday", "Saturday", "Sunday"],
        answer: "Friday"
    },
    {
        question: "What comes next in the pattern: 7, 14, 21, 28, ?",
        options: ["33", "34", "35", "36"],
        answer: "35"
    },
    {
        question: "If a square has 4 sides, how many sides do 11 squares have?",
        options: ["33", "40", "44", "48"],
        answer: "44"
    },
    {
        question: "Which item is not a body part?",
        options: ["Arm", "Leg", "Nose", "Chair"],
        answer: "Chair"
    },
    {
        question: "If today is Thursday, what day was it 15 days ago?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Wednesday"
    },
    {
        question: "What comes next in the pattern: 2, 5, 10, 17, ?",
        options: ["22", "24", "26", "28"],
        answer: "26"
    },
    {
        question: "If a tricycle has 3 wheels, how many wheels do 5 tricycles have?",
        options: ["12", "15", "18", "20"],
        answer: "15"
    },
    {
        question: "Which item is not an animal?",
        options: ["Lion", "Tiger", "Elephant", "Daisy"],
        answer: "Daisy"
    },
    {
        question: "If today is Sunday, what day will it be in 23 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        answer: "Tuesday"
    },
    {
        question: "What comes next in the pattern: 1, 8, 27, 64, ?",
        options: ["100", "125", "144", "216"],
        answer: "125"
    },
    {
        question: "If a hexagon has 6 sides, how many sides do 8 hexagons have?",
        options: ["42", "48", "54", "60"],
        answer: "48"
    },
    {
        question: "Which item is not a type of footwear?",
        options: ["Boots", "Sandals", "Sneakers", "Gloves"],
        answer: "Gloves"
    },
    {
        question: "If today is Friday, what day will it be in 40 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        answer: "Wednesday"
    },
    {
        question: "What comes next in the pattern: 1, 2, 4, 7, ?",
        options: ["9", "11", "13", "15"],
        answer: "11"
    },
    {
        question: "If a quarter is 25 cents, how many cents are in 7 quarters?",
        options: ["150", "165", "175", "200"],
        answer: "175"
    },
    {
        question: "Which item is not a type of flower?",
        options: ["Rose", "Tulip", "Daisy", "Apple"],
        answer: "Apple"
    },
    {
        question: "If today is Wednesday, what day was it 70 days ago?",
        options: ["Saturday", "Sunday", "Monday", "Tuesday"],
        answer: "Sunday"
    },
    {
        question: "What comes next in the pattern: 3, 7, 15, 31, ?",
        options: ["57", "61", "63", "67"],
        answer: "63"
    },
    {
        question: "If a pentagon has 5 sides, how many sides do 6 pentagons have?",
        options: ["25", "30", "35", "40"],
        answer: "30"
    },
    {
        question: "Which item is not a type of drink?",
        options: ["Water", "Juice", "Milk", "Bread"],
        answer: "Bread"
    },
    {
        question: "If today is Tuesday, what day will it be in 50 days?",
        options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
        answer: "Tuesday"
    },
    {
        question: "What comes next in the pattern: 4, 9, 16, 25, ?",
        options: ["30", "36", "42", "49"],
        answer: "36"
    },
    {
        question: "If an octopus has 8 tentacles, how many tentacles do 4 octopuses have?",
        options: ["24", "28", "32", "36"],
        answer: "32"
    },
    {
        question: "Which item is not a piece of furniture?",
        options: ["Chair", "Table", "Sofa", "Banana"],
        answer: "Banana"
    },
    {
        question: "If today is Saturday, what day will it be in 16 days?",
        options: ["Saturday", "Sunday", "Monday", "Tuesday"],
        answer: "Monday"
    },
    {
        question: "What comes next in the pattern: 5, 6, 8, 11, ?",
        options: ["13", "14", "15", "16"],
        answer: "15"
    },
    {
        question: "If a dozen eggs is 12 eggs, how many eggs are in 2.5 dozen?",
        options: ["24", "27", "30", "36"],
        answer: "30"
    },
    {
        question: "Which item is not a type of tree?",
        options: ["Oak", "Pine", "Maple", "Carrot"],
        answer: "Carrot"
    },
    {
        question: "If today is Thursday, what day will it be in 100 days?",
        options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
        answer: "Monday"
    },
    {
        question: "What comes next in the pattern: 2, 6, 18, 54, ?",
        options: ["108", "126", "162", "216"],
        answer: "162"
    },
    {
        question: "If a cube has 6 faces, how many faces do 9 cubes have?",
        options: ["45", "54", "63", "72"],
        answer: "54"
    },
    {
        question: "Which item is not a type of tool?",
        options: ["Hammer", "Screwdriver", "Wrench", "Pillow"],
        answer: "Pillow"
    },
    {
        question: "If today is Monday, what day was it 84 days ago?",
        options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
        answer: "Monday"
    },
    {
        question: "What comes next in the pattern: 1, 4, 13, 40, ?",
        options: ["81", "100", "121", "160"],
        answer: "121"
    },
    {
        question: "If a triangle has 3 angles, how many angles do 12 triangles have?",
        options: ["24", "30", "36", "48"],
        answer: "36"
    },
    {
        question: "Which item is not a type of clothing?",
        options: ["Shirt", "Pants", "Socks", "Fork"],
        answer: "Fork"
    },
    {
        question: "If today is Friday, what day will it be in 31 days?",
        options: ["Saturday", "Sunday", "Monday", "Tuesday"],
        answer: "Monday"
    },
    {
        question: "What comes next in the pattern: 8, 16, 24, 32, ?",
        options: ["36", "38", "40", "42"],
        answer: "40"
    },
    {
        question: "If a bicycle has 2 pedals, how many pedals do 15 bicycles have?",
        options: ["25", "30", "35", "40"],
        answer: "30"
    },
    {
        question: "Which item is not a type of sport?",
        options: ["Soccer", "Basketball", "Tennis", "Sandwich"],
        answer: "Sandwich"
    },
    {
        question: "If today is Wednesday, what day will it be in 45 days?",
        options: ["Thursday", "Friday", "Saturday", "Sunday"],
        answer: "Friday"
    },
    {
        question: "What comes next in the pattern: 3, 8, 15, 24, ?",
        options: ["30", "33", "35", "38"],
        answer: "35"
    },
    {
        question: "If a car has 5 seats, how many people can sit in 7 cars?",
        options: ["30", "35", "40", "45"],
        answer: "35"
    },
    {
        question: "Which item is not a type of fruit?",
        options: ["Apple", "Banana", "Orange", "Potato"],
        answer: "Potato"
    },
    {
        question: "If today is Sunday, what day was it 36 days ago?",
        options: ["Thursday", "Friday", "Saturday", "Sunday"],
        answer: "Friday"
    },
    {
        question: "What comes next in the pattern: 2, 6, 12, 20, 30, ?",
        options: ["36", "40", "42", "48"],
        answer: "42"
    },
    {
        question: "If a week has 7 days, how many days are in 12 weeks?",
        options: ["72", "77", "82", "84"],
        answer: "84"
    },
    {
        question: "Which item is not a type of weather?",
        options: ["Rain", "Snow", "Wind", "Chair"],
        answer: "Chair"
    },
    {
        question: "If today is Tuesday, what day was it 90 days ago?",
        options: ["Saturday", "Sunday", "Monday", "Tuesday"],
        answer: "Sunday"
    },
    {
        question: "What comes next in the pattern: 1, 5, 14, 30, ?",
        options: ["45", "50", "55", "60"],
        answer: "55"
    },
    {
        question: "If a rectangle has 2 long sides and 2 short sides, how many sides do 6 rectangles have?",
        options: ["18", "20", "22", "24"],
        answer: "24"
    },
    {
        question: "Which item is not a type of bird?",
        options: ["Eagle", "Sparrow", "Robin", "Salmon"],
        answer: "Salmon"
    },
    {
        question: "If today is Thursday, what day will it be in 65 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Wednesday"
    },
    {
        question: "What comes next in the pattern: 2, 3, 5, 8, 12, ?",
        options: ["15", "17", "19", "21"],
        answer: "17"
    },
    {
        question: "If a hand has 5 fingers, how many fingers do 8 hands have?",
        options: ["35", "40", "45", "50"],
        answer: "40"
    },
    {
        question: "Which item is not a type of insect?",
        options: ["Ant", "Bee", "Fly", "Snake"],
        answer: "Snake"
    },
    {
        question: "If today is Saturday, what day will it be in 13 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Friday"
    },
    {
        question: "What comes next in the pattern: 3, 1, 4, 1, 5, ?",
        options: ["6", "7", "8", "9"],
        answer: "9"
    },
    {
        question: "If a pizza is cut into 8 slices, how many slices are in 4 pizzas?",
        options: ["24", "28", "32", "36"],
        answer: "32"
    },
    {
        question: "Which item is not a type of vehicle?",
        options: ["Car", "Bus", "Train", "Apple"],
        answer: "Apple"
    },
    {
        question: "If today is Monday, what day will it be in 22 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        answer: "Tuesday"
    },
    {
        question: "What comes next in the pattern: 1, 2, 6, 24, ?",
        options: ["96", "100", "120", "144"],
        answer: "120"
    },
    {
        question: "If a pentagon has 5 corners, how many corners do 7 pentagons have?",
        options: ["30", "35", "40", "45"],
        answer: "35"
    },
    {
        question: "Which item is not a type of food?",
        options: ["Bread", "Cheese", "Rice", "Book"],
        answer: "Book"
    },
    {
        question: "If today is Friday, what day was it 55 days ago?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        answer: "Tuesday"
    },
    {
        question: "What comes next in the pattern: 4, 7, 12, 19, ?",
        options: ["24", "26", "28", "30"],
        answer: "28"
    },
    {
        question: "If a tricycle has 3 wheels, how many wheels do 9 tricycles have?",
        options: ["18", "21", "24", "27"],
        answer: "27"
    },
    {
        question: "Which item is not a type of furniture?",
        options: ["Chair", "Table", "Desk", "Orange"],
        answer: "Orange"
    },
    {
        question: "If today is Wednesday, what day will it be in 80 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Wednesday"
    },
    {
        question: "What comes next in the pattern: 5, 15, 45, 135, ?",
        options: ["270", "375", "405", "540"],
        answer: "405"
    },
    {
        question: "If a square has 4 corners, how many corners do 15 squares have?",
        options: ["45", "50", "55", "60"],
        answer: "60"
    },
    {
        question: "Which item is not a type of musical instrument?",
        options: ["Guitar", "Piano", "Violin", "Potato"],
        answer: "Potato"
    },
    {
        question: "If today is Sunday, what day will it be in 17 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        answer: "Wednesday"
    },
    {
        question: "What comes next in the pattern: 1, 1, 2, 3, 5, 8, ?",
        options: ["11", "12", "13", "14"],
        answer: "13"
    },
    {
        question: "If a hexagon has 6 angles, how many angles do 5 hexagons have?",
        options: ["25", "30", "35", "40"],
        answer: "30"
    },
    {
        question: "Which item is not a type of vegetable?",
        options: ["Carrot", "Broccoli", "Spinach", "Grapes"],
        answer: "Grapes"
    },
    {
        question: "If today is Tuesday, what day was it 42 days ago?",
        options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
        answer: "Tuesday"
    },
    {
        question: "What comes next in the pattern: 6, 12, 20, 30, ?",
        options: ["36", "40", "42", "48"],
        answer: "42"
    },
    {
        question: "If a spider has 8 legs, how many legs do 7 spiders have?",
        options: ["48", "52", "56", "60"],
        answer: "56"
    },
    {
        question: "Which item is not a type of planet?",
        options: ["Earth", "Mars", "Jupiter", "Sun"],
        answer: "Sun"
    },
    {
        question: "If today is Saturday, what day will it be in 19 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        answer: "Thursday"
    },
    {
        question: "What comes next in the pattern: 9, 16, 25, 36, ?",
        options: ["45", "49", "64", "81"],
        answer: "49"
    },
    {
        question: "If a week has 7 days, how many days are in 5 weeks?",
        options: ["25", "30", "35", "40"],
        answer: "35"
    },
    {
        question: "Which item is not a type of drink?",
        options: ["Water", "Juice", "Soda", "Plate"],
        answer: "Plate"
    },
    {
        question: "If today is Thursday, what day was it 21 days ago?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        answer: "Thursday"
    },
    {
        question: "What comes next in the pattern: 2, 8, 18, 32, ?",
        options: ["48", "50", "52", "54"],
        answer: "50"
    },
    {
        question: "If a bicycle has 2 wheels, how many wheels do 12 bicycles have?",
        options: ["18", "20", "22", "24"],
        answer: "24"
    },
    {
        question: "Which item is not a type of animal?",
        options: ["Lion", "Tiger", "Elephant", "Potato"],
        answer: "Potato"
    },
    {
        question: "If today is Monday, what day will it be in 60 days?",
        options: ["Wednesday", "Thursday", "Friday", "Saturday"],
        answer: "Friday"
    },
    {
        question: "What comes next in the pattern: 1, 4, 9, 16, 25, ?",
        options: ["30", "36", "42", "49"],
        answer: "36"
    },
    {
        question: "If a car has 4 tires, how many tires do 8 cars have?",
        options: ["24", "28", "32", "36"],
        answer: "32"
    },
    {
        question: "Which item is not a type of clothing?",
        options: ["Shirt", "Pants", "Jacket", "Table"],
        answer: "Table"
    },
    {
        question: "If today is Friday, what day will it be in 10 days?",
        options: ["Saturday", "Sunday", "Monday", "Tuesday"],
        answer: "Monday"
    },
    {
        question: "What comes next in the pattern: 3, 9, 27, 81, ?",
        options: ["162", "189", "243", "729"],
        answer: "243"
    },
    {
        question: "If a triangle has 3 sides, how many sides do 9 triangles have?",
        options: ["21", "24", "27", "30"],
        answer: "27"
    },
    {
        question: "Which item is not a type of fruit?",
        options: ["Apple", "Banana", "Orange", "Carrot"],
        answer: "Carrot"
    },
    {
        question: "If today is Wednesday, what day was it 35 days ago?",
        options: ["Saturday", "Sunday", "Monday", "Tuesday"],
        answer: "Monday"
    },
    {
        question: "What comes next in the pattern: 4, 8, 16, 32, ?",
        options: ["48", "56", "64", "96"],
        answer: "64"
    },
    {
        question: "If a hand has 5 fingers, how many fingers do 6 hands have?",
        options: ["25", "30", "35", "40"],
        answer: "30"
    },
    {
        question: "Which item is not a type of weather?",
        options: ["Rain", "Snow", "Fog", "Book"],
        answer: "Book"
    },
    {
        question: "If today is Sunday, what day will it be in 25 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        answer: "Thursday"
    },
    {
        question: "What comes next in the pattern: 2, 7, 14, 23, ?",
        options: ["30", "32", "34", "36"],
        answer: "34"
    },
    {
        question: "If a pentagon has 5 sides, how many sides do 4 pentagons have?",
        options: ["15", "20", "25", "30"],
        answer: "20"
    },
    {
        question: "Which item is not a type of tool?",
        options: ["Hammer", "Screwdriver", "Wrench", "Apple"],
        answer: "Apple"
    },
    {
        question: "If today is Tuesday, what day will it be in 14 days?",
        options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
        answer: "Tuesday"
    },
    {
        question: "What comes next in the pattern: 5, 10, 20, 40, ?",
        options: ["60", "70", "80", "90"],
        answer: "80"
    },
    {
        question: "If a square has 4 sides, how many sides do 6 squares have?",
        options: ["18", "20", "22", "24"],
        answer: "24"
    },
    {
        question: "Which item is not a type of furniture?",
        options: ["Chair", "Table", "Desk", "Carrot"],
        answer: "Carrot"
    },
    {
        question: "If today is Thursday, what day was it 49 days ago?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        answer: "Thursday"
    },
    {
        question: "What comes next in the pattern: 1, 3, 7, 15, ?",
options: [
  "23",
  "27",
  "31",
  "35"
],
answer: "31"
},
{
question: "If a hexagon has 6 sides, how many sides do 9 hexagons have?",
options: [
  "48",
  "54",
  "60",
  "66"
],
answer: "54"
},
{
question: "Which item is not a type of bird?",
options: [
  "Eagle",
  "Sparrow",
  "Robin",
  "Trout"
],
answer: "Trout"
},
{
question: "If today is Saturday, what day will it be in 15 days?",
options: [
  "Friday",
  "Saturday",
  "Sunday",
  "Monday"
],
answer: "Sunday"
},
{
question: "What comes next in the pattern: 2, 5, 11, 23, ?",
options: [
  "43",
  "45",
  "47",
  "49"
],
answer: "47"
},
{
question: "If a tricycle has 3 wheels, how many wheels do 7 tricycles have?",
options: [
  "18",
  "21",
  "24",
  "27"
],
answer: "21"
},
{
question: "Which item is not a type of vegetable?",
options: [
  "Carrot",
  "Broccoli",
  "Spinach",
  "Orange"
],
answer: "Orange"
},
{
question: "If today is Monday, what day was it 28 days ago?",
options: [
  "Friday",
  "Saturday",
  "Sunday",
  "Monday"
],
answer: "Monday"
},
{
question: "What comes next in the pattern: 3, 6, 11, 18, ?",
options: [
  "23",
  "25",
  "27",
  "29"
],
answer: "27"
},
{
question: "If a dozen is 12, how many items are in 4.5 dozen?",
options: [
  "48",
  "50",
  "52",
  "54"
],
answer: "54"
},
{
question: "Which item is not a type of transportation?",
options: [
  "Car",
  "Bus",
  "Train",
  "Pencil"
],
answer: "Pencil"
},
{
question: "If today is Wednesday, what day will it be in 50 days?",
options: [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
],
answer: "Friday"
},
{
question: "What comes next in the pattern: 1, 4, 10, 22, ?",
options: [
  "36",
  "42",
  "46",
  "50"
],
answer: "46"
},
{
question: "If a spider has 8 legs, how many legs do 6 spiders have?",
options: [
  "42",
  "44",
  "46",
  "48"
],
answer: "48"
},
{
question: "Which item is not a type of sport?",
options: [
  "Soccer",
  "Basketball",
  "Tennis",
  "Pencil"
],
answer: "Pencil"
},
{
question: "If today is Friday, what day was it 63 days ago?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Sunday"
},
{
question: "What comes next in the pattern: 4, 12, 36, 108, ?",
options: [
  "216",
  "324",
  "432",
  "540"
],
answer: "324"
},
{
question: "If a car has 4 seats, how many seats do 9 cars have?",
options: [
  "32",
  "36",
  "40",
  "44"
],
answer: "36"
},
{
question: "Which item is not a type of color?",
options: [
  "Red",
  "Blue",
  "Green",
  "Table"
],
answer: "Table"
},
{
question: "If today is Tuesday, what day will it be in 100 days?",
options: [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
],
answer: "Thursday"
},
{
question: "What comes next in the pattern: 5, 8, 13, 21, ?",
options: [
  "29",
  "32",
  "34",
  "36"
],
answer: "34"
},
{
question: "If a square has 4 corners, how many corners do 10 squares have?",
options: [
  "30",
  "35",
  "40",
  "45"
],
answer: "40"
},
{
question: "Which item is not a type of food?",
options: [
  "Bread",
  "Cheese",
  "Rice",
  "Chair"
],
answer: "Chair"
},
{
question: "If today is Thursday, what day will it be in 32 days?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Monday"
},
{
question: "What comes next in the pattern: 2, 10, 50, 250, ?",
options: [
  "1000",
  "1250",
  "1500",
  "2000"
],
answer: "1250"
},
{
question: "If a week has 7 days, how many days are in 6 weeks?",
options: [
  "36",
  "38",
  "40",
  "42"
],
answer: "42"
},
{
question: "Which item is not a type of animal?",
options: [
  "Lion",
  "Tiger",
  "Elephant",
  "Pencil"
],
answer: "Pencil"
},
{
question: "If today is Sunday, what day was it 14 days ago?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Sunday"
},
{
question: "What comes next in the pattern: 3, 5, 9, 17, ?",
options: [
  "31",
  "33",
  "35",
  "37"
],
answer: "33"
},
{
question: "If a triangle has 3 angles, how many angles do 8 triangles have?",
options: [
  "18",
  "21",
  "24",
  "27"
],
answer: "24"
},
{
question: "Which item is not a type of drink?",
options: [
  "Water",
  "Juice",
  "Milk",
  "Chair"
],
answer: "Chair"
},
{
question: "If today is Wednesday, what day will it be in 20 days?",
options: [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday"
],
answer: "Tuesday"
},
{
question: "What comes next in the pattern: 1, 5, 13, 29, ?",
options: [
  "49",
  "57",
  "61",
  "65"
],
answer: "61"
},
{
question: "If a hexagon has 6 angles, how many angles do 7 hexagons have?",
options: [
  "36",
  "38",
  "40",
  "42"
],
answer: "42"
},
{
question: "Which item is not a type of fruit?",
options: [
  "Apple",
  "Banana",
  "Orange",
  "Potato"
],
answer: "Potato"
},
{
question: "If today is Monday, what day was it 56 days ago?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Monday"
},
{
question: "What comes next in the pattern: 7, 12, 19, 28, ?",
options: [
  "37",
  "39",
  "41",
  "43"
],
answer: "39"
},
{
question: "If a bicycle has 2 pedals, how many pedals do 8 bicycles have?",
options: [
  "12",
  "14",
  "16",
  "18"
],
answer: "16"
},
{
question: "Which item is not a type of furniture?",
options: [
  "Chair",
  "Table",
  "Desk",
  "Banana"
],
answer: "Banana"
},
{
question: "If today is Friday, what day will it be in 75 days?",
options: [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
],
answer: "Wednesday"
},
{
question: "What comes next in the pattern: 2, 4, 12, 48, ?",
options: [
  "144",
  "192",
  "240",
  "288"
],
answer: "240"
},
{
question: "If a pentagon has 5 corners, how many corners do 6 pentagons have?",
options: [
  "25",
  "30",
  "35",
  "40"
],
answer: "30"
},
{
question: "Which item is not a type of tool?",
options: [
  "Hammer",
  "Screwdriver",
  "Wrench",
  "Orange"
],
answer: "Orange"
},
{
question: "If today is Tuesday, what day was it 70 days ago?",
options: [
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
],
answer: "Friday"
},
{
question: "What comes next in the pattern: 6, 9, 18, 45, ?",
options: [
  "90",
  "108",
  "126",
  "144"
],
answer: "126"
},
{
question: "If a car has 4 tires, how many tires do 11 cars have?",
options: [
  "40",
  "42",
  "44",
  "46"
],
answer: "44"
},
{
question: "Which item is not a type of clothing?",
options: [
  "Shirt",
  "Pants",
  "Jacket",
  "Apple"
],
answer: "Apple"
},
{
question: "If today is Saturday, what day will it be in 24 days?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Tuesday"
},
{
question: "What comes next in the pattern: 1, 3, 10, 24, ?",
options: [
  "45",
  "48",
  "51",
  "54"
],
answer: "51"
},
{
question: "If a spider has 8 legs, how many legs do 9 spiders have?",
options: [
  "63",
  "68",
  "72",
  "81"
],
answer: "72"
},
{
question: "Which item is not a type of weather?",
options: [
  "Rain",
  "Snow",
  "Wind",
  "Desk"
],
answer: "Desk"
},
{
question: "If today is Thursday, what day was it 42 days ago?",
options: [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday"
],
answer: "Tuesday"
},
{
question: "What comes next in the pattern: 5, 7, 11, 19, ?",
options: [
  "29",
  "31",
  "33",
  "35"
],
answer: "35"
},
{
question: "If a tricycle has 3 wheels, how many wheels do 10 tricycles have?",
options: [
  "25",
  "27",
  "30",
  "33"
],
answer: "30"
},
{
question: "Which item is not a type of planet?",
options: [
  "Earth",
  "Mars",
  "Jupiter",
  "Moon"
],
answer: "Moon"
},
{
question: "If today is Wednesday, what day will it be in 60 days?",
options: [
  "Friday",
  "Saturday",
  "Sunday",
  "Monday"
],
answer: "Sunday"
},
{
question: "What comes next in the pattern: 4, 6, 10, 18, ?",
options: [
  "30",
  "32",
  "34",
  "36"
],
answer: "34"
},
{
question: "If a square has 4 sides, how many sides do 13 squares have?",
options: [
  "48",
  "50",
  "52",
  "54"
],
answer: "52"
},
{
question: "Which item is not a type of vegetable?",
options: [
  "Carrot",
  "Broccoli",
  "Spinach",
  "Banana"
],
answer: "Banana"
},
{
question: "If today is Monday, what day was it 49 days ago?",
options: [
  "Friday",
  "Saturday",
  "Sunday",
  "Monday"
],
answer: "Monday"
},
{
question: "What comes next in the pattern: 3, 6, 18, 72, ?",
options: [
  "216",
  "288",
  "360",
  "432"
],
answer: "360"
},
{
question: "If a hexagon has 6 sides, how many sides do 5 hexagons have?",
options: [
  "25",
  "30",
  "35",
  "40"
],
answer: "30"
},
{
question: "Which item is not a type of bird?",
options: [
  "Eagle",
  "Sparrow",
  "Robin",
  "Lion"
],
answer: "Lion"
},
{
question: "If today is Friday, what day will it be in 18 days?",
options: [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday"
],
answer: "Tuesday"
},
{
question: "What comes next in the pattern: 2, 5, 9, 14, ?",
options: [
  "18",
  "20",
  "22",
  "24"
],
answer: "20"
},
{
question: "If a hand has 5 fingers, how many fingers do 9 hands have?",
options: [
  "40",
  "42",
  "45",
  "48"
],
answer: "45"
},
{
question: "Which item is not a type of food?",
options: [
  "Bread",
  "Cheese",
  "Rice",
  "Table"
],
answer: "Table"
},
{
question: "If today is Sunday, what day was it 21 days ago?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Sunday"
},
{
question: "What comes next in the pattern: 8, 12, 18, 27, ?",
options: [
  "36",
  "38",
  "40",
  "42"
],
answer: "40"
},
{
question: "If a bicycle has 2 wheels, how many wheels do 14 bicycles have?",
options: [
  "24",
  "26",
  "28",
  "30"
],
answer: "28"
},
{
question: "Which item is not a type of transportation?",
options: [
  "Car",
  "Bus",
  "Train",
  "Book"
],
answer: "Book"
},
{
question: "If today is Tuesday, what day will it be in 35 days?",
options: [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday"
],
answer: "Tuesday"
},
{
question: "What comes next in the pattern: 1, 2, 4, 8, 16, ?",
options: [
  "24",
  "28",
  "32",
  "36"
],
answer: "32"
},
{
question: "If a triangle has 3 sides, how many sides do 15 triangles have?",
options: [
  "40",
  "42",
  "45",
  "48"
],
answer: "45"
},
{
question: "Which item is not a type of fruit?",
options: [
  "Apple",
  "Banana",
  "Orange",
  "Broccoli"
],
answer: "Broccoli"
},
{
question: "If today is Thursday, what day will it be in 12 days?",
options: [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday"
],
answer: "Tuesday"
},
{
question: "What comes next in the pattern: 3, 7, 15, 31, 63, ?",
options: [
  "115",
  "121",
  "127",
  "135"
],
answer: "127"
},
{
question: "If a pentagon has 5 angles, how many angles do 8 pentagons have?",
options: [
  "35",
  "40",
  "45",
  "50"
],
answer: "40"
},
{
question: "Which item is not a type of animal?",
options: [
  "Lion",
  "Tiger",
  "Elephant",
  "Chair"
],
answer: "Chair"
},
{
question: "If today is Saturday, what day was it 35 days ago?",
options: [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
],
answer: "Friday"
},
{
question: "What comes next in the pattern: 4, 9, 25, 49, ?",
options: [
  "81",
  "100",
  "121",
  "144"
],
answer: "121"
},
{
question: "If a car has 4 seats, how many seats do 12 cars have?",
options: [
  "44",
  "46",
  "48",
  "50"
],
answer: "48"
},
{
question: "Which item is not a type of drink?",
options: [
  "Water",
  "Juice",
  "Milk",
  "Pencil"
],
answer: "Pencil"
},
{
question: "If today is Wednesday, what day will it be in 90 days?",
options: [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday"
],
answer: "Tuesday"
},
{
question: "What comes next in the pattern: 2, 6, 14, 30, ?",
options: [
  "58",
  "62",
  "66",
  "70"
],
answer: "62"
},
{
question: "If a spider has 8 legs, how many legs do 5 spiders have?",
options: [
  "35",
  "40",
  "45",
  "50"
],
answer: "40"
},
{
question: "Which item is not a type of tool?",
options: [
  "Hammer",
  "Screwdriver",
  "Wrench",
  "Banana"
],
answer: "Banana"
},
{
question: "If today is Monday, what day was it 77 days ago?",
options: [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday"
],
answer: "Wednesday"
},
{
question: "What comes next in the pattern: 5, 11, 23, 47, ?",
options: [
  "85",
  "91",
  "95",
  "99"
],
answer: "95"
},
{
question: "If a hexagon has 6 corners, how many corners do 9 hexagons have?",
options: [
  "48",
  "51",
  "54",
  "57"
],
answer: "54"
},
{
question: "Which item is not a type of clothing?",
options: [
  "Shirt",
  "Pants",
  "Jacket",
  "Chair"
],
answer: "Chair"
},
{
question: "If today is Friday, what day will it be in 45 days?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Monday"
},
{
question: "What comes next in the pattern: 1, 8, 27, 64, 125, ?",
options: [
  "196",
  "216",
  "256",
  "512"
],
answer: "216"
},
{
question: "If a tricycle has 3 wheels, how many wheels do 12 tricycles have?",
options: [
  "30",
  "33",
  "36",
  "39"
],
answer: "36"
},
{
question: "Which item is not a type of vegetable?",
options: [
  "Carrot",
  "Broccoli",
  "Spinach",
  "Apple"
],
answer: "Apple"
},
{
question: "If today is Tuesday, what day was it 63 days ago?",
options: [
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
],
answer: "Thursday"
},
{
question: "What comes next in the pattern: 7, 14, 28, 56, ?",
options: [
  "98",
  "104",
  "112",
  "120"
],
answer: "112"
},
{
question: "If a square has 4 corners, how many corners do 14 squares have?",
options: [
  "52",
  "54",
  "56",
  "58"
],
answer: "56"
},
{
question: "Which item is not a type of weather?",
options: [
  "Rain",
  "Snow",
  "Wind",
  "Apple"
],
answer: "Apple"
},
{
question: "If today is Thursday, what day will it be in 27 days?",
options: [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday"
],
answer: "Wednesday"
},
{
question: "What comes next in the pattern: 3, 8, 15, 24, 35, ?",
options: [
  "42",
  "46",
  "48",
  "52"
],
answer: "48"
},
{
question: "If a hand has 5 fingers, how many fingers do 7 hands have?",
options: [
  "30",
  "32",
  "35",
  "40"
],
answer: "35"
},
{
question: "Which item is not a type of planet?",
options: [
  "Earth",
  "Mars",
  "Jupiter",
  "Star"
],
answer: "Star"
},
{
question: "If today is Sunday, what day was it 28 days ago?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Sunday"
},
{
question: "What comes next in the pattern: 2, 7, 17, 37, ?",
options: [
  "67",
  "72",
  "77",
  "82"
],
answer: "77"
},
{
question: "If a bicycle has 2 pedals, how many pedals do 10 bicycles have?",
options: [
  "15",
  "18",
  "20",
  "25"
],
answer: "20"
},
{
question: "Which item is not a type of furniture?",
options: [
  "Chair",
  "Table",
  "Desk",
  "Apple"
],
answer: "Apple"
},
{
question: "If today is Wednesday, what day will it be in 15 days?",
options: [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
],
answer: "Thursday"
},
{
question: "What comes next in the pattern: 4, 10, 22, 46, ?",
options: [
  "88",
  "92",
  "94",
  "98"
],
answer: "94"
},
{
question: "If a pentagon has 5 sides, how many sides do 12 pentagons have?",
options: [
  "55",
  "60",
  "65",
  "70"
],
answer: "60"
},
{
question: "Which item is not a type of food?",
options: [
  "Bread",
  "Cheese",
  "Rice",
  "Pencil"
],
answer: "Pencil"
},
{
question: "If today is Monday, what day was it 42 days ago?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Monday"
},
{
question: "What comes next in the pattern: 1, 5, 14, 30, 55, ?",
options: [
  "85",
  "91",
  "95",
  "100"
],
answer: "91"
},
{
question: "If a hexagon has 6 angles, how many angles do 11 hexagons have?",
options: [
  "60",
  "62",
  "64",
  "66"
],
answer: "66"
},
{
question: "Which item is not a type of bird?",
options: [
  "Eagle",
  "Sparrow",
  "Robin",
  "Shark"
],
answer: "Shark"
},
{
question: "If today is Saturday, what day will it be in 50 days?",
options: [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
],
answer: "Thursday"
},
{
question: "What comes next in the pattern: 3, 9, 19, 33, ?",
options: [
  "45",
  "51",
  "57",
  "63"
],
answer: "51"
},
{
question: "If a spider has 8 legs, how many legs do 8 spiders have?",
options: [
  "56",
  "60",
  "64",
  "72"
],
answer: "64"
},
{
question: "Which item is not a type of transportation?",
options: [
  "Car",
  "Bus",
  "Train",
  "Chair"
],
answer: "Chair"
},
{
question: "If today is Friday, what day was it 56 days ago?",
options: [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
],
answer: "Friday"
},
{
question: "What comes next in the pattern: 6, 11, 21, 41, ?",
options: [
  "71",
  "76",
  "81",
  "91"
],
answer: "81"
},
{
question: "If a car has 4 tires, how many tires do 9 cars have?",
options: [
  "32",
  "34",
  "36",
  "38"
],
answer: "36"
},
{
question: "Which item is not a type of fruit?",
options: [
  "Apple",
  "Banana",
  "Orange",
  "Chair"
],
answer: "Chair"
},
{
question: "If today is Tuesday, what day will it be in 70 days?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Sunday"
},
{
question: "What comes next in the pattern: 2, 3, 6, 18, ?",
options: [
  "36",
  "48",
  "54",
  "72"
],
answer: "72"
},
{
question: "If a triangle has 3 angles, how many angles do 14 triangles have?",
options: [
  "36",
  "39",
  "42",
  "45"
],
answer: "42"
},
{
question: "Which item is not a type of vegetable?",
options: [
  "Carrot",
  "Broccoli",
  "Spinach",
  "Chair"
],
answer: "Chair"
},
{
question: "If today is Thursday, what day was it 14 days ago?",
options: [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
],
answer: "Thursday"
},
{
question: "What comes next in the pattern: 5, 15, 30, 60, ?",
options: [
  "105",
  "110",
  "115",
  "120"
],
answer: "120"
},
{
question: "If a tricycle has 3 wheels, how many wheels do 15 tricycles have?",
options: [
  "40",
  "42",
  "45",
  "48"
],
answer: "45"
},
{
question: "Which item is not a type of animal?",
options: [
  "Lion",
  "Tiger",
  "Elephant",
  "Banana"
],
answer: "Banana"
},
{
question: "If today is Wednesday, what day will it be in 100 days?",
options: [
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
],
answer: "Saturday"
},
{
question: "What comes next in the pattern: 4, 7, 13, 25, ?",
options: [
  "43",
  "45",
  "47",
  "49"
],
answer: "49"
},
{
question: "If a square has 4 sides, how many sides do 16 squares have?",
options: [
  "60",
  "62",
  "64",
  "68"
],
answer: "64"
},
{
question: "Which item is not a type of drink?",
options: [
  "Water",
  "Juice",
  "Milk",
  "Book"
],
answer: "Book"
},
{
question: "If today is Sunday, what day was it 49 days ago?",
options: [
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
],
answer: "Sunday"
},
{
question: "What comes next in the pattern: 1, 4, 13, 40, 121, ?",
options: [
  "302",
  "324",
  "364",
  "484"
],
answer: "364"
},
{
question: "If a hexagon has 6 sides, how many sides do 7 hexagons have?",
options: [
  "36",
  "38",
  "40",
  "42"
],
answer: "42"
},
{
question: "Which item is not a type of tool?",
options: [
  "Hammer",
  "Screwdriver",
  "Wrench",
  "Chair"
],
answer: "Chair"
},
{
question: "If today is Monday, what day will it be in 80 days?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Monday"
},
{
question: "What comes next in the pattern: 3, 10, 29, 66, ?",
options: [
  "127",
  "131",
  "135",
  "139"
],
answer: "127"
},
{
question: "If a pentagon has 5 corners, how many corners do 10 pentagons have?",
options: [
  "45",
  "50",
  "55",
  "60"
],
answer: "50"
},
{
question: "Which item is not a type of clothing?",
options: [
  "Shirt",
  "Pants",
  "Jacket",
  "Banana"
],
answer: "Banana"
},
{
question: "If today is Friday, what day was it 70 days ago?",
options: [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday"
],
answer: "Wednesday"
},
{
question: "What comes next in the pattern: 2, 8, 26, 80, ?",
options: [
  "224",
  "242",
  "260",
  "278"
],
answer: "242"
},
{
question: "If a bicycle has 2 wheels, how many wheels do 18 bicycles have?",
options: [
  "32",
  "34",
  "36",
  "38"
],
answer: "36"
},
{
question: "Which item is not a type of weather?",
options: [
  "Rain",
  "Snow",
  "Wind",
  "Pencil"
],
answer: "Pencil"
},
{
question: "If today is Tuesday, what day will it be in 21 days?",
options: [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday"
],
answer: "Tuesday"
},
{
question: "What comes next in the pattern: 5, 10, 17, 26, ?",
options: [
  "33",
  "35",
  "37",
  "39"
],
answer: "37"
},
{
question: "If a hand has 5 fingers, how many fingers do 11 hands have?",
options: [
  "50",
  "52",
  "55",
  "60"
],
answer: "55"
},
{
question: "Which item is not a type of planet?",
options: [
  "Earth",
  "Mars",
  "Jupiter",
  "Apple"
],
answer: "Apple"
},
{
question: "If today is Thursday, what day was it 35 days ago?",
options: [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
],
answer: "Sunday"
},
{
question: "What comes next in the pattern: 4, 8, 17, 35, ?",
options: [
  "67",
  "70",
  "71",
  "74"
],
answer: "71"
},
{
question: "If a spider has 8 legs, how many legs do 10 spiders have?",
options: [
  "70",
  "75",
  "80",
  "85"
],
answer: "80"
},
{
question: "Which item is not a type of furniture?",
options: [
  "Chair",
  "Table",
  "Desk",
  "Orange"
],
answer: "Orange"
},
{
question: "If today is Saturday, what day will it be in 36 days?",
options: [
  "Friday",
  "Saturday",
  "Sunday",
  "Monday"
],
answer: "Sunday"
},

{
  question: "What comes next in the pattern: 1, 9, 25, 49, ?",
  options: [
    "71",
    "81",
    "91",
    "121"
  ],
  answer: "81"
},
{
  question: "If a triangle has 3 sides, how many sides do 17 triangles have?",
  options: [
    "45",
    "48",
    "51",
    "54"
  ],
  answer: "51"
},
{
  question: "Which item is not a type of food?",
  options: [
    "Bread",
    "Cheese",
    "Rice",
    "Hammer"
  ],
  answer: "Hammer"
},
{
  question: "If today is Wednesday, what day was it 21 days ago?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Wednesday"
},
{
  question: "What comes next in the pattern: 6, 13, 27, 55, ?",
  options: [
    "101",
    "107",
    "111",
    "119"
  ],
  answer: "111"
},
{
  question: "If a hexagon has 6 angles, how many angles do 13 hexagons have?",
  options: [
    "72",
    "74",
    "76",
    "78"
  ],
  answer: "78"
},
{
  question: "Which item is not a type of bird?",
  options: [
    "Eagle",
    "Sparrow",
    "Robin",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Sunday, what day will it be in 55 days?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 3, 12, 48, 192, ?",
  options: [
    "768",
    "864",
    "960",
    "1056"
  ],
  answer: "768"
},
{
  question: "If a car has 4 seats, how many seats do 15 cars have?",
  options: [
    "55",
    "60",
    "65",
    "70"
  ],
  answer: "60"
},
{
  question: "Which item is not a type of transportation?",
  options: [
    "Car",
    "Bus",
    "Train",
    "Apple"
  ],
  answer: "Apple"
},
{
  question: "If today is Monday, what day was it 91 days ago?",
  options: [
    "Friday",
    "Saturday",
    "Sunday",
    "Monday"
  ],
  answer: "Saturday"
},
{
  question: "What comes next in the pattern: 2, 9, 30, 93, ?",
  options: [
    "272",
    "282",
    "292",
    "302"
  ],
  answer: "282"
},
{
  question: "If a pentagon has 5 sides, how many sides do 14 pentagons have?",
  options: [
    "65",
    "70",
    "75",
    "80"
  ],
  answer: "70"
},
{
  question: "Which item is not a type of vegetable?",
  options: [
    "Carrot",
    "Broccoli",
    "Spinach",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Friday, what day will it be in 24 days?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Monday"
},
{
  question: "What comes next in the pattern: 5, 13, 29, 61, ?",
  options: [
    "115",
    "121",
    "125",
    "131"
  ],
  answer: "125"
},
{
  question: "If a tricycle has 3 wheels, how many wheels do 14 tricycles have?",
  options: [
    "38",
    "40",
    "42",
    "44"
  ],
  answer: "42"
},
{
  question: "Which item is not a type of animal?",
  options: [
    "Lion",
    "Tiger",
    "Elephant",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Tuesday, what day was it 49 days ago?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 4, 14, 32, 68, ?",
  options: [
    "136",
    "140",
    "144",
    "148"
  ],
  answer: "140"
},
{
  question: "If a square has 4 corners, how many corners do 19 squares have?",
  options: [
    "72",
    "74",
    "76",
    "78"
  ],
  answer: "76"
},
{
  question: "Which item is not a type of drink?",
  options: [
    "Water",
    "Juice",
    "Milk",
    "Hammer"
  ],
  answer: "Hammer"
},
{
  question: "If today is Thursday, what day will it be in 38 days?",
  options: [
    "Friday",
    "Saturday",
    "Sunday",
    "Monday"
  ],
  answer: "Sunday"
},
{
  question: "What comes next in the pattern: 7, 19, 43, 91, ?",
  options: [
    "183",
    "187",
    "191",
    "195"
  ],
  answer: "187"
},
{
  question: "If a hand has 5 fingers, how many fingers do 13 hands have?",
  options: [
    "60",
    "65",
    "70",
    "75"
  ],
  answer: "65"
},
{
  question: "Which item is not a type of planet?",
  options: [
    "Earth",
    "Mars",
    "Jupiter",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Saturday, what day was it 63 days ago?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Sunday"
},
{
  question: "What comes next in the pattern: 1, 6, 21, 66, ?",
  options: [
    "201",
    "211",
    "221",
    "231"
  ],
  answer: "201"
},
{
  question: "If a bicycle has 2 pedals, how many pedals do 17 bicycles have?",
  options: [
    "30",
    "32",
    "34",
    "36"
  ],
  answer: "34"
},
{
  question: "Which item is not a type of furniture?",
  options: [
    "Chair",
    "Table",
    "Desk",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Wednesday, what day will it be in 70 days?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 3, 11, 43, 171, ?",
  options: [
    "683",
    "693",
    "703",
    "713"
  ],
  answer: "683"
},
{
  question: "If a hexagon has 6 sides, how many sides do 16 hexagons have?",
  options: [
    "86",
    "92",
    "96",
    "102"
  ],
  answer: "96"
},
{
  question: "Which item is not a type of clothing?",
  options: [
    "Shirt",
    "Pants",
    "Jacket",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Sunday, what day was it 77 days ago?",
  options: [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  answer: "Friday"
},
{
  question: "What comes next in the pattern: 2, 10, 50, 250, 1250, ?",
  options: [
    "5250",
    "6250",
    "7250",
    "8250"
  ],
  answer: "6250"
},
{
  question: "If a spider has 8 legs, how many legs do 12 spiders have?",
  options: [
    "86",
    "92",
    "96",
    "102"
  ],
  answer: "96"
},
{
  question: "Which item is not a type of weather?",
  options: [
    "Rain",
    "Snow",
    "Wind",
    "Table"
  ],
  answer: "Table"
},
{
  question: "If today is Monday, what day will it be in 91 days?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Monday"
},
{
  question: "What comes next in the pattern: 5, 16, 49, 148, ?",
  options: [
    "441",
    "445",
    "449",
    "453"
  ],
  answer: "445"
},
{
  question: "If a triangle has 3 angles, how many angles do 20 triangles have?",
  options: [
    "55",
    "60",
    "65",
    "70"
  ],
  answer: "60"
},
{
  question: "Which item is not a type of food?",
  options: [
    "Bread",
    "Cheese",
    "Rice",
    "Car"
  ],
  answer: "Car"
},
{
  question: "If today is Friday, what day was it 28 days ago?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Friday"
},
{
  question: "What comes next in the pattern: 4, 16, 36, 64, ?",
  options: [
    "100",
    "121",
    "144",
    "169"
  ],
  answer: "100"
},
{
  question: "If a pentagon has 5 corners, how many corners do 13 pentagons have?",
  options: [
    "60",
    "65",
    "70",
    "75"
  ],
  answer: "65"
},
{
  question: "Which item is not a type of bird?",
  options: [
    "Eagle",
    "Sparrow",
    "Robin",
    "Table"
  ],
  answer: "Table"
},
{
  question: "If today is Tuesday, what day will it be in 42 days?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 1, 7, 19, 37, ?",
  options: [
    "61",
    "67",
    "73",
    "79"
  ],
  answer: "61"
},
{
  question: "If a car has 4 tires, how many tires do 14 cars have?",
  options: [
    "52",
    "56",
    "60",
    "64"
  ],
  answer: "56"
},
{
  question: "Which item is not a type of transportation?",
  options: [
    "Car",
    "Bus",
    "Train",
    "Table"
  ],
  answer: "Table"
},
{
  question: "If today is Thursday, what day was it 84 days ago?",
  options: [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  answer: "Thursday"
},
{
  question: "What comes next in the pattern: 6, 18, 54, 162, ?",
  options: [
    "486",
    "496",
    "506",
    "516"
  ],
  answer: "486"
},
{
  question: "If a tricycle has 3 wheels, how many wheels do 18 tricycles have?",
  options: [
    "48",
    "51",
    "54",
    "57"
  ],
  answer: "54"
},
{
  question: "Which item is not a type of vegetable?",
  options: [
    "Carrot",
    "Broccoli",
    "Spinach",
    "Car"
  ],
  answer: "Car"
},
{
  question: "If today is Saturday, what day will it be in 63 days?",
  options: [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  answer: "Friday"
},
{
  question: "What comes next in the pattern: 3, 15, 35, 63, ?",
  options: [
    "95",
    "99",
    "103",
    "107"
  ],
  answer: "99"
},
{
  question: "If a square has 4 sides, how many sides do 22 squares have?",
  options: [
    "84",
    "88",
    "92",
    "96"
  ],
  answer: "88"
},
{
  question: "Which item is not a type of animal?",
  options: [
    "Lion",
    "Tiger",
    "Elephant",
    "Car"
  ],
  answer: "Car"
},
{
  question: "If today is Wednesday, what day was it 35 days ago?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Saturday"
},
{
  question: "What comes next in the pattern: 2, 12, 36, 80, ?",
  options: [
    "150",
    "160",
    "170",
    "180"
  ],
  answer: "150"
},
{
  question: "If a hexagon has 6 angles, how many angles do 15 hexagons have?",
  options: [
    "85",
    "90",
    "95",
    "100"
  ],
  answer: "90"
},
{
  question: "Which item is not a type of drink?",
  options: [
    "Water",
    "Juice",
    "Milk",
    "Car"
  ],
  answer: "Car"
},
{
  question: "If today is Sunday, what day will it be in 49 days?",
  options: [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  answer: "Sunday"
},
{
  question: "What comes next in the pattern: 5, 20, 60, 160, ?",
  options: [
    "400",
    "420",
    "440",
    "460"
  ],
  answer: "400"
},
{
  question: "If a hand has 5 fingers, how many fingers do 15 hands have?",
  options: [
    "65",
    "70",
    "75",
    "80"
  ],
  answer: "75"
},
{
  question: "Which item is not a type of planet?",
  options: [
    "Earth",
    "Mars",
    "Jupiter",
    "Car"
  ],
  answer: "Car"
},
{
  question: "If today is Monday, what day was it 70 days ago?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Wednesday"
},
{
  question: "What comes next in the pattern: 4, 20, 68, 212, ?",
  options: [
    "644",
    "664",
    "684",
    "704"
  ],
  answer: "644"
},
{
  question: "If a bicycle has 2 wheels, how many wheels do 20 bicycles have?",
  options: [
    "35",
    "40",
    "45",
    "50"
  ],
  answer: "40"
},
{
  question: "Which item is not a type of furniture?",
  options: [
    "Chair",
    "Table",
    "Desk",
    "Car"
  ],
  answer: "Car"
},
{
  question: "If today is Friday, what day will it be in 84 days?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Friday"
},
{
  question: "What comes next in the pattern: 1, 5, 17, 53, ?",
  options: [
    "161",
    "173",
    "185",
    "197"
  ],
  answer: "161"
},
{
  question: "If a pentagon has 5 sides, how many sides do 18 pentagons have?",
  options: [
    "85",
    "90",
    "95",
    "100"
  ],
  answer: "90"
},
{
  question: "Which item is not a type of clothing?",
  options: [
    "Shirt",
    "Pants",
    "Jacket",
    "Car"
  ],
  answer: "Car"
},
{
  question: "If today is Tuesday, what day was it 56 days ago?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 7, 28, 84, 224, ?",
  options: [
    "560",
    "580",
    "600",
    "620"
  ],
  answer: "560"
},
{
  question: "If a spider has 8 legs, how many legs do 15 spiders have?",
  options: [
    "110",
    "115",
    "120",
    "125"
  ],
  answer: "120"
},
{
  question: "Which item is not a type of weather?",
  options: [
    "Rain",
    "Snow",
    "Wind",
    "Car"
  ],
  answer: "Car"
},
{
  question: "If today is Thursday, what day will it be in 77 days?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Wednesday"
},
{
  question: "What comes next in the pattern: 3, 18, 63, 168, ?",
  options: [
    "423",
    "438",
    "453",
    "468"
  ],
  answer: "423"
},
{
  question: "If a triangle has 3 sides, how many sides do 23 triangles have?",
  options: [
    "63",
    "66",
    "69",
    "72"
  ],
  answer: "69"
},
{
  question: "Which item is not a type of food?",
  options: [
    "Bread",
    "Cheese",
    "Rice",
    "Chair"
  ],
  answer: "Chair"
},
{
  question: "If today is Saturday, what day was it 42 days ago?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Monday"
},
{
  question: "What comes next in the pattern: 2, 14, 48, 130, ?",
  options: [
    "338",
    "348",
    "358",
    "368"
  ],
  answer: "338"
},
{
  question: "If a hexagon has 6 sides, how many sides do 19 hexagons have?",
  options: [
    "108",
    "114",
    "120",
    "126"
  ],
  answer: "114"
},
{
  question: "Which item is not a type of bird?",
  options: [
    "Eagle",
    "Sparrow",
    "Robin",
    "Chair"
  ],
  answer: "Chair"
},
{
  question: "If today is Wednesday, what day will it be in 35 days?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Wednesday"
},
{
  question: "What comes next in the pattern: 5, 25, 85, 245, ?",
  options: [
    "625",
    "645",
    "665",
    "685"
  ],
  answer: "665"
},
{
  question: "If a car has 4 seats, how many seats do 18 cars have?",
  options: [
    "68",
    "72",
    "76",
    "80"
  ],
  answer: "72"
},
{
  question: "Which item is not a type of transportation?",
  options: [
    "Car",
    "Bus",
    "Train",
    "Chair"
  ],
  answer: "Chair"
},
{
  question: "If today is Sunday, what day was it 91 days ago?",
  options: [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  answer: "Thursday"
},
{
  question: "What comes next in the pattern: 4, 24, 80, 220, ?",
  options: [
    "540",
    "560",
    "580",
    "600"
  ],
  answer: "560"
},
{
  question: "If a tricycle has 3 wheels, how many wheels do 21 tricycles have?",
  options: [
    "57",
    "60",
    "63",
    "66"
  ],
  answer: "63"
},
{
  question: "Which item is not a type of vegetable?",
  options: [
    "Carrot",
    "Broccoli",
    "Spinach",
    "Chair"
  ],
  answer: "Chair"
},
{
  question: "If today is Monday, what day will it be in 56 days?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Monday"
},
{
  question: "What comes next in the pattern: 1, 11, 31, 69, ?",
  options: [
    "127",
    "137",
    "147",
    "157"
  ],
  answer: "127"
},
{
  question: "If a square has 4 corners, how many corners do 25 squares have?",
  options: [
    "95",
    "100",
    "105",
    "110"
  ],
  answer: "100"
},
{
  question: "Which item is not a type of animal?",
  options: [
    "Lion",
    "Tiger",
    "Elephant",
    "Chair"
  ],
  answer: "Chair"
},
{
  question: "If today is Friday, what day was it 49 days ago?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Friday"
  ],
  answer: "Friday"
},
{
  question: "What comes next in the pattern: 6, 30, 90, 210, ?",
  options: [
    "450",
    "470",
    "490",
    "510"
  ],
  answer: "450"
},
{
  question: "If a pentagon has 5 corners, how many corners do 16 pentagons have?",
  options: [
    "75",
    "80",
    "85",
    "90"
  ],
  answer: "80"
},
{
  question: "Which item is not a type of drink?",
  options: [
    "Water",
    "Juice",
    "Milk",
    "Chair"
  ],
  answer: "Chair"
},
{
  question: "If today is Tuesday, what day will it be in 98 days?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Thursday"
},
{
  question: "What comes next in the pattern: 3, 21, 63, 147, ?",
  options: [
    "315",
    "335",
    "355",
    "375"
  ],
  answer: "315"
},
{
  question: "If a hand has 5 fingers, how many fingers do 17 hands have?",
  options: [
    "80",
    "85",
    "90",
    "95"
  ],
  answer: "85"
},
{
  question: "Which item is not a type of planet?",
  options: [
    "Earth",
    "Mars",
    "Jupiter",
    "Chair"
  ],
  answer: "Chair"
},
{
  question: "If today is Thursday, what day was it 63 days ago?",
  options: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 2, 16, 54, 128, ?",
  options: [
    "250",
    "260",
    "270",
    "280"
  ],
  answer: "250"
},
{
  question: "If a bicycle has 2 pedals, how many pedals do 22 bicycles have?",
  options: [
    "40",
    "42",
    "44",
    "46"
  ],
  answer: "44"
},
{
  question: "Which item is not a type of furniture?",
  options: [
    "Chair",
    "Table",
    "Desk",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Saturday, what day will it be in 42 days?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday"
  ],
  answer: "Saturday"
},
{
  question: "What comes next in the pattern: 5, 30, 90, 210, ?",
  options: [
    "450",
    "470",
    "490",
    "510"
  ],
  answer: "450"
},
{
  question: "If a hexagon has 6 sides, how many sides do 21 hexagons have?",
  options: [
    "116",
    "120",
    "124",
    "126"
  ],
  answer: "126"
},
{
  question: "Which item is not a type of clothing?",
  options: [
    "Shirt",
    "Pants",
    "Jacket",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Wednesday, what day was it 98 days ago?",
  options: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday"
  ],
  answer: "Monday"
},
{
  question: "What comes next in the pattern: 7, 35, 105, 245, ?",
  options: [
    "525",
    "545",
    "565",
    "585"
  ],
  answer: "525"
},
{
  question: "If a spider has 8 legs, how many legs do 18 spiders have?",
  options: [
    "136",
    "140",
    "144",
    "148"
  ],
  answer: "144"
},
{
  question: "Which item is not a type of weather?",
  options: [
    "Rain",
    "Snow",
    "Wind",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Sunday, what day will it be in 70 days?",
  options: [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  answer: "Friday"
},
{
  question: "What comes next in the pattern: 4, 28, 84, 196, ?",
  options: [
    "420",
    "440",
    "460",
    "480"
  ],
  answer: "420"
},
{
  question: "If a triangle has 3 angles, how many angles do 26 triangles have?",
  options: [
    "72",
    "76",
    "78",
    "82"
  ],
  answer: "78"
},
{
  question: "Which item is not a type of food?",
  options: [
    "Bread",
    "Cheese",
    "Rice",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Monday, what day was it 84 days ago?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Monday"
},
{
  question: "What comes next in the pattern: 1, 13, 40, 94, ?",
  options: [
    "202",
    "212",
    "222",
    "232"
  ],
  answer: "202"
},
{
  question: "If a pentagon has 5 sides, how many sides do 20 pentagons have?",
  options: [
    "95",
    "100",
    "105",
    "110"
  ],
  answer: "100"
},
{
  question: "Which item is not a type of bird?",
  options: [
    "Eagle",
    "Sparrow",
    "Robin",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Friday, what day will it be in 63 days?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Wednesday"
},
{
  question: "What comes next in the pattern: 3, 24, 75, 168, ?",
  options: [
    "315",
    "335",
    "355",
    "375"
  ],
  answer: "315"
},
{
  question: "If a car has 4 tires, how many tires do 17 cars have?",
  options: [
    "64",
    "66",
    "68",
    "70"
  ],
  answer: "68"
},
{
  question: "Which item is not a type of transportation?",
  options: [
    "Car",
    "Bus",
    "Train",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Tuesday, what day was it 70 days ago?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Thursday"
},
{
  question: "What comes next in the pattern: 6, 36, 108, 252, ?",
  options: [
    "540",
    "560",
    "580",
    "600"
  ],
  answer: "540"
},
{
  question: "If a tricycle has 3 wheels, how many wheels do 24 tricycles have?",
  options: [
    "66",
    "69",
    "72",
    "75"
  ],
  answer: "72"
},
{
  question: "Which item is not a type of vegetable?",
  options: [
    "Carrot",
    "Broccoli",
    "Spinach",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Thursday, what day will it be in 91 days?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Wednesday"
},
{
  question: "What comes next in the pattern: 2, 20, 74, 218, ?",
  options: [
    "650",
    "670",
    "690",
    "710"
  ],
  answer: "650"
},
{
  question: "If a square has 4 sides, how many sides do 28 squares have?",
  options: [
    "108",
    "112",
    "116",
    "120"
  ],
  answer: "112"
},
{
  question: "Which item is not a type of animal?",
  options: [
    "Lion",
    "Tiger",
    "Elephant",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Saturday, what day was it 56 days ago?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Saturday"
},
{
  question: "What comes next in the pattern: 5, 35, 105, 245, ?",
  options: [
    "525",
    "545",
    "565",
    "585"
  ],
  answer: "525"
},
{
  question: "If a hexagon has 6 corners, how many corners do 18 hexagons have?",
  options: [
    "102",
    "106",
    "108",
    "112"
  ],
  answer: "108"
},
{
  question: "Which item is not a type of drink?",
  options: [
    "Water",
    "Juice",
    "Milk",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Wednesday, what day will it be in 84 days?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Wednesday"
},
{
  question: "What comes next in the pattern: 7, 42, 126, 294, ?",
  options: [
    "630",
    "650",
    "670",
    "690"
  ],
  answer: "630"
},
{
  question: "If a hand has 5 fingers, how many fingers do 19 hands have?",
  options: [
    "90",
    "95",
    "100",
    "105"
  ],
  answer: "95"
},
{
  question: "Which item is not a type of planet?",
  options: [
    "Earth",
    "Mars",
    "Jupiter",
    "Book"
  ],
  answer: "Book"
},
{
  question: "If today is Sunday, what day was it 77 days ago?",
  options: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 4, 32, 96, 224, ?",
  options: [
    "480",
    "500",
    "520",
    "540"
  ],
  answer: "480"
},
{
  question: "If a bicycle has 2 wheels, how many wheels do 24 bicycles have?",
  options: [
    "44",
    "46",
    "48",
    "50"
  ],
  answer: "48"
},
{
  question: "Which item is not a type of furniture?",
  options: [
    "Chair",
    "Table",
    "Desk",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Monday, what day will it be in 105 days?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 1, 15, 50, 120, ?",
  options: [
    "225",
    "245",
    "265",
    "285"
  ],
  answer: "225"
},
{
  question: "If a pentagon has 5 sides, how many sides do 22 pentagons have?",
  options: [
    "105",
    "110",
    "115",
    "120"
  ],
  answer: "110"
},
{
  question: "Which item is not a type of clothing?",
  options: [
    "Shirt",
    "Pants",
    "Jacket",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Friday, what day was it 91 days ago?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Thursday"
},
{
  question: "What comes next in the pattern: 3, 27, 81, 189, ?",
  options: [
    "405",
    "425",
    "445",
    "465"
  ],
  answer: "405"
},
{
  question: "If a spider has 8 legs, how many legs do 21 spiders have?",
  options: [
    "158",
    "164",
    "168",
    "172"
  ],
  answer: "168"
},
{
  question: "Which item is not a type of weather?",
  options: [
    "Rain",
    "Snow",
    "Wind",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Tuesday, what day will it be in 77 days?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Thursday"
},
{
  question: "What comes next in the pattern: 6, 42, 126, 294, ?",
  options: [
    "630",
    "650",
    "670",
    "690"
  ],
  answer: "630"
},
{
  question: "If a triangle has 3 sides, how many sides do 29 triangles have?",
  options: [
    "81",
    "84",
    "87",
    "90"
  ],
  answer: "87"
},
{
  question: "Which item is not a type of food?",
  options: [
    "Bread",
    "Cheese",
    "Rice",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Thursday, what day was it 105 days ago?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Sunday"
},
{
  question: "What comes next in the pattern: 2, 22, 66, 154, ?",
  options: [
    "330",
    "340",
    "350",
    "360"
  ],
  answer: "330"
},
{
  question: "If a hexagon has 6 sides, how many sides do 24 hexagons have?",
  options: [
    "138",
    "144",
    "150",
    "156"
  ],
  answer: "144"
},
{
  question: "Which item is not a type of bird?",
  options: [
    "Eagle",
    "Sparrow",
    "Robin",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Saturday, what day will it be in 49 days?",
  options: [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  answer: "Saturday"
},
{
  question: "What comes next in the pattern: 5, 40, 120, 280, ?",
  options: [
    "600",
    "620",
    "640",
    "660"
  ],
  answer: "600"
},
{
  question: "If a car has 4 seats, how many seats do 21 cars have?",
  options: [
    "80",
    "84",
    "88",
    "92"
  ],
  answer: "84"
},
{
  question: "Which item is not a type of transportation?",
  options: [
    "Car",
    "Bus",
    "Train",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Wednesday, what day was it 84 days ago?",
  options: [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  answer: "Wednesday"
},
{
  question: "What comes next in the pattern: 7, 49, 147, 343, ?",
  options: [
    "735",
    "755",
    "775",
    "795"
  ],
  answer: "735"
},
{
  question: "If a tricycle has 3 wheels, how many wheels do 27 tricycles have?",
  options: [
    "77",
    "81",
    "85",
    "89"
  ],
  answer: "81"
},
{
  question: "Which item is not a type of vegetable?",
  options: [
    "Carrot",
    "Broccoli",
    "Spinach",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Sunday, what day will it be in 98 days?",
  options: [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  answer: "Friday"
},
{
  question: "What comes next in the pattern: 4, 36, 108, 252, ?",
  options: [
    "540",
    "560",
    "580",
    "600"
  ],
  answer: "540"
},
{
  question: "If a square has 4 corners, how many corners do 31 squares have?",
  options: [
    "120",
    "124",
    "128",
    "132"
  ],
  answer: "124"
},
{
  question: "Which item is not a type of animal?",
  options: [
    "Lion",
    "Tiger",
    "Elephant",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Monday, what day was it 63 days ago?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Wednesday"
},
{
  question: "What comes next in the pattern: 1, 17, 51, 119, ?",
  options: [
    "255",
    "265",
    "275",
    "285"
  ],
  answer: "255"
},
{
  question: "If a pentagon has 5 corners, how many corners do 19 pentagons have?",
  options: [
    "90",
    "95",
    "100",
    "105"
  ],
  answer: "95"
},
{
  question: "Which item is not a type of drink?",
  options: [
    "Water",
    "Juice",
    "Milk",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Friday, what day will it be in 70 days?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Thursday"
},
{
  question: "What comes next in the pattern: 3, 30, 90, 210, ?",
  options: [
    "450",
    "470",
    "490",
    "510"
  ],
  answer: "450"
},
{
  question: "If a hand has 5 fingers, how many fingers do 21 hands have?",
  options: [
    "100",
    "105",
    "110",
    "115"
  ],
  answer: "105"
},
{
  question: "Which item is not a type of planet?",
  options: [
    "Earth",
    "Mars",
    "Jupiter",
    "Pencil"
  ],
  answer: "Pencil"
},
{
  question: "If today is Tuesday, what day was it 91 days ago?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Sunday"
},
{
  question: "What comes next in the pattern: 6, 48, 144, 336, ?",
  options: [
    "720",
    "740",
    "760",
    "780"
  ],
  answer: "720"
},
{
  question: "If a bicycle has 2 pedals, how many pedals do 26 bicycles have?",
  options: [
    "48",
    "50",
    "52",
    "54"
  ],
  answer: "52"
},
{
  question: "Which item is not a type of furniture?",
  options: [
    "Chair",
    "Table",
    "Desk",
    "Shoe"
  ],
  answer: "Shoe"
},
{
  question: "If today is Thursday, what day will it be in 105 days?",
  options: [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  answer: "Friday"
},
{
  question: "What comes next in the pattern: 2, 24, 72, 168, ?",
  options: [
    "360",
    "380",
    "400",
    "420"
  ],
  answer: "360"
},
{
  question: "If a hexagon has 6 sides, how many sides do 26 hexagons have?",
  options: [
    "152",
    "156",
    "160",
    "164"
  ],
  answer: "156"
},
{
  question: "Which item is not a type of clothing?",
  options: [
    "Shirt",
    "Pants",
    "Jacket",
    "Shoe"
  ],
  answer: "Shoe"
},
{
  question: "If today is Saturday, what day was it 98 days ago?",
  options: [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  answer: "Thursday"
},
{
  question: "What comes next in the pattern: 5, 45, 135, 315, ?",
  options: [
    "675",
    "695",
    "715",
    "735"
  ],
  answer: "675"
},
{
  question: "If a spider has 8 legs, how many legs do 24 spiders have?",
  options: [
    "184",
    "188",
    "192",
    "196"
  ],
  answer: "192"
},
{
  question: "Which item is not a type of weather?",
  options: [
    "Rain",
    "Snow",
    "Wind",
    "Shoe"
  ],
  answer: "Shoe"
},
{
  question: "If today is Wednesday, what day will it be in 91 days?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 7, 56, 168, 392, ?",
  options: [
    "840",
    "860",
    "880",
    "900"
  ],
  answer: "840"
},
{
  question: "If a triangle has 3 angles, how many angles do 32 triangles have?",
  options: [
    "92",
    "96",
    "100",
    "104"
  ],
  answer: "96"
},
{
  question: "Which item is not a type of food?",
  options: [
    "Bread",
    "Cheese",
    "Rice",
    "Shoe"
  ],
  answer: "Shoe"
},
{
  question: "If today is Sunday, what day was it 70 days ago?",
  options: [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  answer: "Friday"
},
{
  question: "What comes next in the pattern: 4, 40, 120, 280, ?",
  options: [
    "600",
    "620",
    "640",
    "660"
  ],
  answer: "600"
},
{
  question: "If a pentagon has 5 sides, how many sides do 24 pentagons have?",
  options: [
    "115",
    "120",
    "125",
    "130"
  ],
  answer: "120"
},
{
  question: "Which item is not a type of bird?",
  options: [
    "Eagle",
    "Sparrow",
    "Robin",
    "Shoe"
  ],
  answer: "Shoe"
},
{
  question: "If today is Monday, what day will it be in 63 days?",
  options: [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday"
  ],
  answer: "Sunday"
},
{
  question: "What comes next in the pattern: 1, 19, 57, 133, ?",
  options: [
    "285",
    "295",
    "305",
    "315"
  ],
  answer: "285"
},
{
  question: "If a car has 4 tires, how many tires do 20 cars have?",
  options: [
    "76",
    "80",
    "84",
    "88"
  ],
  answer: "80"
},
{
  question: "Which item is not a type of transportation?",
  options: [
    "Car",
    "Bus",
    "Train",
    "Shoe"
  ],
  answer: "Shoe"
},
{
  question: "If today is Friday, what day was it 77 days ago?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 3, 33, 99, 231, ?",
  options: [
    "495",
    "515",
    "535",
    "555"
  ],
  answer: "495"
},
{
  question: "If a tricycle has 3 wheels, how many wheels do 30 tricycles have?",
  options: [
    "86",
    "90",
    "94",
    "98"
  ],
  answer: "90"
},
{
  question: "Which item is not a type of vegetable?",
  options: [
    "Carrot",
    "Broccoli",
    "Spinach",
    "Shoe"
  ],
  answer: "Shoe"
},
{
  question: "If today is Tuesday, what day will it be in 84 days?",
  options: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday"
  ],
  answer: "Tuesday"
},
{
  question: "What comes next in the pattern: 6, 54, 162, 378, ?",
  options: [
    "810",
    "830",
    "850",
    "870"
  ],
  answer: "810"
},
{
  question: "If a square has 4 sides, how many sides do 34 squares have?",
  options: [
    "132",
    "136",
    "140",
    "144"
  ],
  answer: "136"
},
{
  question: "Which item is not a type of animal?",
  options: [
    "Lion",
    "Tiger",
    "Elephant",
    "Shoe"
  ],
  answer: "Shoe"
},
{
  question: "If today is Thursday, what day was it 49 days ago?",
  options: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ],
  answer: "Thursday"
},
{
  question: "What comes next in the pattern: 2, 26, 78, 182, ?",
  options: [
    "390",
    "410",
    "430",
    "450"
  ],
  answer: "390"
},
{
  question: "If a hexagon has 6 corners, how many corners do 21 hexagons have?",
  options: [
    "122",
    "126",
    "130",
    "134"
  ],
  answer: "126"
},
{
  question: "Which item is not a type of drink?",
  options: [
    "Water",
    "Juice",
    "Milk",
    "Shoe"
  ],
  answer: "Shoe"
}
                ];
      


            /*
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
            */
            
            // Select random question
            const question = questions[Math.floor(Math.random() * questions.length)];
            this.currentProblem = question;
        },
        
        checkIQAnswer(answer) {
            if (answer === this.currentProblem.answer) {
                this.showFeedback(true);
                this.currentScore += 3;
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

          
