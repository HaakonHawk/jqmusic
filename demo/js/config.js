// JQuery music player by Haakon "Hawk" D. A

var usefa = true;
// Set to "true" to utilize Font Awesome.
// This assumes you have Font Awesome loaded on the page where you want to load the music player.


var loadto = "#jqmusic";
// ID or class of the element where you want to load the music player.


var tracklocation = "tracks/";
// The directory where the tracks are stored.


var displaymeta = true;
// Set to true if you want to display song information (artist, title, etc).
// Requires jsmediatags. Include <script src="https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.7.0/jsmediatags.min.js"></script> within your <head> tags.

// NOTE: If this is set to "true". This script will add the full http path to the "tracklocation" variable. So "tracks/" would become "http://example.com/your_page/tracks/".
// The reason for this is because the library used to get the meta tags (jsmediatags) requires the full external url to the file. 
// But despite this stupid flaw, it's somehow still the most reliable and popular library out there...


var theme = "dark";
// Theme - Choose between "dark", "light" or "custom" - "custom" means no css is applied, so you can fully customize it the way you want.