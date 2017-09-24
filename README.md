# JQuery Music Player

A simple and easy to use music player in Jquery.

## Features

  - Can be integrated on any site that supports custom Javascript.
  - Choose between two built in themes (dark or light).
  - Display song title, artist and cover image (requires jsmediatags) (disabled by default)
  - Skip, Repeat or Shuffle as you please.
  - Use Font Awesome icons for the buttons (disabled by default)
  
## Requirements

  - JQuery (duh)
  
## How to use

1. Link the source files within your html &lt;head&gt; tags:

```html
<link rel="stylesheet" href="css/jqmusic.min.css" type="text/css"/>
<script src="js/config.js"></script>
<script src="js/jqmusic.min.js"></script>
```

2. Include the load tag on the part of the page where you want to load the music player.

```html
<div id="jqmusic"></div>
```

3. Create a folder and add your chosen audio files. Supported types are .mp3 and .ogg

4. Configure options.

## Configuration

Inside the config.js file is where you'd configure your options.

Choose whether or not you want to use Font Awesome icons for the control buttons:
This requires that Font Awesome is loaded on your page.

```js
var usefa = true;
```

The ID or class of the element where the music player will be loaded:

```js
var loadto = "#jqmusic";
```

Define where the script will look for audio files:

```js
var tracklocation = "tracks/";
```

Choose whether or not to display the artist, title and cover image (if available):

```js
var displaymeta = false;
```
NOTE: If you set this to true, you also need to include [JSMediaTags](https://github.com/aadsm/jsmediatags) within your &lt;head&gt; tags like this:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.7.0/jsmediatags.min.js"></script>
```

Choose which theme to use:
The options are "dark", "light" or "custom". "custom" means that no css will be applied to the player. So you can fully customize it yourself.

```js
var theme = "dark";
```

## Demo

The configuration example above should give you something like this.

[![N|Solid](https://i.haakonhawk.com/jqmusic.png)](https://www.haakonhawk.com/jqmusic/demo/)

### [View Demo](https://www.haakonhawk.com/jqmusic/demo/)


## Troubleshooting

  Why does artist or title show "Unknown"?
  - That happens if there is no title or artist within the audio track's meta tags.
  
  Why does artist and title show "N/A"?
  - This is short for "Not Available" and happens if the script failed find anything within the audio track's meta tags. This is a problem with the jsmediatags library and is unfortunately beyond my control.
  
  
