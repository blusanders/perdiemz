# Per Diemz
# NSS Front End Capstone

## What is Per Diemz?
Per Diemz is a simple tool for a music tour manager to quickly calcuate cash per diem bill denominations for a tour run. How many $20 bills do you need for a 50 person crew when you go out for 13 days? How bout 10s? What if no one wants a $50 bill? What if they only want one 50? These are tedious but important calculations that you don't need to wate time with every time you hit the road.

I came from the country touring world where we were in and out often, which meant too many hours doing math that could be better spent doing other things.

#

## Tech Stack
HTML/CSS/Javascript/React/JSON
## New things (to me) I used for formatting:
Reactstrap, CSS Grid

## Data
My intention originally was to create my tour/crew in Mastertour, the software I used for years on the road, and expand from there but their API and crew management didn't quite do what I needed it to do, so for the purposes of this app, I used local data in a JSON db.

Artist/CrewTypes were pre-added to the db. However, what Artist a tour is related to isn't needed for this app.

#


![Per Diemz Screenshot](../images/perDiemzScreenshot.png)

## Crewz
CRUD your tour crew. Add crew members who will be on the road with you for a particular week.

## Tourz
Gotta be on tour to create a run that needs Per Diem. CRUD a tour. Give your tour a name, and a start/end date.

## Tour Runz
Select your tour. Give your tour run a name, date/time, per diem amount, days out.

## Max Billz
Select the maximum # of bills you want for each denomination. Typically this is 0-100s and/or 0-50s. But if that results in 24-20s then you can play with the numbers and get the counts you prefer.

## Why do this? 
Because often on the road crew members want to use cash but plenty of places don't want to change 100s or 50s, especially in the middle on nowhere. It makes it easier for your crew and everything you can do to make it smoother on the road the better.