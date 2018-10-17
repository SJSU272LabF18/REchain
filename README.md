# Project Team-20
### Neil Shah, Archana Yadawa, Nishtha Atrey, Kruti Thukral


_Shortlisted Ideas_


## 1. Improving search experience on BigData 

### Problem statement: 

Lots of companies(Cisco, etc)  and organizations have tons of data and other information stored in their database and possibly millions of users access these websites each day. They spend a lot of time trying to search for the information they need on these websites using the website’s search bars. How can we directly answer the question that the visitor/customer/student has without having them go through 100+ URLs and read through the corresponding documentation on those URLs? No one likes to spend more than a min on search and look past the first page of results.


### Proposed Methodology:

- Extract key phrases from documents (bigrams/Trigrams that are the most significantly and semantically representative of the content)
- Extract synonyms for Unigrams/Keyphrases identified above and use it for query expansion for search (eg: restrictions-> limitations, password reset -> password change)
- Come up with large set of valid query auto-suggests entries from unstructured content
- Extract entries from unstructured content and match it to entities extracted from search query
- Find all documents that are full/partial semantic match to the search query (beyond basic keyword search)


## 2. SJSU Chatbot 

### Project Description/Problem Statement: 

Freshman year in college can be intimidating. Being surrounded by a new place can be overwhelming. Especially in a big campus like SJSU. With the spread of messenger services, virtual Chatbots that imitate human conversations for solving various tasks are becoming increasingly in demand. They are a reliable technology that can help provide viable information to make students’ lives less stressful and more efficient. By placing chatbots in various key locations all around SJSU, students will be able to ask questions, get directions, learn about events, and gain useful information about all the resources SJSU provides.

### Proposed Methodology: 

- Establish a platform for hosting chatbot (facebook, slack, etc.)
- Establish a service to build chatbot (Microsoft bot frameworks, Wit.ai, Api.ai, Watson)
- Key programming concept which should be used: NLP (Natural Language Programming). NLP API which can be used include: Microsoft LUIS, Wit.ai, Api.ai
- Python can also be used to program chatbot along with NLTK and scikit. NLTK (Natural Language ToolKit): leading platform for building Python programs with human language data. 
- Programming steps:
    - Install NLTK package
    - Create and import reflections (dictionary of words/phrases chatbot will use)
    - Create pairs which consist of potential questions and answers
    - Implement algorithms 
    - Create interface
    - Add design elements
- Key design elements: 
    - Interactive Buttons - Promotes user friendly interface
    - “Get Started Button” - User can click the “get started” button to learn more about chatbot and use it 
    - Ask question feature - User can ask chatbot any questions
    - Quick reply - chatbot will analyze user’s question and give an optimal reply in a timely manner
    - Menu - drop down menu will allow users to choose various different tasks 


## 3. IOT for laundry system

### Problem statement: 

During the weekend and peak hours, getting laundry done can be a tedious task as most of the machines might be occupied . In such a scenario, having the capability of checking the availability of laundry machines can prove to be useful. Such systems will help make life more comfortable by providing means to track status of laundry machines and thus eventually save on time and trips to the laundry room

### Proposed Methodology:

Install vibration sensors on the washing machine and drying machines using arduino vibration sensor 
Send vibration data periodically to a server 
Server will collect the vibration data and compute the status of the machines 
The availability can be checked from a web client

