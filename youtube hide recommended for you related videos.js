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

//console.log("hi");

//2017-01-27-1849-04 added share page block

//document.body.innerHTML ="<br><br>"+"<p>hello 123124134132525</p>"+"<br><br>"+document.body.innerHTML;
//console.log("hi");
//1. get all related videos
//<li class="video-list-item related-list-item show-video-time">
//2016-04-26 li name updated again
//2017-03-23-1627-54 hide "Live now" streams. That's not related.

setTimeout(function(){
    //console.log("hihihi");
    hideAllDivs();
    setInterval (function(){
        hideAllDivs();
    }, 1000);
  }, 3000); //2017-07-24-1701-44 new player needs some time to load the channel name

function hideAllDivs()
{
    //hideRecommendedDivs_withLiName("video-list-item related-list-item related-list-item-compact-video");
    //hideRecommendedDivs_withLiName("video-list-item related-list-item  show-video-time related-list-item-compact-video"); //2017-01-27
    //hideRecommendedDivs_withLiName("related-item-dismissable", "stat view-count"); //2017-01-27 class change
    //hideRecommendedDivs_withLiName("related-item-dismissable", "stat.view-count"); //2017-01-27 class change

    //hideRecommendedDivs_withLiName("video-list-item related-list-item show-video-time");
    //hideRecommendedDivs_withLiName("video-list-item related-list-item");

    //hideRecommendedDivs_withLiName("yt-lockup-meta-info");
    //hideRecommendedDivs_withLiName("yt-lockup-dismissable","yt-lockup-meta-info");

    //3. hide the more related videos button since that will reload more suggestions, which may include recommended for you videos.
    //[][][]document.getElementById("watch-more-related-button").style.display = "none";
    
    //4. 2017-06-22-2037-15 Screw the RETARDED VIDEOS. Just show videos from the same channel.
    //filterBlockableSideBarVideos_thatDontMatchChannelName(".related-item-dismissable");
    //filterBlockableSideBarVideos_thatDontMatchChannelName(".related-playlist");
    filterBlockableSideBarVideos_thatDontMatchChannelName("div#dismissable");
    
    //2017-07-24-1645-51 another update
    //youtube.com##.style-scope.ytd-watch-next-secondary-results-renderer
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

function getThisVideoChannelName()
{
	//var mychannelname = $('#watch7-user-header a.spf-link').not('a.yt-user-photo')[0].innerText; // for watch page
    var mychannelname = $('#owner-container')[0].firstChild.innerText;
    //console.log(mychannelname);
    return mychannelname;
}
//getThisVideoChannelName();
function filterBlockableSideBarVideos_thatDontMatchChannelName(myclassname)
{
    var mychannelname = getThisVideoChannelName();
    //console.log(mychannelname);
    var thisname;
    //var alltextblocks = $(myclassname).find('.stat.attribution');
    var alltextblocks = $(myclassname).find('#byline-container').find('#byline');
    $(myclassname).find('#metadata-line').hide(); //sure, let's hide the view count, too.
    //myclassname
    for (var i=0;i<alltextblocks.length;i++)
    {
        thisname = alltextblocks[i].innerText;
        if (thisname !== mychannelname)
            alltextblocks.closest(myclassname)[i].style.display = "none";
    }
    return;
}

//2017-05-02-0608-38 now the sidebar includes personalized videos that aren't described as such.
//$('#watch7-sidebar-contents').hide();
