# JOURNAL APP

Digital journal with the goal to increase the usage of self reflection as it applies to mental Wellbeing. Check it out on [Devpost](https://devpost.com/software/cheqin).


This project consists of four modules:

- ### app
  - This is the front end application allowing for users to view their past week of emotions and journal entries.
- ### api
  - This is a cloud deployed api performing CRUD operations between the input/output components and the Firestore database.
- ### jovo
  - This is the interface with the Google Assistant api. The app has a pleasant conversation with the user to obtain their voice input.
- ### ml
  - This is the indico machine learning interface which analyzes the user-generated text and returns the evaluated emotion weights of the text.
