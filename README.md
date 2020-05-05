# US COVID-19 Tracker

## Overview
This web page displays US COVID-19 data sourced from [The COVID Tracking Project's API](https://covidtracking.com/api). The user may see data for the US as a whole or by State. The data can also be further stratified by date. A graph showing deaths, infections, hospitalizations, and recoveries is also provided.

[The web page can be accessed here](https://nicolas-dolan.github.io/US-COVID-19-Tracker/)

## Development
This was built using vanilla JavaScript, Chart.js, Bulma, and Moment. It took 4.5 hours to build.

## Challenges and Future Improvements
I decided against using React because this is a relatively simple application and I wanted to keep it light weight. However, using React would have given the project more flexibility and would have allowed me to write less code.

I attempted to add testing with Mocha and Chai, however, this was unsuccesful as I was not able to test functions that were nested in my 'init' function (an event listener function that ensured that the DOM had loaded before async functions were allowed to make requests to the API). If I were to do the project again, I would do it in React because I am more familiar with testing in that environment. Ultimately, I had to abandon testing because of time constraints but I plan to revist it in future.

## Key learnings
I enjoyed revisting vanilla JavaScript as I usually work in React. Doing the project reminded me of the limitation of vanilla JavaScript, which I will take into consideration when planning future projects.

I also found it rewarding to be working on something that is very current and impactful in addition to having relevance to my medical/scientific background.