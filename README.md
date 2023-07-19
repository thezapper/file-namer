# file-namer

A useful app to read a load of oddly named files, for example `Gary Gray - Some.Book.Title.00._.ABC Best-EVAH - More Random Text, The`.

It will split the names up based on a set of token delimiters and make them easier to remove the extra words and rename the files.

## Plan A
The first idea was to make this a Node.js based app.  This sort of worked but the file dialogs available to the client in a web app are tuned towards uploading files to a server, which sort of makes sense.  However I don't want to upload the files to have them renamed - the server is running locally - if you're renaming 3GB video files this is not ideal.

## Plan B
Tauri.  Convert the app to a desktop app with access to the local file system.

I worked out how to run the app in Tauri and debug the web app in VS code.  It's also easy to debug the Rust code, but you can't do both at the same time.  Not that you'd really want to.

## ToDo:

- [x] List directory
- [x] Split name into tokens and make tokens selectable
- [x] Save renamed file 
- [x] Choose File dir `*`
- [x] Choose Delimiters
- [x] Pattern matching, i.e. select all matching words in the list
- [x] Tauri build
- [ ] Tailwind
- [ ] Ability to add text to filenames
- [ ] Reorder words
- [ ] Modal Dialog or Toasts

`*` I ended up changing this to select files instead of a directory so the user could choose specific items and avoid files or directories they don't want.

## Requirements
As this uses Tauri you need to have Rust installed, which means you need the C++ build tools and libs.  The Rust website details everything required and how to install.