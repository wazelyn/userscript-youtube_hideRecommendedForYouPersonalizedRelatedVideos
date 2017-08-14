// ==UserScript==
// @name        youtube hide recommended for you related videos
// @description hides the retarded recommended videos
// @include     http://www.youtube.com/watch*
// @include     https://www.youtube.com/watch*
// @include     http://www.youtube.com/shared*
// @include     https://www.youtube.com/shared*
// @grant       none
// @require     https://code.jquery.com/jquery-3.2.1.js
// ==/UserScript==

hideAllUnrelatedVideos_PreRedesign_20170725();
//hideAllUnrelatedVideos_20170725_redesign();

function hideAllUnrelatedVideos_20170725_redesign()
{
    var isredesign = true;
    setTimeout(function(){
        hideAllDivs(isredesign);
        setInterval (function(){
            hideAllDivs(isredesign);
        }, 1000);
    }, 3000); //2017-07-24-1701-44 new player needs some time to load the channel name
    return;
}
function hideAllUnrelatedVideos_PreRedesign_20170725()
{
    var isredesign = false;
    setTimeout(function(){
        hideAllDivs(isredesign);
        setInterval (function(){
            hideAllDivs(isredesign);
        }, 1000);
    }, 0);
    return;
}

function hideAllDivs(isredesign)
{
    var mychannelname = getThisVideoChannelName(isredesign);
    if (isredesign)
        filterBlockableSideBarVideos_thatDontMatchChannelName("div#dismissable", mychannelname, isredesign);
    else
    {
        filterBlockableSideBarVideos_thatDontMatchChannelName(".related-item-dismissable", mychannelname, isredesign);
        filterBlockableSideBarVideos_thatDontMatchChannelName(".related-playlist", mychannelname, isredesign);
        hidelivestreams();
    }
    return;
}
function getThisVideoChannelName(isredesign)
{
    var mychannelname;
    if (isredesign)
        mychannelname = $('#owner-container')[0].firstChild.innerText;
    else
        mychannelname = $('#watch7-user-header a.spf-link').not('a.yt-user-photo')[0].innerText; // for watch page
    return mychannelname;
}
function hidelivestreams()
{
    var livestreams = $('.yt-badge.yt-badge-live');
    for (var i=0;i<livestreams.length;i++)
        livestreams[i].closest(".related-item-dismissable").style.display = "none";
    return;
}

function filterBlockableSideBarVideos_thatDontMatchChannelName(myclassname, mychannelname, isredesign)
{
    var thisname;
    var alltextblocks;
    if (!isredesign)
    {
        alltextblocks = $(myclassname).find('.stat.attribution');
    }
    else
    {
        alltextblocks = $(myclassname).find('#byline-container').find('#byline');
        $(myclassname).find('#metadata-line').hide(); //sure, let's hide the view count, too.
    }
    //
    for (var i=0;i<alltextblocks.length;i++)
    {
        thisname = alltextblocks[i].innerText;
        if (thisname !== mychannelname)
            alltextblocks.closest(myclassname)[i].style.display = "none";
    }
    return;
}
function hideRecommendedDivs_withLiName(myclassname,myviewcountliname)
{
	allitems = document.getElementsByClassName(myclassname);
	//console.log(allitems.length);
	for (var i=0;i<allitems.length;i++)
	{
		if (allitems[i].getElementsByClassName(myviewcountliname).length > 0)
		{
			//console.log(allitems[i].getElementsByClassName(myviewcountliname)[0].innerHTML);
			//console.log(allitems[i].getElementsByClassName("stat view-count")[0].innerHTML);
			//if (allitems[i].getElementsByClassName("stat view-count")[0].innerHTML == "Recommended for you")
			if (allitems[i].getElementsByClassName(myviewcountliname)[0].innerHTML.indexOf("Recommended for you") >= 0)
			{
				allitems[i].style.display = "none";
				//allitems[i].style.visibility = "hidden";
			}
            else if (allitems[i].getElementsByClassName(myviewcountliname)[0].innerHTML.indexOf("Live now") >= 0)
			{
				allitems[i].style.display = "none";
				//allitems[i].style.visibility = "hidden";
			}
		}
	}
}
