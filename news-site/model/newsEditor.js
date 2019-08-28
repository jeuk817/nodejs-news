const articleCollection = require('../schemas/articles');

class NewsEditor {

    async getArticles(thema) {
        try {
            const articles = await articleCollection.find({ thema });
            console.log(articles);
            return articles;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async getMainArticle() {
        try {
            const mainArticle = await articleCollection.findById("5d62b27da04f7295282444a9")
            return mainArticle;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async getArticleById(id) {
        try {
            const mainArticle = await articleCollection.findById(id)
            return mainArticle;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

}



module.exports = NewsEditor;
