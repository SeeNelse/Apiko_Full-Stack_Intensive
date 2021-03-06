# Apiko Full-Stack Intensive

## Homework #1 ##

1. use https://jsonplaceholder.typicode.com/
2. create a homepage with post list
3. each post should have it’s own URL address (like http://your-file?postId=ID)
4. if postId parameter exists - show post page (with comments) instead of post list page
5. try to do the same with post creators (make a link for them; like http://your-file?userId=ID)

[Link to homework](http://dovzhen.co/apiko/hw_1/)
- Link to single post http://dovzhen.co/apiko/hw_1/?postId=n
- Link to user http://dovzhen.co/apiko/hw_1/?userId=n

## Homework #2 ##

[Link to homework](http://dovzhen.co/apiko/hw_2/)

## Homework #3 ##

1. Save Data from Endpoint(https://jsonplaceholder.typicode.com/posts) to “data.json” file into your project.
2. Make components:
  - PostList - A list for all of you posts.
  - PostListItem - A post list item component.
  - MoreButton - Button to be placed under the list.
3. PostList should show 10 posts at first.
4. MoreButton have to load 10 more post to your list.

## Homework #4 ##

1. Create “search” input conponent
2. Filter posts data by “title” accourding to entered text
3. PostList should show matched elements
4. In case when no items found you should show “No items found” message (Make component for this one)

## Homework #5 ##

1. Rewrite you Post list using componentDidMount with fetch
2. Add loader
3. Set inreval for fetching your list
4. Prevent render for list item components
