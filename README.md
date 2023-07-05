# file-namer

An app to read the contents of a directory containing many oddly named files, i.e. videos, ebooks, music, and split the names up and make them easier to rename all.

## ToDo:

- [x] List directory
- [x] Split name into tokens and make tokens selectable
- [x] Save renamed file 
- [ ] Save renamed file (Tauri) 
- [x] Choose File dir `*`
- [x] Choose Delimiters
- [x] Pattern matching, i.e. select all matching words in the list
- [ ] Ability to add text to filenames
- [ ] Tailwind
- [x] Tauri build

`*` Showing and selecting the directory appears inherently problematic in clientside, the standard flow for this sort of thing is to upload a bunch of files to a server, this app is not intended to do that, rather just rename the files where they are which means the client needs access to the hard disc.  As that currently appears to be impossible this will have to wait until I convert it to a Tauri standalone app, which is what this is more suited to anyway.  Running this app on a server and requiring a user to upload a bunch of files to rename then download them all again is stupid.