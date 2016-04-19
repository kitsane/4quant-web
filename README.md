# 4Quant Webpage

This project contains the static site for [http://www.4quant.com](http://www.4quant.com).

## Installation

The be able to build and run the website locally, make changes and deploy, you need to have the following software on your computer:

### Git

[Git](http://git-scm.com/) is used as version control system to manage the source code and a GUI GitHub client can be
installed from:

* [GitHub for Mac](http://mac.github.com/)

Please have a look at the client help page on how to checkout the project locally to your computer.

### Ruby

[Ruby](https://www.ruby-lang.org/) needs to be installed on your Machine. 
[Bundler](http://bundler.io/) needs also be present, you can install it on the command line with:

```Bash
$ gem install bundler
```

### Node 

[Node](https://www.nodejs.org/) needs to be installed on your Machine. 

### ImageMagick

[ImageMagick](http://www.imagemagick.org/)

On mac:
```Bash
$ brew install imagemagick
```

## Prepare

To install all dependencies, bundle the project:

```Bash
$ bundle
$ npm install
$ bower install
$ gulp
```

## Run

To run the project, start middleman an open your browser at [http://localhost:4567](http://localhost:4567)

```
$ bundle exec middleman
```

## Build

To build the final site:

```Bash
$ bundle exec middleman build
```

The site will be generated to the `build` directory.

## Deployment

To deploy the final site to github use:

```Bash
$ bundle exec middleman deploy
```

You can visit the site under [4quant](http://kitsane.github.io/4quant-web).

## How to News

News articles are to be placed under ```./source/news/``` in a directory with the naming schema ```./source/news/YYYY-MM-DD-News-Article-Title```. 

Within this dir, there is a index.html.md file to be written in Markdown with the header like:

```
---
title: 'Flood Risk Analytics'
date: 2015-08-09
---
```

Code sample blocks within slides are to be placed between the markdown Syntax like:

```
~~~ json
{
    "fancy":"item",
    "moreFancy": ["array","items"],
    "no": 1
}
~~~
```

### Images

The images go into the subdir ```images``` as a subdir of ```./source/news/YYYY-MM-DD-News-Article-Title```. Within the markdown they're to be referenced like ```![image](images/image-name.png)```.

## How to Slides

Slides are to be placed under ```./source/slides/``` in a directory with the naming schema ```./source/news/Your-Slides-Title```.

Within this dir, there is a index.html.md file to be written in Markdown with the header like:

```
---
title: 'Your Slide Title'
date: 2015-08-09
---
```

The Syntax explained by [hakimel/reveal.js](https://github.com/hakimel/reveal.js) is to be followed.

Code sample blocks within slides are to be placed between the markdown Syntax like:

```
~~~ json
{
    "fancy":"item",
    "moreFancy": ["array","items"],
    "no": 1
}
~~~
```

### Images

The images go into the subdir ```images``` as a subdir of ```./source/news/Your-Slides-Title```. Within the markdown they're to be referenced like ```![image](images/image-name.png)```.