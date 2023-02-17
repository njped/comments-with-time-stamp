const buttonElement = document.querySelector('.submitBtn');
buttonElement.addEventListener('click', handleOnClick);

let comments = [];
const FILTER_BY_TIMESTAMP = 'filter-by-timestamp';
const FILTER_BY_USERNAME = 'filter-by-username';
let filterBy = FILTER_BY_TIMESTAMP;

function handleOnClick() {
    let username = document.getElementById('username').value;
    let comment = document.getElementById('commentText').value;
    addNewComment(username, comment);
}

function addNewComment(username, comment) {
    comments.push({
        username,
        comment,
        timeStamp: new Date()
    });

    renderComments();
}

function renderComments() {
    const commentsElement = document.querySelector(".comments");
    let newInnerHTML = "";
    comments.forEach((commentItem) => {
        const { username, comment } = commentItem;
        newInnerHTML += `<li>${username} -\n${comment}</li>`;
    });

    commentsElement.innerHTML = newInnerHTML;
}

function makeSelectDropDownWork() {
    const selectElement = document.querySelector('select');
    selectElement.addEventListener('change', handleSelectChange)
}

function handleSelectChange() {
    const selectElement = document.querySelector('select');
    filterBy = selectElement.value;
    updateCommentsOrder();
    renderComments();
}

function updateCommentsOrder() {
    switch (filterBy) {
        case FILTER_BY_TIMESTAMP:
            comments.sort(sortByTimeStamp)
            break;
        case FILTER_BY_USERNAME:
            comments.sort(sortByUsername);
            break;
        default:
            console.error('issue with filterBy case');
            break;
    }
}

function sortByUsername(a, b) {
    if(a.username === b.username){
        return 0;
    }
    else if (a.username > b.username) {
        return 1;
    }
    else 
    return -1
}

function sortByTimeStamp(a, b) {
    return a.timeStamp - b.timeStamp;
}