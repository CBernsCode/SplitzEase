# SplitzEase
By: Chris Berns (Backend) and Kyle Demers (Fronted)

Alpha Release Status
--------------------------------------
Currently, the alpha release has 80% of the functionality working in the backend and 80% of the frontend design is finalized.

What Was Completed
--------------------------------------
We've completed a very large chunk of our project and have a solid base to move forward with the next couple of releases. Almost everything we need in the frontend and backend is in place, but we haven't started combining the functionality quite yet. We have a test page for firebase to make sure all of the backend components are working properly and for the frontend, we mostly have placeholders that print to the debug console to make sure the buttons and menus are functioning correctly.

What Works
--------------------------------------
Backend
    - Firebase Login / Logout
    - Adding Friends
    - Removing Friends
    - Getting Checks
    - Paying Checks
Frontend
    - Modal Menus (for creating invites and adding friends)
    - Login Screen Toggle (to switch between login / register)
    - Pay button on the Checks screen clears the check from the list of checks

What Does Not Work
--------------------------------------
The interactive portions of the frontend are currently not connected to the backend (except for the Firebase Test screen to prove that the backend is in working condition).

How Much Is Left To Do
--------------------------------------
Merging the frontend and the backend is the main thing that we still need to complete as a group.

Backend
    - 

Frontend
    - I need to figure out if I want to create a separate screen for a friends list or if I should create a new component for a friends lis in the Account screen because both seem like reasonable options from a UX point of view
    - I still have some areas that I need make a little more uniform between screens like the margins, buttons, and border colors
    - I'm also still not 100% sold on having a title on each screen since we have a navigator on the bottom of the screen that says which screen the user is currently looking at.
