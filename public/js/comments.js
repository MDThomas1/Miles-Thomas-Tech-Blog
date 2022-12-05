const commentSubmit = document.querySelector('#comment-submit')

const createComment = async (event) => {
    event.preventDefault();
  
    const message = document.querySelector('#comment-body').value.trim();
  
    if (message) {
      const response = await fetch(`/api/comments/upload`, {
        method: 'POST',
        body: JSON.stringify({ message: message }),
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