# spotify_web_clone

1. Song List Management: 
   - It dynamically loads a list of songs from a specified album (folder).
   - Uses `fetch()` to retrieve a list of songs from a server, with file names ending in `.mp3`.
   - Displays song names, artist names, and icons for each song in the list.
   - Each song has play/pause functionality.

2. Song Playback:
   - Clicking on a song in the list plays that song, while pausing the currently playing one.
   - Play/pause buttons are displayed dynamically based on the current playback state.
   - Displays the song's name and artist in the current song info section.
   - Song progress is displayed in a "time update" format (mm:ss / mm:ss).

3. Play/Pause Control:
   - Play/Pause buttons toggle between playing and pausing the current song.
   - If a song is playing, the play button is hidden, and the pause button is shown.
   - If a song is paused, the play button is visible, and the pause button is hidden.

4. Next/Previous Song Navigation:
   - Users can move to the next or previous song by clicking the respective "next" or "previous" buttons.
   - When a song ends, it automatically moves to the next song in the playlist.
   - When navigating to the next or previous song, the song's play/pause state is updated accordingly.

5. Audio Progress Bar:
   - Shows the song's playback progress through a moving circle (slider) on a progress bar.
   - Users can click on the progress bar to jump to a specific point in the song.
   - The circle position updates in real time as the song plays.

6. Mobile/Responsive UI:
   - On smaller screens, there is a button to open and close the sidebar that contains the list of available albums.
   - The albums' covers and names are displayed in a card layout.
   - Clicking on an album card loads the song list for that album.
   
7. Song Duration Formatter:
   - The time display for the song is in the format `mm:ss / mm:ss`, with both current time and total duration.
  

8. Folder Structure Handling:
    - Folders are fetched and displayed from a directory structure, and each folder contains a `cover.jpg` image and a `info.json` file with metadata (e.g., album title).
    
9. Responsive Sidebar Toggle:
    - There's a sidebar that can be toggled open or closed on smaller screens, improving usability on mobile devices.

10. Event Listeners for Navigation Buttons**:
    - There are event listeners for the "next" and "previous" buttons to skip to the next or previous song in the playlist.
