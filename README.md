# THIS IS CURRENTLY A WORK-IN-PROGRESS AND IS NOT COMPLETE, FILES MENTIONED IN THIS README MAY NOT HAVE BEEN CREATED YET

When this is ready I'll create a topic about it on the Speedrun.com forum.

# speedrun.com
My unaffiliated rework of the Speedrun.com website. The official albeit unused Speedrun.com repository is available at https://github.com/speedruncom.

I've created this repository following my comments on the site's current HTML at http://www.speedrun.com/The_Site/thread/ofyge.

When referring to the *current* Speedrun.com I'm talking about the design on the 26th of March 2015. This document may be out of date, and hopefully will be out of date in the near future. This repository simply sets out to give the current developers an easy insight into how to fix current site issues.

## Files

### HTML

Folder | Name | Purpose
------ | ---- | -------
↳ | index.html | This is the main homepage (http://speedrun.com)
Games | index.html | This is the Games top-level page (http://speedrun.com/games)
Streams | index.html | This is the Streams top-level page (http://speedrun.com/streams)
Resources | index.html | This is the Resources top-level page (http://speedrun.com/resources)
Forum | index.html | This is the forum top-level page (http://speedrun.com/forum)

### Stylesheets

Base folder: Assets

Folder | Name | Purpose
------ | ---- | -------
↳ | Global.css | Globally used CSS. This applies to all themes
Themes | ... | Various themes applied on top of Global.css

### JavaScript

Base folder: Assets

Folder | Name | Purpose
------ | ---- | -------
↳ | Generic.js | Globally used JavaScript, to be minified
HTML5Shiv | html5shiv.min.js | [HTML5 Shiv](https://github.com/aFarkas/html5shiv)
 | html5shiv-printshiv.min.js | 
jQuery | jquery-1.11.2.min.js | [jQuery](https://github.com/jquery/jquery)

## What's different?

### HTML5 From the Ground Up

The existing Speedrun.com website uses HTML401 and invalidly introduces HTML5 elements which didn't exist in the HTML401 specification. All pages within this repository are HTML5 compliant and all feature the following declaration at the top:

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