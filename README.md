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
  * [HTML5 From the Ground Up](#html5-from-the-ground-up)
  * [CSS Rewritten and Restructured](#css-rewritten-and-restructured)
* [File Structure](#files)
  * [HTML](#html)
  * [Stylesheets](#stylesheets)
  * [JavaScript](#javascript)
  * [Images](#images)

---

## What's different?

### HTML5 From the Ground Up

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

### CSS Rewritten and Restructured

The current Speedrun.com website only uses one CSS document per theme. This means that for every theme created, the entire site's CSS is copied out and modified accordingly. Whilst this works it isn't a very practical approach. The first thing I've done is to create a separate `Global.css` file which contains any styling shared accross all themes. This not only makes the styling easier to maintain, but it also leverages caching and will make the site load slightly faster than it currently does.

As with W3's HTML validation service, they also offer a CSS validation service. The current Default theme on Speedrun.com throws 39 errors - although some of these are admittedly unavoidable.

The W3's CSS validation service can be found at http://jigsaw.w3.org.

---

## File Structure

### HTML

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