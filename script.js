// Show the latest MiniRADS commits on the Projects page, live from the GitHub API.

// 1. Find the two elements on the page (the DOM), by their id
const button = document.querySelector('#show-commits');
const list = document.querySelector('#commit-list');

// 2. When the button is clicked (an event), run this function
button.addEventListener('click', async () => {
  button.disabled = true;           // stop double clicks while we wait
  button.textContent = 'Loading…';

  try {
    // 3. Call the GitHub API: fetch is JavaScript's version of curl
    
    const response = await fetch('https://api.github.com/repos/Elmosko-png/minirads/commits');
    if (!response.ok) {                         // ok = any 2xx status code
      throw new Error(`GitHub replied ${response.status}`);
    }

    const commits = await response.json();      // turn the JSON text into a JavaScript list
    
    // 4. Put each commit message into the list on the page (the DOM)
    list.innerHTML = '';                        // clear anything already there
        for (const commit of commits.slice(0, 5)) {
            const message = commit.commit.message;             // the commit message, found in the JSON
      const item = document.createElement('li');
      item.textContent = message.split('\n')[0]; // first line only
      list.appendChild(item);
    }

    button.textContent = 'Latest commits';
  } catch (error) {
    list.innerHTML = '<li>Couldn\'t load commits right now.</li>';
    button.textContent = 'Try again';
    button.disabled = false;
    console.error(error);   // show the real error in the Console, for us
  }
});
