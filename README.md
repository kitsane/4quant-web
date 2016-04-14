# 4Quant Webpage

This project contains the static site for [http://www.4quant.com](http://www.4quant.com) and makes use of the following tools:

* [Middleman](https://middlemanapp.com/) to generate the static web page.
* [Gulp](https://gulpjs.com/) to manage front end assets

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

## Prepare

To install all dependencies, bundle the project:

```Bash
$ bundle
$ npm install
$ bower install
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