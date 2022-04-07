export const readableDate = (dateString) => new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
});

//export const readableDate = (dateString) => new Date(dateString).toDateString();
//     let date = new Date(thisArticle.createdDate)
// console.log(date)

    // const dateDisplay = date.toLocaleDateString("en-GB", {
    //   year: "numeric",
    //   month: "long",
    //   day: "2-digit"
    // })
        // console.log(dateDisplay)
        // setArticleDate(dateDisplay)
        // console.log(articleDate)
       //  dateDisplay()
        // console.log(thisArticle.createdDate)