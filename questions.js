let iquestions = [
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
