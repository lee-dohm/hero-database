# Hero Database

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

An application for streamlining the HERO System character creation process and storing all of your characters.

## History

I've been a huge fan of [HERO Games][hero-games] and the HERO System since the original [Champions game system][champions] came out in 1981! One of my earliest programming projects was a simulated die roller that would assist with skill rolls and perform damage calculations in exactly the way that the HERO System described. Later I would attempt several times as a teenager to create a character creation and database utility that would streamline the sometimes very complex process of building a character. At the time, my skills (and the technology available to me) weren't up to the task. Since then, every five to ten years or so, I give it another shot. This is the latest iteration. I've decided to build it [open source][license] using [Electron][electron].

## Support

If you like what you see here and want to help in a monetary fashion, go to the [HERO Games store][hero-games] and buy something! (The [Basic Rulebook][basic-rulebook] is only 15USD in PDF format.) I want to see HERO Games last a long, long time :grinning:

## Ruleset

This application is designed to work with the [HERO System 6th Edition rules][sixth-edition].

Where the rules state that something is allowed with "GM permission", the code assumes that it is allowed since a GM will be using this application far more often than a regular player for creating all the non-player characters in the game setting. Optional and house rules will be made possible through the use of configuration files.

### References

While the application, in order to provide its planned capabilities, must provide some implementation of the game system's rules, as much as possible the code, documentation, data files, and help text will refer to the rules themselves for any additional information. In this way I hope to avoid people being able to use Hero Database in lieu of purchasing the rules themselves. References follow the format laid out in `6E1 13 Abbreviations`.

## Hero Designer

There is an official product from HERO Games called [Hero Designer][hero-designer] that already does what this application is planned to do and probably more. Hero Database isn't meant to be a competitor to Hero Designer, more of an alternative and an experiment for me.

## Copyright

The contents of this repository are copyright &copy; 2016-2017 by [Lee Dohm](http://www.lee-dohm.com). See [LICENSE][license] for details.

"HERO System", "HERO Games", and the Hex Man logo are trademarks of [DOJ Inc., dba "Hero Games"][hero-games].

[basic-rulebook]: http://www.herogames.com/forums/store/product/77-hero-system-basic-rulebook-pdf/
[champions]: https://en.wikipedia.org/wiki/Champions_(role-playing_game)
[electron]: http://electron.atom.io
[hero-designer]: http://www.herogames.com/forums/store/product/1-hero-designer/
[hero-games]: http://www.herogames.com/
[license]: https://raw.githubusercontent.com/lee-dohm/hero-database/master/LICENSE.md
[sixth-edition]: http://www.herogames.com/forums/store/category/2-hero-system-6th-edition/
