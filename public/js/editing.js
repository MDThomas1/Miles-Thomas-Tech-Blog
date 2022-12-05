const postEdit = document.querySelector('#post-edit')
const postUpdate = document.querySelector('#update-post')

let id
const newTitle = document.querySelector('#new-title')
const newContents = document.querySelector('#new-contents')

const loadEditing = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        id = event.target.getAttribute('data-id')

        const response = await fetch(`/editmenu/${id}`)

        if (response.ok) {
            newTitle.value = response.title
            newContents.vlaue = response.contents 
        }
    }
}

postEdit.addEventListener('click', loadEditing)

const updatePost = async (event) => {
    event.preventDefault();

    const newTitle = document.querySelector('#new-title').value.trim();
    const newContents = document.querySelector('#new-contents').value.trim();

    if (newTitle && newContents) {
        const response = await fetch('/api/posts/update', {
            method: 'PUT',
            body: JSON.stringify({ title: newTitle, contents: newContents }),
            headers: {
                'Content-Type': 'application/json', 
            }
        })

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to update post!')
        }
    }
}

postUpdate.addEventListener('submit', updatePost)






