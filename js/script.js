/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
  Add two global variables, one is an array to store LI elements containg student items.
  The other variable stores a number that indicates how many student display on one page. 
*/
const studentList = document.querySelectorAll('li');
const perPage = 10;

/* 
   Create the `showPage` function that has parameters, list and pageNumber.
   This function creates two variables to dynamically determine start and end index in the given list argument.
   This function loops thorough each items and update its display property depending, depending on the given condition.
*/
const showPage = (list, pageNumber) => {
   const startIndex = (pageNumber * perPage) - perPage;
   const endIndex = pageNumber * perPage;

   for (let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}

/*
   Create the 'appendPageLinks' function to created and append the pagination links.
   This function builds a DOM Element for pagination functionality 
   and add a 'click'event listener to each 'a' element to call the 'showPage' function.
*/
const appendPageLinks = list => {
   const mainDiv = document.querySelector('.page');
   const div = document.createElement('div');
   div.className = "pagination";

   const ul = document.createElement('ul');
   const pages = Math.ceil(list.length / perPage);

   if(pages > 0) {
      for (let i = 1; i <= pages; i++) {
         let li = document.createElement('li');
         let a = document.createElement('a');
         
         a.href = "#";
         a.textContent = i;
         li.appendChild(a);
         ul.appendChild(li);
      }
      
      const links = ul.querySelectorAll('a');
      links[0].className = "active";

      for(let i= 0; i < links.length; i++) {
         links[i].addEventListener('click', (e) => {
            const link = e.target;
            for(let j= 0; j < links.length; j++) {
               links[j].className = "";
            }
            link.className = 'active';
            showPage(list, link.textContent);
         })
      }
   }
   div.appendChild(ul);
   mainDiv.appendChild(div);
}

/*
   Create the 'addSearch' function to created and append the search HTML.
*/
const addSearch = () => {
   const mainDiv = document.querySelector('.page');
   const headerDiv = document.querySelector('.page-header');
   const searchDiv = document.createElement('div');
   const input = document.createElement('input');
   const button = document.createElement('button');
   const names = document.querySelectorAll('h3');

   //Create the 'searchStudent' function to filer the student list using given input.
   function searchStudent () {
      const text = input.value.toLowerCase();

      // loop over the student list and update css display property by using includes() method.
      for(let i = 0; i < names.length; i++) {
         if(names[i].textContent.includes(text)) {
            studentList[i].style.display = 'block';
         } else {
            studentList[i].style.display = 'none';
         }
      }
      
      //Create a node list of matched student li element 
      const searchList = ul.querySelectorAll('li[style="display: block;"]');

      //Create conditional statemet, if the searchList has nothing, display 'NO RESULT' message on the screen.
      //If not, call the showPage function with the arguments; searchList and 1.
      if(searchList.length == 0) {
         errorMessage.textContent = 'NO RESULT';
      } else {
         showPage(searchList, 1);
         errorMessage.textContent = '';
      }

      //Create new pagination links with the argument; searchList.
      const paginaionDiv = document.querySelector('.pagination');
      mainDiv.removeChild(paginaionDiv);
      appendPageLinks(searchList);
   }

    //Add attributes to search component.
   searchDiv.className = 'student-search';
   input.placeholder = "Search for students...";
   button.textContent = 'Search';

   //Add search component to HTML document.
   searchDiv.appendChild(input);
   searchDiv.appendChild(button);
   headerDiv.appendChild(searchDiv);

   //Add a 'p' element to display an error message when the search function returns nothing.
   const errorMessage = document.createElement('p');
   const ul = document.querySelector('.student-list');
   mainDiv.insertBefore(errorMessage, ul);

   //Add an event listener to the 'search' button.
   button.addEventListener('click', (e) => {
      searchStudent ();
   });

   //Add an event listener to the input element.
   input.addEventListener('keyup', (e) => {
      searchStudent ();
   });
}

//Call back functions to initialize the page.
showPage(studentList, 1);
appendPageLinks(studentList);
addSearch();