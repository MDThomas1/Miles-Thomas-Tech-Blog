const commentSubmit = document.querySelector('#comment-submit')
const id = document.querySelector('#id-saved').textContent

const createComment = async (event) => {
    event.preventDefault();
  
    const message = document.querySelector('#comment-body').value.trim();
  
    if (id && message) {
      const response = await fetch(`/api/comments/upload`, {
        method: 'POST',
        body: JSON.stringify({ message: message, post_id: id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create comment!');
      }
    }
};

commentSubmit.addEventListener('submit', createComment)