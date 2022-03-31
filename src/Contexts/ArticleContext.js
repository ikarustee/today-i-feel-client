import React, { createContext, useState, useEffect } from "react";
import articleDATA from "../helper/articles.json"

export const ArticleContext = createContext()
/* const URL = [{"_id":"8826ce6d-ca85-4005-b91f-594d24284fa9","title":"nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel","body":"mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo","tags":"multi-tasking","url":"http://bizjournals.com","ext":false,"visible":true,"createdDate":"1623555329000","updatedDate":"1631940412000"},
{"_id":"cc25d134-ef0c-4654-890c-80083db60575","title":"vel nulla eget eros elementum pellentesque quisque","body":"curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices","tags":"Advanced","url":"http://macromedia.com","ext":false,"visible":false,"createdDate":"1619261214000","updatedDate":"1630150187000"},
{"_id":"7dde0ca8-fb45-4ab1-b475-53a2d2f078f7","title":"massa id nisl venenatis lacinia aenean sit amet justo morbi","body":"pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper","tags":"ability","url":"http://homestead.com","ext":true,"visible":true,"createdDate":"1623043707000","updatedDate":"1633388350000"},
{"_id":"1ab3609a-3cd9-40ba-8050-6064e29b7671","title":"aenean sit amet justo morbi","body":"eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat","tags":"attitude-oriented","url":"http://addthis.com","ext":true,"visible":false,"createdDate":"1648373692000","updatedDate":"1647365953000"},
{"_id":"30a3c8d4-7035-4c43-b2c5-6bf4678a05b0","title":"massa donec dapibus duis at velit","body":"quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque","tags":"Networked","url":"http://icq.com","ext":true,"visible":false,"createdDate":"1619651785000","updatedDate":"1622271069000"},
{"_id":"5ebcbada-3b4b-4b62-9205-62728eaaed1b","title":"augue aliquam erat volutpat","body":"dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam","tags":"Stand-alone","url":"https://independent.co.uk","ext":true,"visible":true,"createdDate":"1646359773000","updatedDate":"1644499991000"},
{"_id":"3b26a9e2-1d7b-4682-b053-519812d886ec","title":"luctus tincidunt nulla","body":"lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus","tags":"extranet","url":"http://reference.com","ext":false,"visible":true,"createdDate":"1640781370000","updatedDate":"1625174473000"},
{"_id":"59a38929-f5b1-4c1f-a7c2-c26aac2e9412","title":"sem sed sagittis nam","body":"maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet","tags":"Polarised","url":"https://timesonline.co.uk","ext":false,"visible":false,"createdDate":"1642896701000","updatedDate":"1632867626000"},
{"_id":"85f58742-bd9f-4d4d-b6cc-c4e60b569230","title":"a odio in hac habitasse platea dictumst","body":"amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse","tags":"bandwidth-monitored","url":"https://timesonline.co.uk","ext":true,"visible":false,"createdDate":"1647679390000","updatedDate":"1640120593000"},
{"_id":"4762924b-91ff-4b57-ae1d-55a0feec541e","title":"proin leo odio porttitor id consequat","body":"faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor","tags":"motivating","url":"http://omniture.com","ext":false,"visible":false,"createdDate":"1647547352000","updatedDate":"1619012773000"}]
 */

const URL = articleDATA
const ArticleContextProvider = ({children}) => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsloading] = useState(true)

    async function getArticles() {
        try {
            // const response = await fetch(URL)
            // const data = await URL
            // console.log(data)
            const blogPosts = URL.map((a) => {
                return {
                    ...a,
                    id: a._id,
                    title: a.title,
                    body: a.body,
                    tags: a.tags,
                    url: a.url,
                    ext: a.ext,
                    visible: a.visible,
                    createdDate: a.createdDate,
                    updatedDate: a.updatedDate,
                }
            });
            setArticles(blogPosts)
            // console.log(blogPosts)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getArticles()
    },[])

    useEffect(() => {
        if(articles.length) return setIsloading(false)
    }, [articles])

  return (
    <ArticleContext.Provider value={{article: articles, loading: isLoading}}>
        {children}
    </ArticleContext.Provider>
  )
}

export default ArticleContextProvider
