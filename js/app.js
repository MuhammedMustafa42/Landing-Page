//storing the sections in a variable that will be the list items of the unordered list.
const everySection = document.querySelectorAll("section");
//storing the navigation bar's unordered list in a variable to store the list items (sections) in it.
const navBarList = document.getElementById("navbar__list");

//create a function that accesses every section with a for loop and creates a list item for every section.
function addSectionItem() {
  //Document fragment is used as a lightweight version of document object to store the items in it.
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < everySection.length; i++) {
    let item = document.createElement("li");
    item.innerHTML = `<li id="navSection${i + 1}" data-nav="section${
      i + 1
    }" class="menu__link">Section ${i + 1}</li>`;
    fragment.appendChild(item);

    navBarList.appendChild(fragment);
  }
}
addSectionItem();

//stores a node list of all the elements with the class menu_link
const listItems = document.querySelectorAll(".menu__link");
//loops inside the listItem node list to add an event listener to each item that invokes the scrollIntoView
//function when an item is clicked.
listItems.forEach((item) => {
  item.addEventListener("click", () => {
    //stores the <section> element that has the same id value as the list item's data-nav value.
    let clickedItem = document.getElementById(item.getAttribute("data-nav"));
    clickedItem.scrollIntoView({ behavior: "smooth" });
  });
});

//a function that determines the the active section by using a for each loop and adds the "your-active-class" class
//to the current section in the viewport. and also give the current list item in the navbar the "highlight" class.
function activeSection() {
  everySection.forEach((sec) => {
    if (
      sec.getBoundingClientRect().top >= -300 &&
      sec.getBoundingClientRect().top <= 300
    ) {
      sec.classList.add("your-active-class");
      //gets the active section's id to compare it with the list item's attribute "data-nav" by using a forEach loop
      //to give that item the "highlight" class.
      sec.getAttribute("id");
      listItems.forEach((item) => {
        //removes the "highlight" class if the list item has one, if not it continues.
        item.classList.remove("highlight");
        if (item.getAttribute("data-nav") === sec.getAttribute("id")) {
          item.classList.add("highlight");
        }
      });
    } else {
      //remove the active class when not in viewport.
      sec.classList.remove("your-active-class");
    }
  });
}
//the event listener that calls the active section function when scrolling.
window.addEventListener("scroll", activeSection);

//store the navigation bar element to use it to hide and view the navbar onScroll event
const navigationBar = document.getElementById("navbar__list");

//hides the navbar when not scrolling by setting a timeout when not scrolling and resetting it
//when scrolling with clearTimeout.
let counter = 0;
document.addEventListener("scroll", () => {
  if (counter !== 0) {
    clearTimeout(counter);
    navigationBar.style.cssText = "opacity: 1;";
  }
  counter = setTimeout(() => {
    navigationBar.style.cssText = "height: 0; opacity: 0;";
  }, 2000);
});

//getting the element with id="button"  and storing it in a variable.
const scrollToTopButton = document.getElementById("button");

//event listener and a function that hides the button and only shows it
//when scrolling down.
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 800) {
    scrollToTopButton.style.cssText = "opacity: 1;";
  } else {
    scrollToTopButton.style.cssText = "opacity: 0;";
  }
});

//gives functionality to the button when clicking on it
//it scroll the viewport back to the top.
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
