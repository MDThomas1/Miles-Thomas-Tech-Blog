const createComment = async (event) => {
    event.preventDefault();
  
    const message = document.querySelector('#new-message').value.trim();
  
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

const updateComment = async (event) => {
    event.preventDefault();

    const newMessage = document.querySelector('#new-message').value.trim();

    if (newMessage) {
        const response = await fetch('/api/comments/update', {
            method: 'PUT',
            body: JSON.stringify({ message: newMessage }),
            headers: {
                'Content-Type': 'application/json', 
            }
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to update comment!')
        };
    };
};
  
const deleteComment = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete comment!');
      }
    }
};