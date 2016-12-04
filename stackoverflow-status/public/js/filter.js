var ACTIVE_TAG_CLASS = "blue";
var INACTIVE_TAG_CLASS = "grey";
var so_tags = [];

$('.so-tag').each(function (stidx) {
    so_tags.push($(this).text().trim());
    updateCardVisibility();
});

function updateCardVisibility() {
    $('.questioncol').each(function (qidx) {
        showme = false;
        $(this).find('.tag').each(function (tidx) { // get question's tags
            if (so_tags.indexOf($(this).text()) >= 0) { // check if any tag is in list of active tags
                showme = true; // if so, show it
                return false;
            }
        });
        if (showme) {
            $(this).removeClass('notdisplayed');
        } else {
            $(this).addClass('notdisplayed');
        }
    });
}

function setVisibleTags() {
    so_tags = [];
    $('.so-tag').each(function (stidx) {
        if ( $(this).hasClass(ACTIVE_TAG_CLASS) ) {
            so_tags.push($(this).text().trim());
        }
    });
    updateCardVisibility();
}

function toggleTagVisibility(so_tag) {
    if ( $(so_tag).hasClass(ACTIVE_TAG_CLASS) ) {
        $(so_tag).removeClass(ACTIVE_TAG_CLASS).addClass(INACTIVE_TAG_CLASS);
    } else {
        $(so_tag).removeClass(INACTIVE_TAG_CLASS).addClass(ACTIVE_TAG_CLASS);
    }
    setVisibleTags();
}