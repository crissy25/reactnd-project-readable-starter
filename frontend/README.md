
## Folder Structure

After creation, your project should look like this:

```
frontend/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.test.js
    index.css
    index.js
    registerServiceWorker.js
    actions/
      API.js
      index.js
    components/
      App.js
      Comment.js
      Comments.js
      Content.js
      CreateNewPost.js
      DetailedPost.js
      EditComment.js
      EditPost.js
      Header.js
      NewComment.js
      NewPost.js
      Post.js
      Posts.js
      Sorter.js
    reducers/
      index.js
    utils/
      add.svg
```

##BASIC OVERVIEW

This Project is a forum to submit Posts and Comments which can be up voted, down voted, edited and deleted.

#FLOW OF APP
App is made up of Header, Sorter and Content.

Header aids the navigation between all categories.

Sorter gives a sorted view of Posts according to the selected option.

Content is the basic display of all Posts.

#FUNCTIONALITY
You can create posts using the add button seen at bottom right corner.
The post can be edited, up voted, down voted, commented on and deleted.
You can also click of the title to get navigated to a detailed Post view.

You can comment can be edited, up voted, down voted and deleted.

You can switch between tabs to view category specific posts which can be sorted according to date and score.