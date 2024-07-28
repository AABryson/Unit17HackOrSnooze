"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  console.log('executing getAndShowStoresOnStart');
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  console.log('story', story);
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}" style='background-color:white; margin-top:20px; margin-bottom:20px; padding-left:10px;'> 
     
        <a href="${story.url}" target="a_blank" class="story-link" style='font-size: 20px'>
          ${story.title}
        </a>
        <small class="story-hostname">${hostName}</small>
        <small class="story-author" style='display:block; margin-left:0; margin-top:5px; margin-bottom:5px; color:green; font-size:17px;'>by ${story.author}</small>
        <small class="story-user" style='margin-bottom:10px; color:orange; font-size: 15px;'>posted by ${story.username}</small>
        <button style='margin-right:20px' class='favorite-button'>Favorite</button>
        <button class='unfavorite-button' style='margin-right:20px'>Unfavorite</button>
        <button class='delete-button' style='margin-right:20px;' >Delete</button>
  
        <hr style='margin-top:5px'>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $('.submit-story-form').hide()
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function makeAddStoryFormVisible() {
  $('.submit-story-form').show()
  hidePageComponents();

}

$(document).on('click', '#nav-submit', makeAddStoryFormVisible);


//a.b.#####################################################
async function submitNewStory(evt) {
  evt.preventDefault()
  let author = $('#form_author').val();
  console.log('submitNewStory author', author)
  let title = $('#form_title').val();
  let url = $('#form_url').val();
  let newStory = await storyList.addStory(currentUser, { author, url, title })
  console.log('after axios post request for submitting new story', newStory)
  putStoriesOnPage();
}

$('.form-button').on('click', submitNewStory)

async function whenClickOnFavorite(evt) {
  console.log('clicked on favorite')
  const $target = $(evt.target);
  console.log('target', $target)
  const $closestLi = $target.closest('li')
  console.log('target.closest', $target.closest('li'));
  const storyId = $closestLi.attr("id")
  console.log('storyId', storyId);
  const storyExists = storyList.stories.find(story => story.storyId === storyId);
  if (!storyExists) {
    return null;
  } else {
    const token = localStorage.getItem("token");
    currentUser.addFavorite(storyId);
  
  }
}

async function whenClickOnUnfavorite(evt) {

    console.log('clicked on unfavorite')
    const $target = $(evt.target);
    console.log('target', $target)
    const $closestLi = $target.closest('li')
    console.log('target.closest', $target.closest('li'));
    const storyId = $closestLi.attr("id")
    console.log('storyId', storyId);
    const storyExists = storyList.stories.find(story => story.storyId === storyId);
    if (!storyExists) {
      return null;
    } else {
      const token = localStorage.getItem("token");
      currentUser.removeFavorite(storyId);
    
    }
  }

$('.favorite-button').on('click', whenClickOnFavorite);
$(document).on('click', '.favorite-button', whenClickOnFavorite);
$('.unfavorite-button').on('click', whenClickOnUnfavorite);
$(document).on('click', '.unfavorite-button', whenClickOnUnfavorite);

async function deleteStory (evt) {
  console.log('call deleteStory function after click')
  const $target = $(evt.target)
  const $closestLi = $target.closest("li");
  const storyId = $closestLi.attr("id");
  console.log('storyid', storyId)
  await storyList.removeStory(currentUser, storyId);
  location.reload();
  putStoriesOnPage;

}

$('.delete-button').on('click', deleteStory);
$(document).on('click', '.delete-button', deleteStory);


//a.b. ######################################################
function putFavoritesOnPage() {
  console.log('executing putFavoritesOnPages');
  //a.b.remove all child elements from the selected element
  // $('#favorite-stories').empty();
  console.log('is there anything in currentUser.favorites', currentUser.favorites.length)
  if(currentUser.favorites.length !== 0) {
    for(let story of currentUser.favorites) {
      console.log('what does each story object have', story);
      const favoriteStory = generateStoryMarkup(story);
      $('#favorite-stories').append(favoriteStory)
      console.log('append story to #favorite-stories')
    }
  }

}
