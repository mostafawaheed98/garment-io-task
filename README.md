To run project: 
1. In a terminal, run npm install.
2. After installation completes, run npm start.

Task description:

Given a list of sizes and colors, we need to create a table or a grid that allows the user to select size / color combinations and define quantities for each combination. The table should initially consist of the plus buttons in the top right corner, one column with the sizes list for the user to choose a size from and one row with the colors list along with the quantity input.

Pressing the plus button close to the sizes list, should create a new column with a sizes dropdown. Consequently, quantity inputs are added for this newly created column. Same goes, if you press the plus button close to the colors list, where a new row is added with the colors dropdown and respective quantities. Please note that each size or color can be selected only once in the table.

Please follow the below steps to achieve the required result:
1.  Create the table’s UI and any react components required including the sizes and colors lists.
2.  Add the functionality to allow the user to add more sizes by clicking the plus button next to the sizes dropdown menu.
3.  Add the functionality to allow the user to add more colors by clicking the plus button above the colors dropdown menu.
4.  Add a submit button below the table that when clicked, would output all the table values as follows to the console:
[{color: “red”, size: 5, quantity: 10}]

Bonus 1: Show the totals of the quantities inserted by the user for each column / row. 
Bonus 2: Add cross icon next to each created size so that it can be deleted from the table.