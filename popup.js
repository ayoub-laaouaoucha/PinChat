document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveLink');
    const linkList = document.getElementById('linkList');

    // Load saved links from localStorage on startup
    loadLinks();

    // Save link with title and URL
    saveButton.addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const url = document.getElementById('url').value;

        if (!title || !url) {
            alert('Please enter both a title and URL');
            return;
        }

        const newLink = { title, url };
        saveLink(newLink);
        displayLink(newLink);

        // Clear the input fields
        document.getElementById('title').value = '';
        document.getElementById('url').value = '';
    });

    // Save link to localStorage
    function saveLink(link) {
        const links = JSON.parse(localStorage.getItem('chatLinks') || '[]');
        links.push(link);
        localStorage.setItem('chatLinks', JSON.stringify(links));
    }

    // Load links from localStorage and display them
    function loadLinks() {
        const links = JSON.parse(localStorage.getItem('chatLinks') || '[]');
        links.forEach(displayLink);
    }

    // Display a link in the list
    function displayLink(link) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${link.title}</strong><br>
            <a href="${link.url}" target="_blank">${link.url}</a>
            <button class="deleteButton">Delete</button>
        `;

        // Add delete functionality
        listItem.querySelector('.deleteButton').addEventListener('click', () => {
            deleteLink(link);
            linkList.removeChild(listItem);
        });

        linkList.appendChild(listItem);
    }

    // Delete a link from localStorage
    function deleteLink(linkToDelete) {
        let links = JSON.parse(localStorage.getItem('chatLinks') || '[]');
        links = links.filter(link => link.url !== linkToDelete.url);
        localStorage.setItem('chatLinks', JSON.stringify(links));
    }
});