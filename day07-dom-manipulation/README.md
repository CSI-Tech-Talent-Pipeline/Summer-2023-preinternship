# DOM Manipulation

Students Will Be Able To (SWBAT)
--------------------------------

By the end of this codealong, students will be able to:

- Understand the basics of the Document Object Model (DOM) and how it represents an HTML document.
- Access and manipulate HTML elements using JavaScript's built-in DOM methods.
- Create, modify, and remove HTML elements dynamically using JavaScript.
- Understand what DOM events are and how they help to make web pages interactive.
- Attach event listeners to HTML elements to trigger JavaScript functions when certain events occur.

Agenda
------

- **Section 1: Introduction to the DOM**
  -   Understand the basic structure of the DOM
  -   Learn about DOM nodes and elements.
  -   Practice accessing HTML elements using JavaScript.
- **Section 2: Manipulating the DOM**
  -   Learn how to modify existing HTML elements.
  -   Practice adding and removing HTML elements dynamically.
- **Section 3: Introduction to DOM Events**
  -   Understand what DOM events are.
  -   Learn about different types of DOM events.
- **Section 4: Event Listeners**
  -   Understand what event listeners are and why they're used.
  -   Practice adding event listeners to HTML elements.

Section 1: Introduction to the DOM
----------------------------------

### 1. Accessing the root node (`document`) and other HTML elements (`document.body`, `document.getElementById()`, etc.)

### 2.  Traversing the DOM tree using parent-child and sibling relationships.

### 3.  Accessing and modifying attributes and text content of HTML elements.

#### Example 1: Accessing the root node and other HTML elements

![HTML vs DOM Tree](https://res.cloudinary.com/dlzuobe8h/image/upload/v1687215720/CSI%20TTP/07-dom-html-vs-dom-tree_x7z6lg.png)

Before we hop into some examples, it's important to recognize the DOM as a tree data structure. Trees are made up of [nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node) and in the case of the DOM, many of those nodes are also HTML [Elements](https://developer.mozilla.org/en-US/docs/Web/API/Element).
Before we begin, make sure you have linked your HTML file to a JavaScript file. Add the following element to the `<head>` of the HTML document.

```html
<script defer src="app.js"></script>
```

Now, let's start by accessing the root node (`document`).

Create a new file `app.js` and add the following code:

```js
console.log(document);
```

Run your HTML file in your browser with Live Server and open the console. You should see the entire document object printed. In short the DOM (Document Object Model) is a data structure used to model the HTML document as a JavaScript object. The data structure in this case, is a tree of nodes.

Next, let's access the body of our HTML document. Update `app.js`:

```js
console.log(document.body);
```

Again, open the HTML file in the browser and check the console. This time you should see only the body object printed. We can expand the object in the console and see that there may be similar properties there, but some have different values.

If we want to retrieve a particular element on the page, there are multiple DOM methods we can use to do so. If the element in question has an `id` attribute, we can use `document.getElementById()` to retrieve it.

```js
console.log(document.getElementById('jobs'));
```

Notice that when we do that, we see what looks like HTML in the console. In this case, we're actually looking at a JavaScript object that represents the html tag with an id of `jobs`. To demonstrate this, try adding the following:

```js
console.log(document.getElementById('jobs').id);
console.log(document.getElementById('jobs').textContent);
```

Now, you can see that the `<section>` element we get from `document.getElementById('jobs')` has properties like `id` and `textContent` that we can access. Here's a list of some commonly used methods for querying the DOM (searching for element(s) that match):

- [`querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [`querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
- [`getElementById()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
- [`getElementsByClassName()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)
- [`getElementsByTagName()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName)

### **Example 2: Traversing the DOM tree using parent-child and sibling relationships**

To access a specific element, we often use methods like `getElementById()` or `querySelector()`. We could also use `getElementsByClassName()`, `getElementsByTagName()` combined with bracket notation in a `for` loop to get access to specific elements. Whichever way we get to an element, once we have it, we can navigate to other related elements using properties like `parentElement`, `children`, `nextElementSibling`, or `previousElementSibling`.

Let's try accessing the first job's information.

```js
const firstJob = document.getElementsByClassName("j-desc")[0];
// we could also do document.querySelector(".j-desc") to get the same element as by default it will retrieve the first match to the CSS selector
console.log(firstJob);
```

Here, `getElementsByClassName` returns a live HTMLCollection, so we use `[0]` to access the first element. 

Then, we can access related elements by invoking other methods. Try out the below in the console:

```js
console.log(firstJob.parentElement) // section#jobs
console.log(firstJob.children) // HTMLCollection(2) [img.j-desc__company-image, div.j-desc__details]
const secondJob = firstJob.nextElementSibling;
console.log(secondJob) // <div class="j-desc">...</div>
console.log(firstJob === secondJob.previousElementSibling)

console.log(firstJob.lastElementChild.textContent);
console.log(secondJob.lastElementChild.textContent);
```

Accessing particular pieces of information this way could be brittle, as it relies on the content being organized in a particular order with respect to its position in the tree. A more reliable way of targeting individual elements that will work even if the structure changes is to use CSS selectors. We could use `querySelector` for example to get the job title.

```js
console.log(firstJob.querySelector(".j-desc__job-title").textContent)
console.log(secondJob.querySelector(".j-desc__job-title").textContent)
```

We can call any of these DOM traversal methods on any DOM node, not just at the top level `document`. So, we can use them to search through particular parts of the DOM if we so choose.

>Common Scenario: We have a collection of DOM nodes that use the same class names for styles repeatedly. If we use `document.querySelector()` we'll only be able to target the first node's contents. But, if we iterate over the collection of nodes by targeting the collection using `document.querySelectorAll()` then we can invoke `querySelector()` on each of the children to target each in turn within a loop.

```js
document.querySelectorAll('.j-desc').forEach(jobDiv => {
  const jobTitle = jobDiv.querySelector('.j-desc__job-title').textContent;
  console.log(jobTitle);
})
```

### Example 3: Accessing and modifying attributes and text content of HTML elements

All right, so we've looked at targeting elements and accessing their contents, now let's take a look at modification. To access and modify attributes of an element, we use `getAttribute()` and `setAttribute()`.

Let's modify the alt attribute of the first job's company image.

```js
const firstJobImage = firstJob.querySelector(".j-desc__company-image");
console.log(firstJobImage.getAttribute("alt")); // logs: "Patterned Learning AI"

firstJobImage.setAttribute("alt", "Patterned Learning AI - Empowering with AI");
console.log(firstJobImage.getAttribute("alt")); // logs: "Patterned Learning AI - Empowering with AI"`
```

You can verify this change in the browser's inspect element view.

Similarly, to access and modify the text content of an element, we can use the `textContent` property as a setter also.

```js
const firstJobTitle = firstJob.querySelector(".j-desc__job-title");
console.log(firstJobTitle.textContent); // logs: "Junior Front-End Developer"

firstJobTitle.textContent = "Junior Front-End Developer (React)";
console.log(firstJobTitle.textContent); // logs: "Junior Front-End Developer (React)"
```

If you check in the browser, you should see the updated job title. We can also change styles in this way.

```js
firstJobTitle.style.color = 'blue';
```


Section 2: Manipulating the DOM
-------------------------------

#### Examples:

2.  Creating new HTML elements (`document.createElement()`) and appending them to the DOM.
3.  Removing HTML elements from the DOM (`parent.removeChild()` or `child.remove()`).


DOM Manipulation is a vital skill when creating dynamic web pages. So far, we've looked at reading data from the DOM and updating it. Now, we'll discuss creating new elements and removing existing elements.


### Creating new HTML elements (document.createElement()) and appending them to the DOM

Now let's say we want to add a new job listing. We can do this by creating new elements, setting their attributes and content, and appending them to the correct parent element. Because this is something we'll probably be doing more than once, let's make it a function.

```js
function createNewJob() {
  // Create new job description div
  const jobDiv = document.createElement('div');
  jobDiv.className = 'j-desc';

  // Create job details div
  const jobDetails = document.createElement('div');
  jobDetails.className = 'j-desc__details';

  // Create job title
  const jobTitle = document.createElement('h2')
  jobTitle.className = 'j-desc__job-title';
  jobTitle.textContent = 'Newly Added Job Title';  

  // Append newJobTitle to newJobDetails
  jobDetails.appendChild(jobTitle);

  // Append newJobDetails to newJob
  jobDiv.appendChild(jobDetails);
  
  // Append jobDiv to the jobs section
  document.querySelector('section#jobs').appendChild(jobDiv);
}

createNewJob();
```

Now, when you load the page, you will see a new job listing at the end with the job title 'Newly Added Job Title'.

>Note, however, that this was both extremely tedious to do and also incomplete. We're missing the image, the location, the salary range, company name and time since last posting. In cases like this, it will be helpful to use some sort of library to help with the DOM manipulation. There are some templating libraries like [Mustache](https://github.com/janl/mustache.js/) or [Handlebars](https://handlebarsjs.com/) that can make this process much simpler. But, React will also make this process much simpler to complete, so don't worry if this feels like a lot to keep track of now, in practice, your DOM manipulation code won't generally be this detailed or involved.

**Quick Tip**: For now, one technique you can use to make this a bit less painful is to incorporate the use of the `innerHTML=` method. You won't be able to 

```js
function createNewJob() {
  const jobDiv = document.createElement('div');
  jobDiv.className = 'j-desc';
  jobDiv.innerHTML = `
  <img
    class="j-desc__company-image"
    src="https://media.licdn.com/dms/image/C560BAQHbQYFSQsK__A/company-logo_100_100/0/1630511737707?e=1694649600&v=beta&t=Fa--go1eHlnSUYJLWyR07kb7Mfb5yp4upQyQUyUcBKQ"
    alt="Braintrust Company Logo"
  />
  <div class="j-desc__details">
    <h2 class="j-desc__job-title">
      Software Engineer - Freelance (REMOTE)
    </h2>
    <p class="j-desc__company">Braintrust</p>
    <ul class="j-desc__metadata">
      <li>New York, NY (Remote)</li>
      <li>$50/yr - $90/yr</li>
      <li>1 day ago</li>
    </ul>
  </div>
  `;

  document.querySelector('section#jobs').appendChild(jobDiv);
}
```

This approach saves us having to create all of the child elements individually and append them to their parents. In this case, all of the data for the new job is hard coded. In practice, we'd probably want to accept the job info as a parameter and then insert it into the div in the appropriate place. 

Let's refactor our function so it can take a job object as an argument. Let's also make sure that the `innerHTML=` markup doesn't include any of the hard coded information.

```js
function createNewJob(job) {
  const jobDiv = document.createElement('div');
  jobDiv.className = 'j-desc';
  jobDiv.innerHTML = `
  <img
    class="j-desc__company-image"
  />
  <div class="j-desc__details">
    <h2 class="j-desc__job-title">
      
    </h2>
    <p class="j-desc__company"></p>
    <ul class="j-desc__metadata">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
  `;

  document.querySelector('section#jobs').appendChild(jobDiv);
}

createNewJob(jobs[3]);
```

Next, let's create variables for all of the elements we'll need to update based on the `job` parameter.

```js
function createNewJob(job) {
  const jobDiv = document.createElement('div');
  jobDiv.className = 'j-desc';
  jobDiv.innerHTML = `
  <img
    class="j-desc__company-image"
  />
  <div class="j-desc__details">
    <h2 class="j-desc__job-title">
      
    </h2>
    <p class="j-desc__company"></p>
    <ul class="j-desc__metadata">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
  `;

  const imgEl = jobDiv.querySelector('img');
  const titleEl = jobDiv.querySelector('.j-desc__job-title');
  const companyEl = jobDiv.querySelector('.j-desc__company');
  const [locationEl, salaryEl, postDateEl] = jobDiv.getElementsByTagName('li');

  console.log(imgEl, titleEl, companyEl, locationEl, salaryEl, postDateEl)

  document.querySelector('section#jobs').appendChild(jobDiv);
}
```

Finally, we can populate these elements with the data inside of `job`. Remember that a job looks like this:

```js
{
  image: {
    src: "https://media.licdn.com/dms/image/C560BAQHbQYFSQsK__A/company-logo_100_100/0/1630511737707?e=1694649600&v=beta&t=Fa--go1eHlnSUYJLWyR07kb7Mfb5yp4upQyQUyUcBKQ",
    alt: "Braintrust Company Logo",
  },
  company: "Braintrust",
  title: "Software Engineer - Freelance (REMOTE)",
  salary: "$50/yr - $90/yr",
  location: "New York, NY (Remote)",
  postDate: "1 day ago",
},
```

So, here's the code to update the DOM that we'll need to add to the bottom:

```js
imgEl.setAttribute("src", job.image.src);
imgEl.setAttribute("alt", job.image.alt);
titleEl.textContent = job.title;
companyEl.textContent = job.company;
locationEl.textContent = job.location;
salaryEl.textContent = job.salary;
postDateEl.textContent = job.postDate;
```

Now, if we check the browser, we can see the job is being added dynamically! If we change the index from `jobs` that we pass to `createNewJob()` a new job's info should appear:

```js
createNewJob(jobs[3]);
createNewJob(jobs[4]);
```

### Removing HTML elements from the DOM (parent.removeChild() or element.remove())

As you might imagine, removing elements from the DOM is a bit simpler than creating and adding new ones!

Let's remove the second job listing from the DOM.

```js
// Select the section containing all jobs
const jobSection = document.querySelector('section');

// Select the job to remove
let jobToRemove = document.querySelectorAll('.j-desc')[1]; // second job

// Remove the job
jobSection.removeChild(jobToRemove);
```

`removeChild` is a bit more involved in this case, because it requires that we have access to both the `parent` node and the `child` we want to remove. We can accomplish the same by just targeting the child element and invoking `remove()` on it as well.

```js
// Select the job to remove
let jobToRemove = document.querySelectorAll('.j-desc')[1]; // second job

// Remove the job
jobToRemove.remove()
```

With this, when you load the page, the second job listing will be removed.

If you're wondering why you might want to use one over the other, that's a good question! Feel free to [read more about the differences](https://medium.com/geekculture/removechild-and-remove-methods-in-javascript-4164325f97c9) between the two if you like. In short, the main difference is in the return value. The `removeChild()` method returns the child that is removed, whereas `remove()` returns nothing. In either case, you generally still have a reference to the removed node via the variable you called `remove()` on, so feel free to just use `remove()`.

This is all great, but up until now, we haven't really seen anything happening on the web page because of user behaviors. We've just use JavaScript to manipulate what the user sees when they load the page. And, of course, we could have done all of that with HTML & CSS. Next, we'll talk about where JavaScript really starts to shine.

## Section 3: DOM Events

DOM events are actions that occur in the browser and are detected by JavaScript. Examples include a mouse click, a key press, or a page being loaded. These can be used to trigger JavaScript functions and provide interactivity to web pages.

When looking at the list of properties on an `HTMLElement`, all properties starting with `on` represent event handlers. For example, if an element has an `onclick` property, then clicking on that element will execute the javascript stored in that property.

### Add a click event to the job title

Let's make the job titles interactive. When a user clicks on a job title, it will alert the user with the job title they clicked on.

First, select all job title elements. As they are multiple, we use `getElementsByClassName`.

```js
const jobTitles = document.getElementsByClassName("j-desc__job-title");
```

Next, loop over all job title elements and add an event listener to each. In this case, we're listening for a "click" event.

```js
for (let i = 0; i < jobTitles.length; i++) {
  jobTitles[i].onclick = function() {
    alert("You clicked on " + this.textContent);
  };
}

```

Now, whenever a job title is clicked, an alert will appear displaying the job title text.

### Change color of job title on hover

We can also use DOM events to change the style of elements when a user interacts with them. Let's change the color of a job title when a user hovers over it.

We're going to use the "mouseover" and "mouseout" events. "mouseover" is triggered when the cursor is moved over an element, and "mouseout" when it's moved out.

```js
for (let i = 0; i < jobTitles.length; i++) {
  jobTitles[i].onmouseover = function() {
    this.style.color = "red";
  };

  jobTitles[i].onmouseout = function() {
    this.style.color = "";
  };
}
```

Now, when you hover over a job title, it turns red. When you move the cursor away, it goes back to its original color.

### Another method of Attaching Event Listeners

Here's a simple syntax of an event listener:
```js
element.addEventListener("event", eventHandler); // eventHandler is a function that will handle when the event occurs
```

In this case, `"event"` is the type of event you want to listen for, and `eventHandler` is the function to execute when the event occurs. The function can be defined separately and passed by name, or you can define an anonymous function right there.

Another method of attaching event listeners involves event delegation. Here's an example to get the idea of how it works.

```js
document.addEventListener("submit", (event) => {
  if(event.target.matches("#newJob")) {
    handleNewJob(event);
  } else if (event.target.matches(".newComment")) {
    handleNewComment(event);
  }
})
```

The idea here is to add an event listener to the `document` itself, so any submit event that occurs on any form in the document will be captured and bubble up to the document. Next, we can use some conditional logic with `event.target.matches()` to recognize which form was the target of the submit event so we can handle the submission logic in separate functions.

There is a [wonderful article by Dmitri Pavlutin](https://dmitripavlutin.com/javascript-event-delegation/) that further explores the idea of event delegation including multiple explanatory images like this one below.

![Event Propagation](https://res.cloudinary.com/dlzuobe8h/image/upload/v1687285327/CSI%20TTP/javascript-event-propagation-5_gxjtlk.png)

### Form Submission

Let's assume we have a form where users can add a new job posting. When the form is submitted, we want to prevent the default form submission behavior and instead log the input values to the console.

Here's an example form:

```html
<form id="jobForm">
  <input type="text" id="jobTitle" placeholder="Job Title">
  <input type="text" id="companyName" placeholder="Company Name">
  <button type="submit">Add Job</button>
</form>
```

Let's put this right below our `<h1>` tag, fill it in and submit it. Notice that the page refreshes and the form data ends up in the URL? This is the browser default behavior for a form's submit event. If we want to intervene to prevent the default behavior so we can customize how we handle an event using JavaScript, this is how we do it.

```js
const form = document.getElementById("jobForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent browser default behavior

  const jobTitle = document.getElementById("jobTitle").value;
  const companyName = document.getElementById("companyName").value;

  console.log("Job Title: " + jobTitle);
  console.log("Company Name: " + companyName);
});
```

We won't go through building out the entire form here, but we will a bit later on in the course! For now, you can imagine how we could extract the data from the form, put it into an object and pass it to `createNewJob` in order to populate the job from the form into the DOM!


Resources
---------

- [MDN Web Docs: Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)
- [MDN Web Docs: Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
-   [MDN Web Docs: Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
-   [MDN Web Docs: Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
-   [JavaScript.info: Document](https://javascript.info/document)
-   [JavaScript.info: Introduction to Browser Events](https://javascript.info/introduction-browser-events)
- [Dmitriy Pavlutin's post on Event Delegation](https://dmitripavlutin.com/javascript-event-delegation/)