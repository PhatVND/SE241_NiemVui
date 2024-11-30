const sort = document.querySelector("[sort]");
if (sort){
    let url = new URL(location.href);
    const sortSelect = sort.querySelector("[sort-select]")
    sortSelect.addEventListener("change", () => {
        const [sortKey, sortValue] = sortSelect.value.split("-");
        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)
        location.href = url.href
    })
    const seclectedSortKey = url.searchParams.get("sortKey")
    const seclectedSortValue = url.searchParams.get("sortValue")
    if (seclectedSortKey && seclectedSortValue){
        const stringSort = seclectedSortKey + "-" + seclectedSortValue;
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
        optionSelected.selected = true;
    }
}

const sortClear = document.querySelector("[sort-clear]");
if (sortClear){
    let url = new URL(location.href);
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        location.href = url.href;
    })
}