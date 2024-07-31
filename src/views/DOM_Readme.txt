This is to support for DOM within the project

1, Login and Log up page 
- The login information will be stored in Firebase database
- Log up will send request to create a new account to Firebase

2, Home page
- Landing page

3, Dashboard page
- Having indicators: total order, opening order, closed order

4, Today page
- Having indicators within the day: 
Total order
Required order
Closed order
-> will have total number and total value for each
- Having selecting box for filtering order information based on ['Closed', 'Open', 'Required']

5, This week page
- Having indicators within the week
Total order
Required order
Closed order
-> will have total number and total value for each

6, This Month page
- Having indicators 4 within the Month:
# Order Month
# Closed Orders
# Opening Orders (the number of orders still waiting to be received)
# Total value of Orders

-In addition, there are 2 charts with filter, based on ['Year', 'Month']
* Order and Value per Weekday
* Order per Vendors

7, This Year page
- Having indicators 5 within the Month:
# Delivery rate (comparision between the total of closed time versus required time)
# Order Month
# Closed Orders
# Opening Orders (the number of orders still waiting to be received)
# Total value of Orders

-In addition, there are 2 charts with filter, based on ['Year', 'Month']
* Order and Value per Month
* Order per Vendors
* Items and Percentage Change per Month within Year
* Delivery Rate

8, This page
- Having 6 different sections:
* Orders summary: total # of orders, delivery rate, total # of closed orders, total # of open orders, total order value

* Value and Quantity change Month over Month

* Delivery rate Month over Month

* Gauge gadget

* Value and Quantity change Month over Month

* Top 5 Vendors

9, Requisition
- Testing page for requisition, it would send to the MongoDB

10, Profile 
- Nothing much, just the User email and User Token

11, Machine Learning test site
- In order to predict the priority code of the Work Order Request 
