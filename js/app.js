// **** PAGINATION AND FILTER PROJECT - ADRIAN DZIENISIK ****

// get students
const $students = $('.student-item');
// hide all students, and then show only the first 10, with the slice() method.
$students.hide();
$students.slice(0, 10).show();

// create dynamically div and ul for pagination:
const $divPag = $("<div class='pagination'></div>");
$('.page').append($divPag);
const $ul = $("<ul></ul>");
$divPag.append($ul);

// Function to insert the pagination links:
function addPagLinks() {
  // Get number of students with length, then divide by 10 and round up:
  const index = Math.ceil($students.length / 10);
  // Creat and append pagination links:
  for (let i = 1; i <= index; i++) {
    let $li = $('<li><a>'+ i +'</a></li>');
    $ul.append($li);
  }
}

// Function to insert search strcuture:
function createSearch() {
  const $divSearch = $('<div class="student-search"></div>');
  const $searchInput = $('<input class="search-input" placeholder="Search for students...">');
  const $searchBtn = $('<button class="search-btn">Search</button>');
  $('.page-header').append($divSearch);
  $divSearch.append($searchInput, $searchBtn);
}

// Call functions:
addPagLinks();
createSearch();

// Give first page link the class active:
$('.pagination ul li a:eq(0)').addClass('active');

// Event listener for pagination:
$('.pagination').on('click', 'a', function(){
  $('.search-input').val('');
  let $start = parseInt($(this).text()) * 10 - 10;
  let $end = $start + 10;
  $students.hide();
  $students.slice($start, $end).show();
  $('.pagination a').removeClass('active');
  $(this).addClass('active');
});

// Event listener for search func

$('.search-btn').on('click', function(){
  // if the no matches message exist, remove it. To prevent multiple message on page.
  if ($('.no-match')) {
    $('.no-match').remove();
  }
  const $pattern = $('.search-input').val().toLowerCase(); // contains method is case sen. so --> toLowerCase
  if ($pattern === "") { // if no pattern is type, show all students (clear), and show first page.
    $students.hide();
    $students.slice(0, 10).show();
    $('.pagination a').removeClass('active');  // if for example a link != from link number 1 is active, remove active class.
    $('.pagination ul li a:eq(0)').addClass('active'); // add active class to the first link
    return false; // exit
  }
  $students.hide();
  const $studentMatch = $('.student-item:contains("'+$pattern+'")');
  if ($studentMatch.length === 0) {
    $('.student-list').append('<p class="no-match">No matches</p>'); // if there is no matches, show message.
  }
  $studentMatch.show(); // show students that match the pattern
});

// log students with index for debuging purposes:
// $('.student-list h3').each(function(index){
//   console.log(index + ' ' + $(this).text());
// })
