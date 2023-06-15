Codealong Lesson: Mastering Git and GitHub
==========================================

Students Will Be Able To (SWBAT):
---------------------------------

- Understand what Git is and why it's used in software development
- Initialize a Git repository and make commits to track changes
- Understand what GitHub is and how it relates to Git
- Push changes to a GitHub repository and pull changes from it
- Create, merge, and resolve conflicts in branches
- Use GitHub Issues for tracking bugs and feature requests
- Utilize GitHub Projects for project management
- Understand the purpose and process of creating Pull Requests
- Use Git, GitHub, and Bootstrap to build a simple Job Application Tracker

Agenda:
-------

1. **Introduction to Git**
    - Discuss the role of Git in software development
    - How to set up a Git repository
    - Making first commits to track changes
2. **Introduction to GitHub**
    - Discuss what GitHub is and its relationship with Git
    - Setting up a GitHub repository and linking it to a local Git repository
    - Pushing changes to a GitHub repository and pulling changes from it
3. **Working with Git Branches**
    - Understanding branches in Git
    - Creating, switching, and merging branches
    - Resolving conflicts in branches
4. **Understanding GitHub Issues and Projects**
    - Tracking bugs and features using GitHub Issues
    - Managing workflow with GitHub Projects
5. **Mastering Pull Requests**
    - The purpose of Pull Requests in collaborative development
    - How to create, review, and merge Pull Requests

-------------------------------------

Part 1: Introduction to Git
=====================================

Hey folks! In this part of our codealong, we're going to dive into the fascinating world of Git, your personal time machine for coding! Here's what we're going to do:

1. **Understanding Git**
    - We'll kick things off by discussing version control and its importance in software development. Version control allows developers to track changes, revert back to earlier versions of code, and collaborate with others, making it an essential skill in the industry.
    - Next, we'll create a new project directory and initialize it as a Git repository with `git init`. This command creates a new Git repository and an area known as the "staging area" where Git keeps track of changes ready to be committed.
    - We'll also discuss the three main states of Git: the working directory (where you'll be coding), the staging area (where you keep track of changes), and the Git directory (the "snapshot" of your project at a specific point in time).
2.  **Creating the HTML Structure**
    - Next, we'll take some of our HTML file from yesterday and add it to an `index.html` file in our Job Application Tracker repo. 
    - We'll make sure to add in a `styles.css` file as well and link it to the HTML document.
3. **Committing Changes**
    - After creating the HTML structure, we'll use `git add .` to stage the changes we've made. Staging changes prepares them for a commit, which is like a "save point" in our project.
    - Next, we'll commit these changes using `git commit -m "Initial commit"`. The message after -m is a brief summary of the changes we've made. It's important to write clear and concise commit messages for better collaboration and readability.

![How files change states](https://res.cloudinary.com/dlzuobe8h/image/upload/v1686694309/CSI%20TTP/git-04-how-files-change-states_o5nemx.png)

Part 2: Introduction to GitHub
==============================

![Local and Remote communication](https://res.cloudinary.com/dlzuobe8h/image/upload/v1686694309/CSI%20TTP/git-05-local-remote-diagram-of-different-style_sryli4.jpg)

In this segment, we'll move our local project onto GitHub, which serves as an online platform for Git repositories. Here's what we'll do:

1.  **Getting Started with GitHub**
    - We'll discuss what GitHub is, its connection with Git, and how it enhances collaborative development. GitHub provides a web-based interface for managing Git repositories, allowing developers to share their code and work together.
    - Next, we'll create a new repository on GitHub for our Job Application Tracker. When doing this, I recommend leaving all of the checkboxes for adding a README and License file blank. You can do this later in separate commits and it will make it much easier to connect a remote repository to an existing local repository.
    - We'll then connect our local Git repository with our newly created GitHub repository using `git remote add origin <repository-url>`, setting up a pathway for our local project to communicate with GitHub. Right after you create the repository on GitHub, there are a couple of code blocks you can use as examples of how to make the connection. The second codeblock is what we'll want to use in this case.
    - After running the second codeblock in our terminal, refresh the page on GitHub and we can see our local code there! At this point, though, we really are missing a README. GitHub even tells us so! 
    - There are a few things that are really helpful to add to our project to make it more complete and presentable online:
      - [Make a good README](https://www.makeareadme.com/)
      - [Add a License](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository)
      - [Add a .gitignore file](https://github.com/github/gitignore)
    - [Cool ChatGPT Prompt for generating README content](README_GENERATOR_PROMPT.md)
2.  **Pushing Changes to GitHub**
    - We'll make a change to our Job Application Tracker locally. In this case, let's add a README.md file based on our previous efforts.
    - We'll then use `git status` to review the changes, `git add .` to stage them, and `git commit -m "Add README"` to commit these changes.
    - Lastly, we'll push our changes to the GitHub repository using `git push origin main`. This command sends our committed changes to the "main" branch of our remote repository on GitHub. We can refresh the page in the browser and we should see our new README!
3. **Changing Files directly on GitHub**
    - We can also make changes to files directly through GitHub. This is actually pretty handy when it comes to adding a License for the project.
      -  Click the "Add file" button (next to the green "Code" button)
      - Select "Create new file"
      - name the file "LICENSE"
      - you can type LICENSE information here and save the file if you like, but when you name the file LICENSE, there is another option.
      - After you name the file LICENSE, an option saying "Choose a license template" will appear
      - Click on this and it will prompt you to confirm you'd like to discard unsaved changes (to this file you created). We can go ahead and do that for now
      - This takes us to a page where we can choose what license we'd like to use. You can read [more about the choices here](https://opensource.guide/legal/#which-open-source-license-is-appropriate-for-my-project), but the MIT license is a good starting point.
      - It will give you a prompt to adopt the License with the current year and your full name, when you click the "Review and Submit" button, it will take the license text and populate it into the LICENSE file.
      - Go ahead and click the "Commit changes..." button
      - You'll be prompted to choose where you'd like to commit the change and what the commit message should be. We can stick with the defaults for now.
      - You should now see the LICENSE file on GitHub.

GOTCHA

![Local and Remote Repos with remote tracking](https://res.cloudinary.com/dlzuobe8h/image/upload/v1686694310/CSI%20TTP/git-03-local-and-remote-diagram_qenn6h.jpg)

If we check the our local repository now, we won't see the LICENSE file. Also, if we run `git status` we don't see anything missing!

```bash
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Looking at the diagram above, it's important to note that the local repo has an `origin/master` remote-tracking ref. So, when we start to interact, we can run `git fetch` and now we'll see something like this:

```bash
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 1.32 KiB | 674.00 KiB/s, done.
From https://github.com/DakotaLMartinez/job-application-tracker
   170f6c1..771a93b  main       -> origin/main
```

Now, we can run `git status` and see that:

```bash
On branch main
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)

nothing to commit, working tree clean
```

When working on a collaborative project, it's important to run `git fetch` first to update any remote tracking refs and make sure that there aren't changes on the remote repository that we don't have locally before we start to code. 

If we actually want to have the LICENSE file locally, then we ned to run the `git pull` command to apply the changes in our remote branch to our local copy of the branch.

Now, we have the LICENSE!

Part 3: Working with Git Branches
=================================

Git branches are a powerful feature for managing different versions of your codebase. When we're collaborating with other developers who are working on different features, it's essential that we isolate the changes we're making so that we know who has made which changes and git can track everything indepedently.

![](https://res.cloudinary.com/dlzuobe8h/image/upload/v1686694309/CSI%20TTP/git-01-gitflow_apbwgr.png)

1.  **Understanding Branches in Git**
    - Branches allow you to work on different features or bugs without affecting the main ("master" or "main") codebase. We'll discuss how branches work and why they're used in development workflows.
    - **Example:** We can create a branch to make a stylistic change to our Job Application Tracker, such as modifying the layout or color scheme. In this case, let's create a branch for adding a new job posting.
2.  **Creating, Switching, and Merging Branches**
    - We'll cover how to create a new branch with `git branch <branch-name>` and switch to it using `git checkout <branch-name>`. These commands allow you to create different "versions" of your project and switch between them.
    - Once we're done with our changes on a branch, we'll learn how to merge it back into the main codebase with `git merge <branch-name>`.
    - **Example:** We'll create a branch named "add-job-posting", make changes to our html file to add another posting to our application, and then merge these changes into the main branch. The steps are:
      - `git checkout add-job-posting`
      - add html for new job
      ```html
      <div class="j-desc">
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
      </div>
      ```
      - `git add .`
      - `git commit -m "add Braintrust job posting"`
      
3.  **Resolving Conflicts in Branches**
    - Sometimes when you merge branches, you might encounter a merge conflict. We'll talk about why conflicts happen and how to resolve them.
    - **Example:** We can simulate a conflict situation by making conflicting changes on the main branch on GitHub, adding another job at the same time as we try to with our "add-job-branch" branch. We'll then walk through how to resolve this conflict.

If we've updated our main branch on GitHub and added this job:

```html
<div class="j-desc">
  <img
    class="j-desc__company-image"
    src="https://media.licdn.com/dms/image/C4D0BAQEq6OEw509HRQ/company-logo_100_100/0/1519952238666?e=1694649600&v=beta&t=Bv3329fHJDl0SMfrnUZ4stRoZnLrb0JfYI6u1hQbkZU"
    alt="Underdog Company Logo"
  />
  <div class="j-desc__details">
    <h2 class="j-desc__job-title">
      Frontend Engineer - Remote
    </h2>
    <p class="j-desc__company">Underdog.io</p>
    <ul class="j-desc__metadata">
      <li>New York, United States (Remote)</li>
      <li>$88k/yr - $192k/yr</li>
      <li>2 days ago</li>
    </ul>
  </div>
</div>
```

And we also happen to have changed the same file and the same lines in our local branch, this is the situation where a merge conflict can arise.

Let's checkout the main branch locally, merge in our add-job-posting branch and try to push it.

```bash
git checkout main
git merge add-job-posting
```

Note that this part works fine:

```bash
dakotamartinez@Dakotas-MacBook-M1-Pro job-app-tracker % git checkout main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
dakotamartinez@Dakotas-MacBook-M1-Pro job-app-tracker % git merge add-job-posting
Updating 771a93b..48f5f27
Fast-forward
 index.html | 18 ++++++++++++++++++
 1 file changed, 18 insertions(+)
```

But now, let's try to push:

```bash
dakotamartinez@Dakotas-MacBook-M1-Pro job-app-tracker % git push
To https://github.com/DakotaLMartinez/job-application-tracker.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/DakotaLMartinez/job-application-tracker.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

Note that the error we're getting is giving us some hints. It's saying that the remote contains work that we do not have locally. This is because we forgot to fetch before merging. 

The above is not the ideal Gitflow, but I wanted to make sure if you did find yourself in this situation, that you would know how to resolve it!

The hint is also suggesting that we try to do `git pull` before pushing again, so let's give that a shot.

```bash
dakotamartinez@Dakotas-MacBook-M1-Pro job-app-tracker % git pull
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 928 bytes | 309.00 KiB/s, done.
From https://github.com/DakotaLMartinez/job-application-tracker
   771a93b..46c67e9  main       -> origin/main
hint: Pulling without specifying how to reconcile divergent branches is
hint: discouraged. You can squelch this message by running one of the following
hint: commands sometime before your next pull:
hint: 
hint:   git config pull.rebase false  # merge (the default strategy)
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint: 
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

Note that the `git pull` is attempting to fetch changes to the remote branch to the local tracking ref (origin/main) and then to merge that into the local copy of the branch (main). It's attempting to automatically merge the changes:

```bash
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

But the merge fails, so we need to manually fix the conflicts and then commit the result. This is what happens

```html
<<<<<<< HEAD
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
      </div>
=======
          src="https://media.licdn.com/dms/image/C4D0BAQEq6OEw509HRQ/company-logo_100_100/0/1519952238666?e=1694649600&v=beta&t=Bv3329fHJDl0SMfrnUZ4stRoZnLrb0JfYI6u1hQbkZU"
          alt="Underdog Company Logo"
        />
        <div class="j-desc__details">
          <h2 class="j-desc__job-title">
            Frontend Engineer - Remote
          </h2>
          <p class="j-desc__company">Underdog.io</p>
          <ul class="j-desc__metadata">
            <li>New York, United States (Remote)</li>
            <li>$88k/yr - $192k/yr</li>
            <li>2 days ago</li>
          </ul>
        </div>
      </div>
    
>>>>>>> 46c67e9ee676d82cd31c4f56d5c25220f5d051a3
```
In VS Code, there's a merge editor we can choose to use if we want, but the main thing we need to do to resolve the conflict is to remove the lines that look like this: 

```
<<<<<<< HEAD

=======

>>>>>>> 46c67e9ee676d82cd31c4f56d5c25220f5d051a3
```

We need to decide what should happen at this place in the file where the conflict occurred. In practice, this will often require a conversation with another developer on the team. In our case, let's say we want to keep both jobs. You may notice that the conflict actually starts in the middle of an `<img>` tag, so we'll need to create another to fix it if we want to keep both!

It's always a good idea to test out the code after resolving the merge conflict to make sure it works as expected before committing the merge conflict resolution.

```bash
dakotamartinez@Dakotas-MacBook-M1-Pro job-app-tracker % git ci -m "resolve conflict by keeping both jobs"
[main 51125da] resolve conflict by keeping both jobs
```


Codealong Part 4: Understanding GitHub Issues and Projects
==========================================================

GitHub provides some excellent tools for tracking bugs and managing workflows. Here's what we'll cover:

1.  **Tracking Bugs and Features Using GitHub Issues**

    -   GitHub Issues is a great feature to track bugs and new feature requests. We'll discuss how to create an issue, assign it to someone, add labels, and track its progress.
    -   **Example:** We can create a new issue for our Job Application Tracker saying that we need more jobs.
2.  **Managing Workflow with GitHub Projects**
    -   GitHub Projects is a project management tool that allows you to create a Kanban-style board to track progress. We'll talk about how to create a new project, add columns, and move issues between these columns.
    -   **Example:** We can set up a GitHub Project for our Job Application Tracker and demonstrate how to manage the workflow for adding a new feature or fixing a bug. In this case, we'll create an item saying we need more jobs and convert it to a GitHub issue.


# Part 5: Understanding GitHub Pull Requests

Pull requests are a critical aspect of collaborative projects on GitHub. They allow developers to propose changes which can be reviewed before being merged into the codebase. Here's the detailed plan:

1. **Understanding Pull Requests**
   - We'll discuss the concept of pull requests and why they're so important for collaborative work on GitHub. We'll also explain the difference between pull requests and direct commits to the main branch.
   
2. **Creating a Pull Request**
   - Now, we'll demonstrate the process of creating a pull request. We'll use our existing branch to add yet another job, and then create a pull request for these changes.
   - We'll walk through the steps of filling out the pull request form, assigning reviewers, and adding descriptive comments about the changes we've made.
   
3. **Reviewing and Merging a Pull Request**
   - Next, we'll go over how to review the changes in a pull request, leave comments, and finally merge the pull request into the main codebase.
   - We'll discuss best practices for reviewing pull requests, such as checking the 'Files changed' tab to see what modifications have been made and ensuring that the changes align with the project's coding standards and goals.
   
4. **Handling Merge Conflicts in Pull Requests**
   - Sometimes, merging a pull request can result in a merge conflict, particularly if there have been other changes to the main codebase that conflict with the changes in the pull request.
   - We'll simulate a merge conflict situation and walk through the steps of resolving these conflicts directly on GitHub, ensuring our code remains consistent and bug-free.

By the end of this segment, you should have a solid understanding of how to effectively use pull requests in your projects, enabling smoother and more efficient collaboration with your peers.


Resources:
----------

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Documentation](https://docs.github.com/en)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [GitHub Learning Lab](https://lab.github.com/)
- [About Merge Conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts)