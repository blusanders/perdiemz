# Per Diemz
# NSS Front End Capstone

## What is Per Diemz?
Per Diemz is a simple tool for a music tour manager to quickly calcuate cash per diem bill denominations for a tour run. How many $20 bills do you need for a 50 person crew when you go out for 13 days? How bout 10s? What if no one wants a $50 bill? What if they only want one 50? These are tedious but important calculations that you don't need to wate time with every time you hit the road.

I came from the country touring world where we were in and out often, which meant too many hours doing math that could be better spent doing other things.

#

## Get Perdiemz
Fork or Clone the perdiemz repo
json-server -w db.json -p 8080
npm start


#

## Tech Stack
HTML/CSS/Javascript/React/JSON
## New things (to me) I used for formatting:
Reactstrap, CSS Grid

# 

## Local Data
My intention originally was to create my tour/crew in Mastertour (MTD), the software I used for years on the road, and expand from there but their API and crew management didn't quite do what I needed them to do, so for the purposes of this app, I used local data in a JSON db,keeping in mind how I did things with MTD.

Artist/CrewTypes were pre-added to the db. However, what Artist a tour is related to isn't needed for this app.

#

## Functionality

![Per Diemz Screenshot](https://res.cloudinary.com/dp6mbc90b/image/upload/v1616694110/perDiemzScreenshot_gigzly.png)

## Login
A simple fetch validation was provided for us for the sake of having simple user management. Not real world. Bogus data

## Crewz
CRUD your tour crew. Add crew members who will be on the road with you for a particular week.

## Tourz
Gotta be on tour to create a run that needs Per Diem. CRUD a tour. Give your tour a name, and a start/end date.

## Tour Runz
Get out on the road. Select your tour. Give your "tour run" a name, date/time, per diem amount, days out.

## Max Billz
Select the maximum # of bills you want for each denomination. Typically this is 0-100s and/or 0-50s. But if that results in 24-20s then you can play with the numbers and get the counts you prefer.

## Why do this? 
Because often on the road crew members want to use cash but plenty of places don't want to change 100s or 50s, especially in the middle of nowhere. It makes it easier for your crew and everything you can do to make it smoother on the road the better. This calculation takes time. With a simple too like this you can plug in quick numbers and quickly get the info you need for the bank.

#

## Wishlist

Few things I'd focus on if I were building this out:

* Unique Crew Members per user
  * Currently Crew is the same across all users for ease of use.
  * This was partially done bc in MTD you have a master list of all MTD users.

* Unique crew/pd/daysout per tour run
  * Currently a tour run is the same for all crew. Everyone gets x dollars for y days. But realitically some people travel in from a greater distance, for example, which adds a day extra in and out for them.
