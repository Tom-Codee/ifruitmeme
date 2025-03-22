function handleWikiSearch(event) {
    if (event.key === 'Enter') {
        searchWiki();
    }
}

function searchWiki() {
    const query = document.getElementById("wikiInput").value.trim();
    if (!query) return;

    const url = `https://en.m.wikipedia.org/wiki/${encodeURIComponent(query)}`;
    document.getElementById("wikiViewer").src = url;

    document.getElementById("wikiHome").style.display = "none";
    document.getElementById("wikiResultView").style.display = "flex";
}

function goBackWiki() {
    document.getElementById("wikiHome").style.display = "flex";
    document.getElementById("wikiResultView").style.display = "none";
    document.getElementById("wikiViewer").src = "";
    document.getElementById("wikiInput").value = "";
}
