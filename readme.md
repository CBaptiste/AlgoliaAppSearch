# High responsive app store search using Algolia

This small webpage shows the high responsivness of algolia's search. A miniature MVC framework was implemented.
Powered with Algolia, AngularJS and NodeJS

# TL;DR
#### Good parts
- high responsiveness
- image display optimisation
- not the most beautiful UI but simple and effective
- And the most important : I get what I look for
- category combination search
- 3 files MVC back end

#### Bad Parts
- Angular's `ng-repeat` not the best choice for fast DOM update apparently: I cannot get rid of the 200ms white blank when switching images
- Issues (see below) : could not get `facets` from JSON answers
- The UI can certainely be better
- responsiveness


## Installation
1. ```npm start server.js ```
2. go to ```localhost:3000```
3. search !

## Project Structure

```build/``` - JS and Style build and concatenation  
```controllers/``` - back end controllers  
```libs/``` - back end modules/services/features  
```views/``` - html file  
```public/``` - static content (css/less, js)  
```node_modules/ ```   
```tests/``` - unit tests back and front   
```gulpfile.js ```   
```Gruntfile.js  ```  
```package.json ```  
```server.js ```  
It is a small sized project. For  single app app, I precognized feature based architecture for the ```public/``` folder.

## Algolia
#### Data
```
{
    "name": "iBooks", 
    "image": "http://a3.mzstatic.com/us/r1000/090/Purple/v4/20/bd/a2/20bda225-6144-cb99-46ef-d0fc15fc456a/mzl.okdjewbf.175x175-75.jpg",
    "link": "http://itunes.apple.com/us/app/ibooks/id364709193?mt=8",
    "category": "Books", // will be used for faceting
    "rank": 1 // will be used for ranking
  }
```
#### Algolia's index setting

##### indexes
1 master (write)  
2 slaves: desc(rank) and asc(rank)

##### main settings
main settings to have a nice app search experience
```
{
"ranking": ["name", "words", "desc(rank)" || "asc(rank)"],
"attributeToIndex": ["name"],
"attributesToRetrieve": ["name"],
"minWordSizefor1Typo": 5,
"attributeForDistinct": "name" //so that algolia get rid of doublon,
"attributesForFaceting": "category",
"highlightPreTag": "<b>",
"highlightPostTag": "</b>",
"restrictSearchableAttributes": "name"
}
```
##### Issues

It was impossible to get the facets info in the JSON from browse/ and search method even though the faceting is configured. (according to https://www.algolia.com/doc/faq/searching/how-to-display-the-count-for-the-facets)
```
"facets" : {
  "category" : {
    "Movies & TV Shows" : 85,
    "Cell Phones" : 24,
    "Headphones" : 24,
    ...
}
```
As a workaround, I recursively fetched all the products from the browse method to extract the categories.

##### Data Access
###### Back end : ``` npm install algoliasearch --save-dev ``` and then algolia's API
###### Front end : Algolia's REST API

## Back end
#### Tech stack
```nodejs v3.5.2  ``` good for small sized MVC (but not exclusively of course :))  
```Express v4.13.3  ```  
```Mocha v2.3.4  ``` for tests  
#### End points
`GET / (200 OK or 404 NOTFOUND)` render the HTML page  
`POST /api/1/apps (201 CREATED or 401 NOT MODIFIED) ` Add an app (as a JSON object) to the Algolia apps index and return its id  
`DELETE /api/1/apps/:id (200 OK CREATED or 204 NO CONTENT)` delete an app from the store

## Front end
#### Tech stack
##### Framework
`angular v1.4.8`  
`angular-resource v1.4.8` (I slightly modified it to make sure that post data containing '&' was encoded - there is an open bug about it)  
`angular-sanitize v1.4.8` (html sanitize)
##### Task runner
`gulp` for `browserify`-ing, `concat`-ening, `less`-compiling, files `watch`-ing and building everything in the `build/` folder. For debug purposes, it is not minimified, but the performance gain from that would be minimum for this size of project.    

`grunt` for `jshint`-ing and running `karma` test runner with `jasmine` since I sadly could not get `gulp` to work properly with `karma` :(.

## Todo
`@todo` switch to react to analyze the DOM updates difference  
`@todo` improve UI







