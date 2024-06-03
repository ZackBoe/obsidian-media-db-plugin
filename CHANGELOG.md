# Changelog

# 0.7.0

-   renamed the plugin to just `Media DB`
-   Add plot field when fetching data from OMDb [#106](https://github.com/mProjectsCode/obsidian-media-db-plugin/pull/106) (thanks onesvat)
-   Added support for Moby Games API [#131](https://github.com/mProjectsCode/obsidian-media-db-plugin/pull/131) (thanks ltctceplrm)
-   Add index operator for arrays when templating [#129](https://github.com/mProjectsCode/obsidian-media-db-plugin/pull/129) (thanks kelszo)
-   Support disabling default front matter and add support for Templater [#119](https://github.com/mProjectsCode/obsidian-media-db-plugin/pull/119) (thanks kelszo)
-   Add option to open new note in a new tab [#128](https://github.com/mProjectsCode/obsidian-media-db-plugin/pull/128) (thanks kelszo)
-   Added developers and publishers field to games [#122](https://github.com/mProjectsCode/obsidian-media-db-plugin/pull/122) (thanks ltctceplrm)

# 0.6.0

-   Added manga support through Jikan
-   Added book support through Open Library
-   Added album cover support for music releases
-   Split up `producer` into `studio`, `director` and `writer` for movies and series
-   fixed the preview modal not displaying the frontmatter anymore

# 0.5.0

-   New simple search modal, select the media type and search all applicable APIs
-   More data for Board Games
-   Actors and Streaming Platforms for Movies and Series
-   Separate new file location for all media types
-   Separate command for each media type
-   Fix problems with closing of preview modal

# 0.3.2

-   Added Board Game Geek API (documentation pending)
-   More information in the search results
-   various fixes

# 0.3.1

-   various fixes

# 0.3.0

-   Added bulk import. Import a folder of media notes as Media DB entries (thanks to [PaperOrb](https://github.com/PaperOrb) on GitHub for their input and for helping me test this feature)
-   Added a custom result select modal that allows you to select multiple results at once
-   Fixed a bug where the note creation would fail when the metadata included a field with the values `null` or `undefined`

# 0.2.1

-   fixed a small bug with the initial selection of an API in the ID search modal

# 0.2.0

-   Added the option to rename metadata fields through property mappings
-   fixed note creation falling, when the folder set in the settings did not exist