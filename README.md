# THIS IS CURRENTLY A WORK-IN-PROGRESS AND IS NOT COMPLETE, FILES MENTIONED IN THIS README MAY NOT HAVE BEEN CREATED YET

When this is ready I'll create a topic about it on the Speedrun.com forum.

---

# Speedrun.com Rework
My unaffiliated rework of the Speedrun.com website. The official albeit unused Speedrun.com repository is available at https://github.com/speedruncom.

I've created this repository following my comments on the site's current HTML at http://www.speedrun.com/The_Site/thread/ofyge with permission from Lighnat0r.

Published demo pages can be demoed at http://450.github.io/speedrun.com.

When referring to the *current* Speedrun.com I'm talking about the design on the 26th of March 2015. This document may be out of date, and hopefully will be out of date in the near future. This repository simply sets out to give the current developers an easy insight into how to fix current site issues.

---

## Readme Contents

* [What's Different?](#whats-different)
  * [HTML From the Ground Up](#html-from-the-ground-up)
    * [Updated to HTML5](#updated-to-html5)
    * [No More Inline Styling](#no-more-inline-styling)
    * [The Page Header](#the-page-header)
    * [Unsemantic Tables Replaced with Relevant Markup](#unsemantic-tables-replaced-with-relevant-markup)
      * [Navigation Menus](#navigation-menus)
      * [Content Boxes On Each Page](#content-boxes-on-each-page)
    * [Scripts Moved from Head to Body](#scripts-moved-from-head-to-body)
    * [Other Minor Changes](#other-minor-changes)
  * [CSS Rewritten and Restructured](#css-rewritten-and-restructured)
    * [Internet Explorer's Filter Property](#internet-explorers-filter-property)
  * [JavaScript Updated](#javascript-updated)
* [Further Notes](#further-notes)
* [File Structure](#file-structure)
  * [HTML](#html)
  * [Stylesheets](#stylesheets)
  * [JavaScript](#javascript)
  * [Images](#images)
* [Validation Tests](#validation-tests)
  * [HTML](#html-1)
  * [CSS](#css)

---

## What's Different?

### HTML From the Ground Up

#### Updated to HTML5

The current Speedrun.com website uses HTML401 and invalidly introduces HTML5 elements which didn't exist in the HTML401 specification. All pages within this repository are HTML5 compliant and all feature the following declaration at the top:

```html
<!doctype HTML>
```

The HTML has been tested to be fully compliant with W3's validator service. The current homepage of Speedrun.com throws an impressive 22 errors, whereas this doesn't throw any.

* HTML5 specification: http://www.w3.org/TR/html5.
* W3's HTML validation service: http://validator.w3.org.

In addition to this, the popular [HTML5 Shiv](https://github.com/aFarkas/html5shiv) has been introduced to allow old versions of Internet Explorer to use the new HTML5 elements. This can be found in the Assets/HTML5Shiv folder. Targetting only versions of IE lower than or equal to 9, the following declaration can be found in the `<head>` element of each page:

```html
<!--[if lte IE 9]>
  <script src="Assets/HTML5Shiv/html5shiv.min.js"></script>
<![endif]-->
```

*Note: The HTML5Shiv repository states to use `lt IE 9` to target versions less than IE9, but IE9 does not support the `<main>` element which we're using. If you don't want to target IE9 with this, simply change the above snippet to `lt IE 9` and manually add in support for the `<main>` element using `document.createElement('main')`. Further styling changes may be required with this approach as well.*

#### No More Inline Styling

Inline styling is bad, very bad! Inline styling makes the entire website very hard to maintain as it means you have to edit multiple pages rather than just the one CSS file. With that said, moving inline styling into a CSS file is definitely the way forward.

One breaking issue on the current Speedrun.com website is that the page widths are defined entirely with inline styling. A lot of elements feature `style="width: 1135px"` and this means that for a responsive design to be implemented a HTML redesign would be required anyway. The page's width is now contained within the `Global.css` file and is controlled by the `.wrapper` class which is intended to be placed on any element which should be styled like this.

```css
.wrapper {
	margin: 0 auto;
	width: 1136px;
}
```

Inline styling does still exist in a couple of places. The reason for this is that I didn't want this redesign to cause too much of an uphaul on the back-end. Usernames, for example, still have their colours defined within the element's `style` attribute (although I've dropped the unnecessary `!important` declaration the current website uses on these). In an ideal world the only inline styling would be toggled by the JavaScript and all styling including username colours would be driven by the CSS.

*Current Implementation*

```html
<a class="username" href="Users/ExampleUser.html" style="color: #E44;">Example User</a>
```

*Ideal Implementation*

```html
<a class="username red" href="Users/ExampleUser.html">Example User</a>
```

```css
.username.red {
	color: #E44;
}
```

#### The Page Header

The page header on the current Speedrun.com website features two elements positioned on top of each other - one for the full-width background and the other for the inner content. This has now been replaced with just one HTML5 `<header>` element. Within this, the now-invalid `<center>` element (which was deprecated in the HTML401 specification) has been replaced with a HTML5 `<section>` element which has been given the following CSS declaration: `margin: 0 auto`. This keeps the element block-level, keeping the style similar accross multiple devices and browsers.

```html
<header>
	<section class="wrapper table-display">
	  ...
	</section>
</header>
```

For SEO purposes, a hidden `<h1>` element has been placed alongside the site's logo with the content "Speedrun.com". This is the title of the page, and can be updated on each page to let search engine crawlers know what the page's purpose is. E.g. "Speedrun.com's Games Listing". Due to it being hidden, users will not know this element exists unless they're using screen readers - perfect for accessibility, too!

```html
<h1 class="hidden">Speedrun.com</h1> <!-- For SEO purposes. -->
```

#### Unsemantic Tables Replaced with Relevant Markup

The current Speedrun.com website uses the HTML `<table>` element for layout in a lot of places. There is no situation in HTML where the `<table>` element should be used for anything other than tabular content. The main question to ask before using the `<table>` element is *What is this a table of?*, and if the answer is anything other than *something something data to be displayed in a table* then tables should definitely not be used.

CSS allows us to style things to look like tables with its `display: table` and equivalent `display: table-row` and `display: table-cell` properties. This *is* semantic and has been used in various places instead.

##### Navigation Menus

Navigation menus aren't tabular data, so have been updated to now use the HTML5 `<nav>` element, and feature unordered lists of links.

```html
<nav>
	<ul>
		<li>
			<a href="Games/index.html">Games</a>
		</li>
		...
	</ul>
</nav>
```

##### Content Boxes On Each Page

The content boxes on each page also aren't tabular data. They may contain tabular data, but they aren't tabular data themselves. These have been updated to now use HTML5 `<article>` elements instead and are wrapped in the `<main>` element for accessibility purposes:

```html
<main class="wrapper" role="main">
  <article id="latest-runs"> ... </article>
  <article id="latest-tweets"> ... </article>
</main>
```

#### Scripts Moved from Head to Body

The general practice on `<script>` element placement is that scripts should appear [*before you need it [and] no sooner*](http://stackoverflow.com/a/196708/1317805). With the exception of the HTML5 Shiv which is placed in the `<head>` due to it being required prior to HTML5 elements and attributes being used, all of the JavaScript files are now initiated before the closing `</body>` tag.

```html
<body>
  ...
	<script type="text/javascript" src="Assets/jQuery/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="Assets/Generic.js"></script>
</body>
```

#### Other Minor Changes

* `href` attributes have been dropped from `<a>` elements where unnecessary.
* The vertical scrollbar is no longer visible by default on pages which do not need it.

### CSS Rewritten and Restructured

The current Speedrun.com website only uses one CSS document per theme. This means that for every theme created, the entire site's CSS is copied out and modified accordingly. Whilst this works it isn't a very practical approach. The first thing I've done is to create a separate `Global.css` file which contains any styling shared accross all themes. This not only makes the styling easier to maintain, but it also leverages caching and will make the site load slightly faster than it currently does.

As with W3's HTML validation service, they also offer a CSS validation service. The current Default theme on Speedrun.com throws 39 errors - although some of these are admittedly unavoidable.

* W3's CSS validation service: http://jigsaw.w3.org.

Ideally this will need to be minified before being put into production.

#### Internet Exporer's Filter Property

I've currently not implemented the `filter` style declaration supported by Internet Explorer. For some reason the current Speedrun.com website has bright blue filters, which go against the dark theme applied by the Default style. I'm not sure if this was a by-design decision, but as it didn't look right I've got rid of these for the time being.

### JavaScript Updated

The existing JavaScript on the current Speedrun.com website is pretty problem-free. There are a couple of bits which could do with improvement, but nothing major. For the purpose of this repository though I have rewritten the basic front-end functionality to make it work with the new HTML structure and conform with standards.

The current site uses jQuery 1.10.x but I've updated this to the latest version 1.11.2. This shouldn't affect any existing code which will need to be migrated over from the current website.

As with the CSS, ideally this will need to be minified before being put into production.

---

## Further Notes

* For the purposes of running this repository locally without having to create a HTTP server all `<a>` elements' `href` attributes point to a local path (e.g. `index.html` and `../Games/index.html`). For production, this should instead point directly to the base directory (`/` and `/Games/index.html`).

---

## File Structure

The file structure here is purely an example for demo purposes. Pages are liked with each other allowing for this repository to be run as a functional local website with no back-end.

The HTML filenames themselves link to the Github-hosted preview of the page, which has the base URL of http://450.github.io/speedrun.com.

### HTML

Markup is shared across multiple pages. For example, the Streams page features the same full-width `<article>` layout as the `<nav>` element at the top of the Games page.

Folder | Name | Purpose
------ | ---- | -------
↳ | [index.html](http://450.github.io/speedrun.com) | This is the main homepage (http://speedrun.com)
Games | [index.html](http://450.github.io/speedrun.com/Games/index.html) | Games top-level page (http://speedrun.com/games)
↳ | [ExampleGame.html](http://450.github.io/speedrun.com/Games/ExampleGame.html) | Example game page ([http://speedrun.com/...](http://www.speedrun.com/ffxv-episodeduscae))
↳ | [ExampleRun.html](http://450.github.io/speedrun.com/Games/ExampleRun.html) | Example run page ([http://speedrun.com/.../run/...](http://www.speedrun.com/Fairune/run/33900))
Streams | [index.html](http://450.github.io/speedrun.com/Streams/index.html) | Streams top-level page (http://speedrun.com/streams)
Resources | [index.html](http://450.github.io/speedrun.com/Resources/index.html) | Resources top-level page (http://speedrun.com/resources)
Forums | [index.html](http://450.github.io/speedrun.com/Forums/index.html) | Forums top-level page (http://speedrun.com/forum)
Users | [ExampleUser.html](http://450.github.io/speedrun.com/Users/ExampleUser.html) | Example user profile page ([http://speedrun.com/user/...](http://speedrun.com/user/Tryst))
↳ | [EditProfile.html](http://450.github.io/speedrun.com/Users/EditProfile.html) | Edit profile page (http://speedrun.com/editprofile)
↳ | [Settings.html](http://450.github.io/speedrun.com/Users/Settings.html) | Settings page (http://speedrun.com/settings)
↳ | [RunsAwaitingV...](http://450.github.io/speedrun.com/Users/RunsAwaitingVerification.html) | Run verification (http://speedrun.com/runsawaitingverification)

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
↲ Games/Images | Game Images*

\* The demo images in this folder were auto-generated by plageholder image service [Placehold.it](http://placehold.it).

---

## Validation Tests

The following validation tests have been carried out on the completed files to ensure they comply with W3 validation standards. Where appropriate, screenshots of how each page renders on different browsers have also been provided.

What we want to see:

![Valid](http://i.imgur.com/2m0GmDm.png)

What the current Speedrun.com website shows and what we definitely do not want to see:

![Invalid](http://i.imgur.com/c6lk0jF.png)

### HTML

Path | Validity | Screenshots
---- | -------- | -----------
[index.html](http://450.github.io/speedrun.com) | ![Trophy](http://450.github.io/speedrun.com/Assets/Icons/GoldTrophy.png) [Passed](http://validator.w3.org/check?uri=http%3A%2F%2F450.github.io%2Fspeedrun.com%2F) | Windows: [Chrome on 8.1](http://i.imgur.com/QY98ltN.png), [IE8 on XP](http://i.imgur.com/RswgDIa.png), [IE9 on 7](http://i.imgur.com/NFDIVz0.png)
[Games/index.html](http://450.github.io/speedrun.com/Games/index.html) | ![Trophy](http://450.github.io/speedrun.com/Assets/Icons/GoldTrophy.png) [Passed](http://validator.w3.org/check?uri=http%3A%2F%2F450.github.io%2Fspeedrun.com%2FGames%2Findex.html) | Windows: [Chrome on 8.1](http://i.imgur.com/Gb57us6.png), [IE8 on XP](http://i.imgur.com/kcYWiZH.png), [IE9 on 7](http://i.imgur.com/adBroQy.png)
[Games/ExampleGame.html](http://450.github.io/speedrun.com/Games/ExampleGame.html) | ![Trophy](http://450.github.io/speedrun.com/Assets/Icons/GoldTrophy.png) [Passed](http://validator.w3.org/check?uri=http%3A%2F%2F450.github.io%2Fspeedrun.com%2FGames%2FExampleGame.html) | Windows: [Chrome on 8.1](http://i.imgur.com/omV45cY.png), [IE8 on XP](http://i.imgur.com/cOPnx1s.png), [IE9 on 7](http://i.imgur.com/DEhCNdW.png)
[Games/ExampleRun.html](http://450.github.io/speedrun.com/Games/ExampleRun.html) | ![Trophy](http://450.github.io/speedrun.com/Assets/Icons/GoldTrophy.png) [Passed](http://validator.w3.org/check?uri=http%3A%2F%2F450.github.io%2Fspeedrun.com%2FGames%2FExampleRun.html) | Windows: [Chrome on 8.1](http://i.imgur.com/7YR10IW.png), [IE8 on XP](http://i.imgur.com/0L2gLdx.png), [IE9 on 7](http://i.imgur.com/YkgcuDg.png)
[Streams/index.html](http://450.github.io/speedrun.com/Streams/index.html) | Not ready | - 
[Resource/index.html](http://450.github.io/speedrun.com/Resources/index.html) | Not ready | - 
[Forums/index.html](http://450.github.io/speedrun.com/Forums/index.html) | Not ready | - 
[Users/ExampleUser.html](http://450.github.io/speedrun.com/Users/ExampleUser.html) | ![Trophy](http://450.github.io/speedrun.com/Assets/Icons/GoldTrophy.png) [Passed](http://validator.w3.org/check?uri=http%3A%2F%2F450.github.io%2Fspeedrun.com%2FUsers%2FExampleUser.html) | Windows: [Chrome on 8.1](http://i.imgur.com/qOT7RQz.png), [IE8 on XP](http://i.imgur.com/Si9KHpe.png), [IE9 on 7](http://i.imgur.com/f4bY4oR.png) 
[Users/EditProfile.html](http://450.github.io/speedrun.com/Users/EditProfile.html) | Not ready | - 
[Users/Settings.html](http://450.github.io/speedrun.com/Users/Settings.html) | Not ready | - 
[Users/RunsAwaitingV...](http://450.github.io/speedrun.com/Users/RunsAwaitingVerification.html) | Not ready | - 

### CSS

Base folder: Assets

Path | Validity
---- | --------
Global.css | Not ready
Themes/Default.css | Not ready