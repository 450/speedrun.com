# THIS IS CURRENTLY A WORK-IN-PROGRESS AND IS NOT COMPLETE, FILES MENTIONED IN THIS README MAY NOT HAVE BEEN CREATED YET

When this is ready I'll create a topic about it on the Speedrun.com forum.

---

# speedrun.com
My unaffiliated rework of the Speedrun.com website. The official albeit unused Speedrun.com repository is available at https://github.com/speedruncom.

I've created this repository following my comments on the site's current HTML at http://www.speedrun.com/The_Site/thread/ofyge with permission from Lighnat0r.

When referring to the *current* Speedrun.com I'm talking about the design on the 26th of March 2015. This document may be out of date, and hopefully will be out of date in the near future. This repository simply sets out to give the current developers an easy insight into how to fix current site issues.

---

## Readme Contents

* [What's different?](#whats-different)
  * [HTML From the Ground Up](#html-from-the-ground-up)
    * [Updated to HTML5](#updated-to-html5)
    * [The Page Header](#the-page-header)
    * [Unsemantic Tables Replaced with Relevant Markup](#unsemantic-tables-replaced-with-relevant-markup)
      * [Navigation Menus](#navigation-menus)
    * [Scripts Moved from Head to Body](#scripts-moved-from-head-to-body)
  * [CSS Rewritten and Restructured](#css-rewritten-and-restructured)
  * [JavaScript Updated](#javascript-updated)
* [File Structure](#file-structure)
  * [HTML](#html)
  * [Stylesheets](#stylesheets)
  * [JavaScript](#javascript)
  * [Images](#images)

---

## What's different?

### HTML From the Ground Up

#### Updated to HTML5

The current Speedrun.com website uses HTML401 and invalidly introduces HTML5 elements which didn't exist in the HTML401 specification. All pages within this repository are HTML5 compliant and all feature the following declaration at the top:

```
<!doctype HTML>
```

The HTML has been tested to be fully compliant with W3's validator service. The current homepage of Speedrun.com throws an impressive 22 errors, whereas this doesn't throw any.

The HTML5 specification can be found at http://www.w3.org/TR/html5.
The W3's HTML validation service can be found at http://validator.w3.org.

In addition to this, the popular [HTML5 Shiv](https://github.com/aFarkas/html5shiv) has been introduced to allow old versions of Internet Explorer to use the new HTML5 elements. This can be found in the Assets/HTML5Shiv folder. Targetting only versions of IE lower than 9, the following declaration can be found in the `<head>` element of each page:

```
<!--[if lt IE 9]>
  <script src="Assets/HTML5Shiv/html5shiv.min.js"></script>
<![endif]-->
```

#### The Page Header

The page header on the current Speedrun.com website features two elements positioned on top of each other - one for the full-width background and the other for the inner content. This has now been replaced with just one HTML5 `<header>` element. Within this, the now-invalid `<center>` element (which was deprecated in the HTML401 specification) has been replaced with a HTML5 `<section>` element which has been given the following CSS declaration: `margin: 0 auto`. This keeps the element block-level, keeping the style similar accross multiple devices and browsers.

```
<header>
	<section class="wrapper table-display">
	  ...
	</section>
</header>
```

For SEO purposes, a hidden `<h1>` element has been placed alongside the site's logo with the content "Speedrun.com". This is the title of the page, and can be updated on each page to let search engine crawlers know what the page's purpose is. E.g. "Speedrun.com's Games Listing". Due to it being hidden, users will not know this element exists unless they're using screen readers - perfect for accessibility, too!

```
<h1 style="display: none">Speedrun.com</h1> <!-- For SEO purposes. -->
```

#### Unsemantic Tables Replaced with Relevant Markup

The current Speedrun.com website uses the HTML `<table>` element for layout in a lot of places. There is no situation in HTML where the `<table>` element should be used for anything other than tabular content. The main question to ask before using the `<table>` element is *What is this a table of?*, and if the answer is anything other than *something something data to be displayed in a table* then tables should definitely not be used.

CSS allows us to style things to look like tables with its `display: table` and equivalent `display: table-row` and `display: table-cell` properties. This *is* semantic and has been used in various places instead.

##### Navigation Menus

Navigation menus aren't tabular data, so have been updated to now use the HTML5 `<nav>` element, and feature unordered lists of links.

```
<nav>
	<ul>
		<li>
			<a href="Games/index.html">Games</a>
		</li>
		...
	</ul>
</nav>
```

#### Scripts Moved from Head to Body

The general practice on `<script>` element placement is that scripts should appear [*before you need it [and] no sooner*](http://stackoverflow.com/a/196708/1317805). With the exception of the HTML5 Shiv which is placed in the `<head>` due to it being required prior to HTML5 elements and attributes being used, all of the JavaScript files are now initiated before the closing `</body>` tag.

```
<body>
  ...
	<script type="text/javascript" src="Assets/jQuery/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="Assets/Generic.js"></script>
</body>
```

### CSS Rewritten and Restructured

The current Speedrun.com website only uses one CSS document per theme. This means that for every theme created, the entire site's CSS is copied out and modified accordingly. Whilst this works it isn't a very practical approach. The first thing I've done is to create a separate `Global.css` file which contains any styling shared accross all themes. This not only makes the styling easier to maintain, but it also leverages caching and will make the site load slightly faster than it currently does.

As with W3's HTML validation service, they also offer a CSS validation service. The current Default theme on Speedrun.com throws 39 errors - although some of these are admittedly unavoidable.

The W3's CSS validation service can be found at http://jigsaw.w3.org.

Ideally this will need to be minified before being put into production.

### JavaScript Updated

The existing JavaScript on the current Speedrun.com website is pretty problem-free. There are a couple of bits which could do with improvement, but nothing major. For the purpose of this repository though I have rewritten the basic front-end functionality to make it work with the new HTML structure and conform with standards.

The current site uses jQuery 1.10.x but I've updated this to the latest version 1.11.2. This shouldn't affect any existing code which will need to be migrated over from the current website.

As with the CSS, ideally this will need to be minified before being put into production.

---

## File Structure

### HTML

The filenames themselves link to the Github-hosted preview of the page, which has the base URL of http://450.github.io/speedrun.com.

Folder | Name | Purpose
------ | ---- | -------
↳ | [index.html](http://450.github.io/speedrun.com) | This is the main homepage (http://speedrun.com)
Games | index.html | This is the Games top-level page (http://speedrun.com/games)
Streams | index.html | This is the Streams top-level page (http://speedrun.com/streams)
Resources | index.html | This is the Resources top-level page (http://speedrun.com/resources)
Forums | index.html | This is the forum top-level page (http://speedrun.com/forum)
Users | ExampleUser.html | This is an example user page (http://speedrun.com/user/...)

### Stylesheets

Base folder: Assets

Folder | Name | Purpose
------ | ---- | -------
↳ | Global.css | Globally used CSS. This applies to all themes
Themes | Default.css | Default theme

### JavaScript

Base folder: Assets

Folder | Name | Purpose
------ | ---- | -------
↳ | Generic.js | Globally used JavaScript, to be minified
HTML5Shiv | html5shiv.min.js | [HTML5 Shiv](https://github.com/aFarkas/html5shiv)
- | html5shiv-printshiv.min.js | -
jQuery | jquery-1.11.2.min.js | [jQuery](https://github.com/jquery/jquery)

### Images

Base folder: Assets

Folder | Purpose
------ | ---- | -------
↳ | Site logo and favicon
Icons | Icon images used throughout site
Themes/Backgrounds | Theme background images