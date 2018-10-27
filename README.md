# Project Team-20
### **Team Members:** Neil Shah, Archana Yadawa, Nishtha Atrey, Kruti Thukral



## _Shortlisted Ideas:_

## 1. BlockChain for RealEsate title records

### Problem statement: 

One of the biggest challenges in buying/selling real estate, especially in a country like India, is the legal process of checking the property's title. The percentage of frauds that happen in that domain are enormous(upwards of 50%) and expensive. A person would have to hire a lawyer and wait for 1-2 months until the legal check is done and even then there is no gurantee that the title is clear.  

Title records are decentralized, challenging-to-access aspect of the real estate buying/selling process. Even in 2017, title information remains stored at the local level and is offline. With the blockchain, this can be changed. The blockchain could provide a central title database for the entire country to securely store and instantly access historical title records, allowing for the streamlining of title transfer in a property sale. 


### Proposed Methodology: (Using HyperLedger Fabric, Docker, MEAN stack)

- Property details need to be tracked, de-centralized and accessable to buyer/seller. 
- Hyper Ledger Fabric will provide - Identity management, Privacy and confidentiality, Efficient processing, Chaincode functionalities, Modular design
- Create a front-end app/web portal where buyer/seller can search for properties and view all of its title details
- Back-end node server will handle requests for transactions and write to decentralized ledger



## 2. Improving search experience on SJSU website/(any BigData) 

### Problem statement: 

While I was applying for the graduate course at SJSU I remember going over to SJSU's website and tyring to use their search bar to look for specific information regarding the different programs and professors that I was interested in. The search would always return several irrelevant links that had be looking through the entire page for what I actually wanted. The search requires some understand of natural language questions to figure out where the best answer would be. 
A similar problem exists in several companies as well that have a lot of product information that has built up through the years. 


### Proposed Methodology: (Using elastic stack, ML, NLP)

- Extract key phrases from documents (bigrams/Trigrams that are the most significantly and semantically representative of the content)
- Extract synonyms for Unigrams/Keyphrases identified above and use it for query expansion for search (eg: restrictions-> limitations, password reset -> password change)
- Come up with large set of valid query auto-suggests entries from unstructured content
- Extract entries from unstructured content and match it to entities extracted from search query
- Find all documents that are full/partial semantic match to the search query (beyond basic keyword search)


## 3. SJSU Chatbot 

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


## 4. IOT for laundry system

### Problem statement: 

During the weekend and peak hours, getting laundry done can be a tedious task as most of the machines might be occupied . In such a scenario, having the capability of checking the availability of laundry machines can prove to be useful. Such systems will help make life more comfortable by providing means to track status of laundry machines and thus eventually save on time and trips to the laundry room

### Proposed Methodology:

Install vibration sensors on the washing machine and drying machines using arduino vibration sensor 
Send vibration data periodically to a server 
Server will collect the vibration data and compute the status of the machines 
The availability can be checked from a web client

