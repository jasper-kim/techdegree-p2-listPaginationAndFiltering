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
         studentList[i].style.display = ''
      } else {
         studentList[i].style.display = 'none'
      }
   }

}

/*
   Create the `appendPageLinks function` to code the pagination buttons.
   This function builds a DOM Element for pagination functionality 
   and add a 'click'event listener to each 'a' element to call the 'showPage' function.
*/
const appendPageLinks = list => {
   const mainDiv = document.querySelector('.page');
   const div = document.createElement('div');
   div.className = "pagination";

   const ul = document.createElement('ul');
   const pages = Math.ceil(list.length / perPage);

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

   div.appendChild(ul);
   mainDiv.appendChild(div);

   for(let i= 0; i < links.length; i++) {
      links[i].addEventListener('click', (e) => {
         const link = e.target;
         for(let j= 0; j < links.length; j++) {
            links[j].className = "";
         }
         link.className = 'active';
         showPage(studentList, link.textContent);
      })
   }
}

//Call back functions to initialize the page.
showPage(studentList, 1);
appendPageLinks(studentList);