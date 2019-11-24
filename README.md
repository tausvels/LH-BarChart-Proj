---
permalink: /index.html
---
# LH-BarChart-Proj
This is a stretch project for the Lighthouse Bootcamp prep work.

# ABOUT
This is Lighthouse Labs stretch-project where the objective is to create a bar chart library for other developers to use in their own program.

# Some Context
This bar chart library generates a bar graph representation of the data being provided in the script.js file. There are three parameters for this library to work, which are, 'DATA', 'OPTIONS' and 'ELEMENT'. The 'ELEMENT' is the part of the DOM where the user would want their bar chart to be rendered. Within the 'OPTIONS' parameter, the user would be able to set the visual representation of the chart. The 'DATA' is needs to be in the format of [[item1, quantity1, quantity2], [item2, quantity1, quantity2], [item1, quantity1], ...]

# API Function for the USER
The user is expected to run the function -- drawBarChart(data, options, element), where the contents of each parameter need to be inserted into the script.js file in the section $(document).ready(() =>{data= [], options = [], element = [] })

# OPTIONS the library supports
This bar char library supports the following functions:
# 1.'ON CLICK'- 
change 'Default MainTitle, default X-Title, default Y-Title, change color of X-Labels, change color of Y-Labels'.
# 2. 'FROM OPTIONS' - 
Y-Axis increment size, height and width of chart area, position of dataPoints inside the bar(top, middle or bottom [default is 'middle']), font-size of MainTitle, X-Title,X-Label, Y-Title, Y-Label and dataPoints, color of both BOTTOM and TOP BARS.
# 3 'WIDTH OF BARS' from OPTIONS
The width of the bar can be made 'VALUE DEPENDENT' or have 'EQUAL WIDTH'. 'ValDepend' is set as default, but for equal width, this value can be left blank or changed to some other value.
# 4. Singe data value in the format: 
data = [[item1, quantity1], [item2, quantity1], [item3, quantity3],...]
# 5. Multiple data value in the format: 
data = [[item1, quantity1, quantity2], [item2, quantity1, quantity2, quantity3], [item3, quantity1, quantity2],...]

# Known BUGS and ISSUES
1. Only one chart can be redered within a page. Calling drawBarChart(data, options, element) more than once causes the program to behave un-natuarally and hence render incorrectly.
2. Bars having width dependent on their individual does not look good.
3. In data parameter, if any other type of variable is input other than a number, the program does not throw an error.
4. The y-axis increment parameter in options does not behave as expected for all increment values.

# Future Tweaks
1. Fix all the aforementioned bugs and issues and introduce more options both within the script.js as well as ON CLICK.
2. Include a form within an HTML file for data to be input directly by user without going to script.js file.

# External resources used that helpmed build this library
1. www.youtube.com
2. www.w3schools.com/jquery/default.asp
3. www.stackoverflow.com
4. www.repl.it
5. Some ebooks on jquery and css.
