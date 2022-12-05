const cardContainer = document.querySelector('.card-container')
const submitPost = document.querySelector('#submit-post')
const postDelete = document.querySelector('#post-delete')

const postPage = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch (`/viewport/${id}`, {
      method: 'GET' 
    })
  }
}

cardContainer.addEventListener('click', postPage)

const createPost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const contents = document.querySelector('#post-contents').value.trim();
  
    if (title && contents) {
      const response = await fetch(`/api/posts/upload`, {
        method: 'POST',
        body: JSON.stringify({ title: title, contents: contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create post!');
      }
    }
};

submitPost.addEventListener('submit', createPost)



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
  
const deletePost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete post!');
      }
    }
};

postDelete.addEventListener('click', deletePost)


  