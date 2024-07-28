"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/*a.b.################################################################ **/
function navSubmitClick(evt) {
  //a.b. show add new story form
  $('#submit-story-form').show();
  //a.b. hide rest of page components until submit
  // hidePageComponents()

}

/*a.b.###################################################################**/
$('#nav-submit').on('click', navSubmitClick)

//.a.b. ####################################################
function navShowFavorites(evt) {

  hidePageComponents();
  $('.favorite-stories').show();
  putFavoritesOnPage();
  //a.b. show favorite stories
 
}

$('#nav-favorites').on('click', navShowFavorites)

